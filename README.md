# AI Workplace Productivity Assistant

A modern, responsive web app that helps professionals automate everyday workplace tasks with AI — drafting emails, summarizing meetings, planning work, researching topics, and chatting with an assistant — all from a single dashboard.

Built on **TanStack Start** (React 19 + Vite 7), **Tailwind CSS v4**, **shadcn/ui**, and **Lovable Cloud** (Supabase) with the **Lovable AI Gateway** (Gemini / GPT models — no API keys required).

---

## Features

| Tool | What it does |
|---|---|
| **Dashboard** | Quick-access tiles for every tool, recent activity hints, and onboarding pointers. |
| **Smart Email Generator** | Generates professional emails from a short brief with tone & length controls. |
| **Meeting Notes Summarizer** | Turns raw transcripts/notes into executive or detailed summaries with action items. |
| **AI Task Planner** | Breaks a goal into a structured, prioritized task list with milestones. |
| **AI Research Assistant** | Produces structured briefings on any topic (overview, key points, sources to check). |
| **AI Chatbot** | General-purpose streaming chat for quick Q&A and brainstorming. |

Cross-cutting:
- Responsive sidebar navigation (collapses on mobile)
- Streaming AI responses (token-by-token)
- All AI outputs are **editable** before copying
- Responsible AI disclaimer in every tool and global footer
- Dark-first design system inspired by ChatGPT / Notion / Linear

---

## Tech stack

