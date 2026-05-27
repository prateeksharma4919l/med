# MedEase AI

Modern AI-powered MBBS 2nd Year study website for Pathology, Pharmacology, and Microbiology.

## Folder Structure

```txt
medease-ai/
  client/        React + Vite + Tailwind frontend
  server/        Node.js + Express + MongoDB backend
```

## Quick Start

```bash
npm install
npm run install:all
```

Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## AI Setup

Add either OpenAI or Gemini credentials in `server/.env`.

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
```

or

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-1.5-flash
```

If no key is provided, the backend returns helpful demo AI responses so the app still works locally.

## Deployment

### Render

1. Push this repo to GitHub.
2. Open Render and choose `New > Blueprint`.
3. Select this repo. Render will read `render.yaml`.
4. Add required backend env vars: `MONGODB_URI`, `JWT_SECRET`, and optionally `OPENAI_API_KEY`.
5. Deploy both services.

Frontend URL: `https://medease-ai.onrender.com`

Backend URL: `https://medease-ai-api.onrender.com/api`

Demo login:

```txt
doctor gouri sharma
1234
```

### Frontend

Deploy `client` to Vercel or Netlify.

```bash
cd client
npm install
npm run build
```

Set:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### Backend

Deploy `server` to Render, Railway, or Fly.io.

Required environment variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=change_this_secret
CLIENT_URL=https://your-frontend-url.com
AI_PROVIDER=openai
OPENAI_API_KEY=...
```

## Main Features

- MBBS 2nd year topic-wise syllabus
- Easy English explanations, notes, mnemonics, viva, PYQs, MCQs
- AI chatbot, AI notes, AI MCQ generation, AI study planner
- JWT login/register
- Bookmarks, topic completion, progress tracking
- Admin topic management routes
- Mobile-first dashboard with dark/light mode
