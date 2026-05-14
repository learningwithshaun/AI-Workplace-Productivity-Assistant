# 🧠 AI Workplace Productivity Assistant

A modern, responsive AI-powered web application that helps professionals automate everyday workplace tasks such as drafting emails, summarizing meetings, planning work, researching topics, and chatting with an AI assistant — all from a single dashboard.

This project was developed for the **AI Skill Accelerator Programme** to demonstrate real-world AI implementation, prompt engineering, responsible AI usage, and modern SaaS UI/UX design.

---

# 🎯 Project Purpose

Professionals across industries spend significant time on repetitive administrative tasks like writing emails, summarising information, planning schedules, and conducting research.

This application solves this real-world problem by providing a **single AI productivity platform** that automates common workplace workflows and improves efficiency.

The project focuses on:
- Practical AI implementation  
- Strong prompt engineering  
- Responsible AI practices  
- Real workplace problem solving  
- Modern responsive UI design  

---

# ✨ Features

| Tool | What it does |
|---|---|
| **Dashboard** | Quick-access tiles for all AI tools and onboarding guidance |
| **Smart Email Generator** | Generates professional emails from a short brief with tone & length controls |
| **Meeting Notes Summarizer** | Converts transcripts or notes into structured summaries and action items |
| **AI Task Planner** | Breaks goals into prioritised task lists and schedules |
| **AI Research Assistant** | Produces structured research briefings on any topic |
| **AI Chatbot** | Streaming AI chat for productivity help and brainstorming |

### Cross-platform capabilities
- Responsive sidebar navigation (mobile + desktop)
- Streaming AI responses (real-time token output)
- Editable AI outputs before copying or sharing
- Responsible AI disclaimer in every tool
- Dark SaaS-style design inspired by ChatGPT / Notion / Linear

---

# 🧰 Tech Stack

## Frontend
- TanStack Start (React 19 + Vite 7)
- Tailwind CSS v4
- shadcn/ui
- lucide-react icons

## Backend & Cloud
- Lovable Cloud (Supabase) – Auth, Postgres, Edge Functions
- Cloudflare Workers – Deployment runtime

## AI Layer
Lovable AI Gateway models:
- google/gemini-3-flash-preview (default)
- google/gemini-2.5-pro
- openai/gpt-5 family

No API keys are exposed to the client.

---

# 🧠 How the AI Works

Flow:

1. Each tool builds a **system + user prompt**
2. The app sends the prompt to a Supabase Edge Function
3. The Edge Function securely calls the AI Gateway
4. Responses stream back to the UI in real time

---

# ✍️ Prompt Engineering Approach

Prompts were carefully designed and iteratively refined to ensure:
- Professional tone
- Structured outputs
- Clear formatting
- Reliable results

# 📂 Project Structure  

---

# 🚀 Getting Started

## Prerequisites
- Node 20+
- Bun (or npm/pnpm)

## Install & Run  

---

# 🔐 Authentication & Security

- Supabase authentication (email/password)
- Role-based access structure ready
- AI Edge Function uses secure service key
- No API keys exposed to client

---

# ⚠️ Responsible AI

This project follows responsible AI practices.

AI outputs:
- May be inaccurate or biased
- Must be reviewed before use
- Should not contain confidential data

A disclaimer is shown inside every tool and in the global footer.

---

# 📦 Deployment

The project deploys automatically using **Lovable + Cloudflare Workers**.

Preview and production builds are handled by the Lovable platform.

---

# 🎓 Academic Context

This project simulates a real-world AI productivity tool and prepares learners for roles such as:
- AI Prompt Engineer
- AI Productivity Specialist
- Digital Transformation Analyst
- Business Analyst (AI-enabled)

---

# 👩‍💻 Author

Amanda Msutu ✨
