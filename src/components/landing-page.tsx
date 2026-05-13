import { Link } from '@tanstack/react-router';
import { ArrowRight, Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ShieldCheck, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const dotGridBg = {
  backgroundImage: `radial-gradient(circle, var(--landing-grid) 1.2px, transparent 1.2px)`,
  backgroundSize: '24px 24px',
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-landing-bg" style={{ fontFamily: "'Onest', system-ui, sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-landing-grid bg-landing-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-landing-dark text-landing-light">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-[15px] font-medium tracking-tight text-landing-dark">Workplace AI</span>
          </div>
          <Link to="/" hash="login" className="text-[14px] text-landing-dark/50 hover:text-landing-dark transition-colors">
            Sign in <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={dotGridBg}>
        <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-landing-grid bg-white px-3 py-1 text-xs text-landing-light-muted">
            <Sparkles className="h-3.5 w-3.5" /> AI Workplace Productivity Assistant
          </div>
          <h1 className="mt-6 text-[34px] sm:text-[48px] lg:text-[56px] font-normal leading-[1.05] tracking-tight text-landing-dark">
            Automate the busywork.
          </h1>
          <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-normal leading-[1.05] tracking-tight text-landing-light-muted">
            Keep the thinking.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-landing-light-muted">
            Five focused AI tools — emails, meeting summaries, task plans, research briefs, and a chatbot — in one clean workspace. Built for professionals who want speed without losing judgement.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/" hash="login">
              <Button size="lg" className="rounded-full gap-2 min-h-[48px] bg-landing-dark px-8 text-[15px] font-medium text-landing-light hover:bg-landing-dark-subtle">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[16px] text-landing-dark">Tools</p>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-normal tracking-tight text-landing-dark leading-tight">
              Five tools, one workspace
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map(t => (
              <div key={t.title} className="rounded-xl border border-landing-grid bg-landing-bg p-6 transition-colors hover:border-landing-dark/20">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-landing-dark text-landing-light">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[17px] font-semibold text-landing-dark">{t.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-landing-light-muted">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-28 bg-landing-bg" style={dotGridBg}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[16px] text-landing-dark">Why Workplace AI</p>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-normal tracking-tight text-landing-dark leading-tight">
              Speed with guardrails
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {benefits.map(b => (
              <div key={b.title} className="rounded-xl border border-landing-grid bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-landing-dark text-landing-light">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[17px] font-semibold text-landing-dark">{b.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-landing-light-muted">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[700px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-tight tracking-tight text-landing-dark">
            Ready to ship more, faster?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] text-landing-light-muted">
            Sign up free and start using all five tools in under a minute.
          </p>
          <div className="mt-10">
            <Link to="/" hash="login">
              <Button size="lg" className="rounded-full gap-2 min-h-[48px] bg-landing-dark px-8 text-[15px] font-medium text-landing-light hover:bg-landing-dark-subtle">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-landing-grid bg-landing-bg py-6 sm:py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-landing-dark" />
            <span className="text-[15px] text-landing-light-muted">Workplace AI</span>
          </div>
          <p className="text-xs text-landing-light-muted/70">
            AI-generated content may be inaccurate. Always review before use. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
