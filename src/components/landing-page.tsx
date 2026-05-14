import { Link } from '@tanstack/react-router';
import { ArrowRight, Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ShieldCheck, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tools = [
  { icon: Mail, title: 'Smart Email Generator', description: 'Draft professional emails in seconds with the right tone and length.' },
  { icon: FileText, title: 'Meeting Notes Summarizer', description: 'Turn transcripts into TL;DR, decisions, and clear action items.' },
  { icon: ListChecks, title: 'AI Task Planner', description: 'Break any goal into prioritized, time-estimated next steps.' },
  { icon: Search, title: 'AI Research Assistant', description: 'Get a structured briefing on any topic with caveats and sources of doubt.' },
  { icon: MessageSquare, title: 'AI Chatbot', description: 'A general-purpose assistant for brainstorming, rewriting, and explaining.' },
];

const benefits = [
  { icon: Zap, title: 'Save hours per week', description: 'Stop staring at blank pages. Get strong drafts you can edit, not generic boilerplate.' },
  { icon: ShieldCheck, title: 'Built for review', description: 'Every output is editable and ships with a responsible-AI disclaimer. You stay in control.' },
  { icon: Lock, title: 'Your account, your data', description: 'Authenticated workspace. Inputs are sent only to the AI provider used to generate the response.' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Workplace AI</span>
          </div>
          <Link
            to="/"
            hash="login"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 70%)',
          }}
        />
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
          }}
        />
        {/* Aurora beams */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl animate-aurora"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, color-mix(in oklab, var(--color-primary) 35%, transparent), transparent 30%, color-mix(in oklab, var(--color-primary) 20%, transparent) 60%, transparent 80%)',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-20 text-center sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
          {/* Live status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            AI Workplace Productivity Assistant
          </div>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Automate the busywork.
            </span>
            <span className="mt-2 block bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
              Keep the thinking.
            </span>
          </h1>

          {/* Generating indicator */}
          <div className="mx-auto mt-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span className="flex items-end gap-1">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: '0ms' }} />
              <span className="block h-1.5 w-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: '180ms' }} />
              <span className="block h-1.5 w-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: '360ms' }} />
            </span>
            <span>Generating your</span>
            <span className="relative inline-block h-5 w-[7.5rem] overflow-hidden text-left">
              <span className="absolute inset-x-0 animate-rotate-words font-medium text-foreground">
                <span className="block h-5 leading-5">email draft</span>
                <span className="block h-5 leading-5">meeting recap</span>
                <span className="block h-5 leading-5">task plan</span>
                <span className="block h-5 leading-5">research brief</span>
                <span className="block h-5 leading-5">next reply</span>
                <span className="block h-5 leading-5">email draft</span>
              </span>
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five focused AI tools in one clean workspace. Built for professionals who want speed without losing judgement.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/" hash="login">
              <Button size="lg" className="gap-2 rounded-full px-7 shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/" hash="login">
              <Button size="lg" variant="outline" className="rounded-full px-7 backdrop-blur">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tools</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Five tools, one workspace
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Every tool follows the same structure: structured prompts, editable outputs, responsible-AI guardrails.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(t => (
              <Card
                key={t.title}
                className="group p-6 transition-colors hover:border-primary/40 hover:bg-accent/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Why Workplace AI</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Speed with guardrails
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map(b => (
              <Card key={b.title} className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden p-10 text-center sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 70%)',
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Ready to ship more, faster?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
                Sign up free and start using all five tools in under a minute.
              </p>
              <div className="mt-8">
                <Link to="/" hash="login">
                  <Button size="lg" className="gap-2 rounded-full px-7">
                    Get started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Workplace AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-generated content may be inaccurate. Always review before use. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