- **Framework:** [TanStack Start](https://tanstack.com/start) v1 (SSR + server functions, file-based routing in `src/routes/`)
- **UI:** React 19, Tailwind CSS v4 (tokens in `src/styles.css`), [shadcn/ui](https://ui.shadcn.com), [lucide-react](https://lucide.dev) icons
- **State / data:** TanStack Query, React Hook Form + Zod
- **Backend:** Lovable Cloud (managed Supabase) — Auth, Postgres, Edge Functions
- **AI:** Lovable AI Gateway (default model: `google/gemini-3-flash-preview`)
- **Build / runtime:** Vite 7, Cloudflare Workers (`wrangler.jsonc`)

---

## Getting started

### Prerequisites
- Node 20+ and [Bun](https://bun.sh) (or npm/pnpm)
- Lovable Cloud is auto-provisioned; `.env` is generated for you

### Install & run

```bash
bun install
bun run dev          # dev server at http://localhost:5173
bun run build        # production build
bun run build:dev    # dev-mode build (used by Lovable previews)
bun run lint
```

### Demo account

A seeded demo user is available on the login page:

```
email:    demo@workplaceai.app
password: DemoUser!2026xZ
```

---

## Project structure

```
src/
├── routes/                 # File-based routes (TanStack Router)
│   ├── __root.tsx          # Root layout (html shell, fonts, meta)
│   ├── index.tsx           # Landing / dashboard switch
│   ├── email.tsx           # Smart Email Generator
│   ├── meeting-notes.tsx   # Meeting Notes Summarizer
│   ├── tasks.tsx           # AI Task Planner
│   ├── research.tsx        # Research Assistant
│   └── chat.tsx            # Chatbot
├── components/
│   ├── app-layout.tsx      # Sidebar + top bar shell
│   ├── ai-tool-shell.tsx   # Reusable form → streaming output card
│   ├── dashboard-view.tsx
│   ├── landing-page.tsx
│   ├── login-page.tsx
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── ai-stream.ts        # Client-side SSE stream parser
│   ├── use-auth.ts         # Supabase auth hook
│   └── utils.ts
├── integrations/supabase/  # Auto-generated Supabase client + types
└── styles.css              # Tailwind v4 + design tokens
supabase/
├── config.toml
└── functions/ai-chat/      # Edge function: streaming AI proxy
```

---

## How the AI layer works

```
React component
   └─ AiToolShell (buildPrompt → system + user)
        └─ streamAI()  ── POST ──▶  supabase/functions/ai-chat
                                        └─ Lovable AI Gateway
                                             └─ google/gemini-3-flash-preview
        ◀── SSE stream ── token deltas ──┘
```

1. Each tool route defines its **structured prompt** (`system` + `user`) inside `buildPrompt()`.
2. `AiToolShell` calls `streamAI()` (`src/lib/ai-stream.ts`), which POSTs to the `ai-chat` edge function.
3. The edge function (`supabase/functions/ai-chat/index.ts`) is a thin streaming proxy to the Lovable AI Gateway. It reads `LOVABLE_API_KEY` from the environment — no keys ship to the client.
4. Tokens stream back as SSE; the UI renders them progressively into an editable textarea or markdown view.

Switch models per request by passing `model` in the request body — supported models include:

```
google/gemini-3-flash-preview     (default — fast, cheap)
google/gemini-2.5-pro             (deeper reasoning, multimodal)
openai/gpt-5 / gpt-5-mini / gpt-5-nano
```

---

## Design system

Defined entirely in `src/styles.css` using Tailwind v4 + `oklch` tokens. Dark-first:

| Token | Value |
|---|---|
| `--background` | `#0f0f0f` |
| `--card` | `#1a1a1a` |
| `--primary` | `#10a37f` (ChatGPT green) |
| `--border` | `#2a2a2a` |

Rules:
- **Never** hardcode colors in components — always use semantic tokens (`bg-background`, `text-foreground`, `border-border`, …).
- Typography: **Inter** (400/500/600/700), preconnected in `__root.tsx`.
- Transitions: `0.2s ease`. Subtle shadows. Rounded corners (10px).
- Mobile first: sidebar collapses below `lg`, all touch targets ≥ 40px.

---

## Authentication & data

- Auth is handled by Supabase (email/password). See `src/lib/use-auth.ts`.
- The `user_roles` table + `has_role()` security-definer function pattern is in place for role-based access (see `.lovable/plan.md`).
- All RLS policies live in Supabase migrations; the AI edge function uses the **service role** key and is the only path that bypasses RLS.

> ⚠️ **Never** store roles on the `profiles`/`users` table — always use a separate `user_roles` table to prevent privilege escalation.

---

## Responsible AI

Every tool surfaces a disclaimer reminding users that AI output:
- May be inaccurate, biased, or out of date.
- Must be reviewed before being sent, published, or acted on.
- Should never include confidential data you wouldn't paste into a public form.

The global app footer reinforces this on every authenticated page.

---

## Adding a new AI tool

1. Create `src/routes/<tool>.tsx`.
2. Add a nav entry in `src/components/app-layout.tsx` (`navItems`).
3. Use `<AiToolShell>` and supply:
   - `inputs` — your form controls
   - `buildPrompt()` — return `{ system, user }`
   - `renderMode: 'markdown' | 'text'`
4. That's it — streaming, copy, clear, edit, and the disclaimer come for free.

Example skeleton:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { AiToolShell } from '@/components/ai-tool-shell';
import { Wand2 } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/my-tool')({ component: MyTool });

function MyTool() {
  const [topic, setTopic] = useState('');
  return (
    <AiToolShell
      title="My tool"
      description="What it does."
      icon={Wand2}
      inputs={<Textarea value={topic} onChange={e => setTopic(e.target.value)} />}
      buildPrompt={() => topic ? {
        system: 'You are a helpful workplace assistant.',
        user: `Do the thing for: ${topic}`,
      } : null}
    />
  );
}
```

---

## Deployment

The project deploys via **Lovable** (Cloudflare Workers runtime, see `wrangler.jsonc`). Click **Publish** in the Lovable editor — the build, edge function deployment, and CDN routing are all automated.

Stable URLs:
- Preview: `https://project--<project-id>-dev.lovable.app`
- Production: `https://project--<project-id>.lovable.app`

---

## License

Private project — all rights reserved unless stated otherwise.
