import express from 'express'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Local storage file path (used when no DB/email is configured)
const DATA_DIR = path.join(__dirname, '..', '..', 'data')
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]', 'utf-8')
}

function readContacts() {
  ensureDataDir()
  try {
    return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function saveContact(entry) {
  const contacts = readContacts()
  contacts.push(entry)
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8')
}

function normalizeField(value) {
  return String(value || '').trim()
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const payload = {
      name: normalizeField(req.body.name),
      email: normalizeField(req.body.email).toLowerCase(),
      phone: normalizeField(req.body.phone),
      company: normalizeField(req.body.company),
      enquiryType: normalizeField(req.body.enquiryType),
      service: normalizeField(req.body.service),
      message: normalizeField(req.body.message),
      submittedAt: new Date().toISOString(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      })
    }

    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
    }

    // 1) Try MongoDB
    let mongoId = null;
    let savedToMongo = false;
    const mongoReady = mongoose.connection.readyState === 1
    if (mongoReady) {
      try {
        const Contact = (await import('../models/Contact.js')).default
        const contact = await Contact.create(payload)
        mongoId = contact._id;
        savedToMongo = true;
      } catch (dbErr) {
        console.error('MongoDB save failed, falling back to local:', dbErr.message)
      }
    }

    // 2) Try email
    let emailSent = false;
    const hasEmailConfig = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    if (hasEmailConfig) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT || '587', 10),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        })

        const escapedMessage = escapeHtml(payload.message).replaceAll('\n', '<br>')
        
        // 1) Send email to the AMIGO Team
        await transporter.sendMail({
          from: `"${process.env.EMAIL_FROM_NAME || 'AMIGO Website'}" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || 'amigo@amigointegrators.com',
          replyTo: payload.email,
          subject: `New Contact Form Submission - ${payload.name}`,
          html: `
            <h2 style="color:#E81010">New Enquiry from AMIGO Website</h2>
            <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px">${escapeHtml(payload.name)}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px">${escapeHtml(payload.phone || 'Not provided')}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px">${escapeHtml(payload.company || 'Not provided')}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Type</td><td style="padding:8px">${escapeHtml(payload.enquiryType || 'Not specified')}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Service</td><td style="padding:8px">${escapeHtml(payload.service || 'Not specified')}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;vertical-align:top">Message</td><td style="padding:8px">${escapedMessage}</td></tr>
            </table>
            <p style="color:#888;font-size:12px;margin-top:20px">Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          `,
        })

        // 2) Send auto-reply confirmation email to the user
        await transporter.sendMail({
          from: `"${process.env.EMAIL_FROM_NAME || 'AMIGO Website'}" <${process.env.EMAIL_USER}>`,
          to: payload.email,
          subject: `Thank you for contacting AMIGO Integrators`,
          html: `
            <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
              <h2 style="color: #E81010;">Thank you for connecting with us!</h2>
              <p>Hi ${escapeHtml(payload.name)},</p>
              <p>We have successfully received your message and our team will reach out to you shortly.</p>
              <br>
              <p>Best Regards,</p>
              <p><strong>AMIGO Integrators Team</strong></p>
              <p style="font-size: 12px; color: #888; margin-top: 30px;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
          `,
        })
        
        emailSent = true;
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr.message);
      }
    }

    // 3) Fallback — save to local JSON file if MongoDB wasn't used
    if (!savedToMongo) {
      saveContact(payload)
      console.log('Contact saved locally:', payload.name, payload.email)
    }

    // Determine the response method text based on what worked
    let method = 'local';
    if (savedToMongo && emailSent) method = 'mongodb+email';
    else if (savedToMongo) method = 'mongodb';
    else if (emailSent) method = 'email+local';

    return res.status(201).json({
      success: true,
      method,
      message: 'Thank you. Your request has been received.',
      id: mongoId,
    })
  } catch (err) {
    console.error('Contact form error:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    })
  }
})

// GET /api/contact — list all saved contacts (for admin)
router.get('/', (_req, res) => {
  const contacts = readContacts()
  res.json({ success: true, count: contacts.length, contacts })
})

export default router
