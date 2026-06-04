import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import contactRouter from './routes/contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ─── SECURITY MIDDLEWARE ───
app.use(helmet())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

// Rate limiting — 20 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests. Please try again later.' },
})
app.use('/api/', limiter)

app.use(express.json({ limit: '10kb' }))

// ─── ROUTES ───
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'AMIGO API is running', timestamp: new Date() })
})

app.use('/api/contact', contactRouter)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Something went wrong' })
})

// ─── DATABASE + SERVER ───
async function startServer() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('✅ Connected to MongoDB Atlas (optional fallback enabled)')
    } else {
      console.log('ℹ️  MongoDB not configured (email-only mode)')
    }

    app.listen(PORT, () => {
      console.log(`🚀 AMIGO API running at http://localhost:${PORT}`)
      console.log(`   Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  }
}

startServer()
