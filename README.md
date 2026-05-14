# 🧠 AI Workplace Productivity Assistant

A modern, responsive **AI-powered productivity web app** that helps professionals automate everyday workplace tasks — from drafting emails and summarising meetings to planning work, researching topics, and brainstorming with an AI assistant — all from a single, unified dashboard.

This project was developed for the **AI Skill Accelerator Programme** to demonstrate real-world AI integration, prompt engineering, responsible AI usage, and modern SaaS product design.

---

# 🎯 Project Purpose

Professionals across industries spend a significant portion of their day on repetitive administrative work such as writing emails, summarising information, planning schedules, and conducting research.

This application solves this real-world problem by providing a **centralised AI productivity platform** that automates common workplace workflows and improves efficiency.

## Project Focus

- Practical AI implementation  
- Strong prompt engineering  
- Responsible AI practices  
- Real workplace problem solving  
- Modern responsive UI design  

---

# ✨ Features

| Tool | Description |
|---|---|
| **Dashboard** | Quick-access tiles for all AI tools and onboarding guidance |
| **Smart Email Generator** | Generates professional emails from a short brief with tone & length controls |
| **Meeting Notes Summariser** | Converts transcripts or notes into structured summaries and action items |
| **AI Task Planner** | Breaks goals into prioritised task lists and schedules |
| **AI Research Assistant** | Produces structured research briefings on any topic |
| **AI Chatbot** | Real-time AI chat for productivity help and brainstorming |

## Cross-Platform Capabilities

- Responsive sidebar navigation (mobile + desktop)  
- Streaming AI responses (real-time token output)  
- Editable AI outputs before copying or sharing  
- Responsible AI disclaimer in every tool  
- Dark SaaS-style design inspired by ChatGPT, Notion, and Linear  

---

# 🧰 Tech Stack

## Frontend
- **TanStack Start** (React 19 + Vite 7)  
- **Tailwind CSS v4**  
- **shadcn/ui**  
- **lucide-react** icons  

## Backend & Cloud
- **Lovable Cloud (Supabase)** — Auth, Postgres, Edge Functions  
- **Cloudflare Workers** — Deployment runtime  

## AI Layer

Lovable AI Gateway models:

- `google/gemini-3-flash-preview` (default)  
- `google/gemini-2.5-pro`  
- `openai/gpt-5 family`  

🔒 No API keys are exposed to the client.

---

# 🧠 How the AI Works

## AI Request Flow

1. Each tool builds a **system + user prompt**
2. The app sends the prompt to a **Supabase Edge Function**
3. The Edge Function securely calls the **AI Gateway**
4. Responses stream back to the UI in real time

---

# ✍️ Prompt Engineering Approach

Prompts were carefully designed and iteratively refined to ensure:

- Professional tone  
- Structured outputs  
- Clear formatting  
- Reliable results  

---

# 📂 Project Structure

```text
src/
├── routes/                 # File-based routing (TanStack Router)
│   ├── __root.tsx          # Root layout
│   ├── index.tsx           # Landing / dashboard switch
│   ├── email.tsx           # Smart Email Generator
│   ├── meeting-notes.tsx   # Meeting Notes Summariser
│   ├── tasks.tsx           # AI Task Planner
│   ├── research.tsx        # Research Assistant
│   └── chat.tsx            # AI Chatbot
│
├── components/
│   ├── app-layout.tsx      # Sidebar + top bar layout
│   ├── ai-tool-shell.tsx   # Reusable form → streaming output UI
│   ├── dashboard-view.tsx
│   ├── landing-page.tsx
│   ├── login-page.tsx
│   └── ui/                 # shadcn/ui components
│
├── lib/
│   ├── ai-stream.ts        # SSE streaming parser
│   ├── use-auth.ts         # Supabase authentication hook
│   └── utils.ts
│
├── integrations/supabase/  # Generated Supabase client + types
└── styles.css              # Tailwind + design tokens

supabase/
├── config.toml
└── functions/
    └── ai-chat/            # Streaming AI proxy edge function
