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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> AI Workplace Productivity Assistant
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Automate the busywork.
            <br />
            <span className="text-muted-foreground">Keep the thinking.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five focused AI tools — emails, meeting summaries, task plans, research briefs, and a chatbot — in one clean workspace. Built for professionals who want speed without losing judgement.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/" hash="login">
              <Button size="lg" className="gap-2 rounded-full px-7">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/" hash="login">
              <Button size="lg" variant="outline" className="rounded-full px-7">
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
