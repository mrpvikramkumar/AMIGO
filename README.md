# AMIGO Integrators - React/Vite + Express

This project recreates the uploaded `assets/index.html` as a React single-page application using Vite, and adds a Node.js + Express backend for contact-form email delivery.

## Structure

```text
amigo-integrators-react-express/
|- amigo-vite/      React + Vite frontend
|- amigo-backend/   Express mailer API
|- .gitignore
`- README.md
```

## What is included

- The same overall look, colors, typography, sections, logo usage, and animations from the uploaded HTML
- The uploaded company-profile DOCX content integrated into the frontend
- Extracted profile images under `amigo-vite/public/profile/images`
- A contact form that sends requests to email first
- Optional MongoDB fallback only when explicitly enabled

## Run locally

Backend:

```powershell
cd amigo-backend
copy .env.example .env
npm install
npm run dev
```

Frontend:

```powershell
cd amigo-vite
copy .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`

Backend default URL: `http://localhost:5000`

## Email setup

Set these in `amigo-backend/.env`:

- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_SECURE`
- `EMAIL_FROM_NAME`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_TO`

If email is configured, contact requests are mailed directly and are not stored.

## Optional MongoDB fallback

Use MongoDB only if you want a backup persistence path:

- Set `STORE_FALLBACK=true`
- Set `MONGODB_URI=...`

If email is not configured and Mongo fallback is enabled, submissions will be stored in MongoDB.

## API base URL

The frontend uses `VITE_API_BASE_URL`.

- Leave it empty during local Vite development so `/api` uses the proxy in `vite.config.js`
- Set it to your deployed backend URL in production if the frontend and backend are hosted on different domains

## Re-extracting the company profile

The extracted profile is already included. If you replace the DOCX or want to regenerate it:

```powershell
cd amigo-vite
npm run extract:profile
```

The script checks common locations for `AMIGO Profile 2026.docx`, and you can also pass a custom path:

```powershell
npm run extract:profile -- "..\\AMIGO Profile 2026.docx"
```
