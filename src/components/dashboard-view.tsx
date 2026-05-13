import { Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const tools = [
  {
    to: '/email',
    icon: Mail,
    title: 'Smart Email Generator',
    description: 'Draft polished emails in seconds. Pick a tone, give context, and get a ready-to-send draft.',
  },
  {
    to: '/meeting-notes',
    icon: FileText,
    title: 'Meeting Notes Summarizer',
    description: 'Turn raw transcripts or notes into clear summaries with decisions and action items.',
  },
  {
    to: '/tasks',
    icon: ListChecks,
    title: 'AI Task Planner',
    description: 'Break a goal into prioritized, time-estimated steps you can drop into your task manager.',
  },
  {
    to: '/research',
    icon: Search,
    title: 'AI Research Assistant',
    description: 'Get a structured briefing on any topic — summary, key facts, perspectives, and next steps.',
  },
  {
    to: '/chat',
    icon: MessageSquare,
    title: 'AI Chatbot',
    description: 'A general-purpose assistant for brainstorming, rewriting, explaining, and ad-hoc questions.',
  },
];

export function DashboardView() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Workplace AI
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your AI productivity workspace
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Five focused tools to help you write faster, plan better, and turn information into action — all in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map(t => (
          <Link
            key={t.to}
            to={t.to}
            className="group block"
          >
            <Card className="h-full p-5 transition-colors hover:border-primary/40 hover:bg-accent/30">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{t.title}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="flex items-start gap-3 border-dashed bg-muted/30 p-4">
        <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Responsible AI.</span>{' '}
          Outputs are AI-generated and may contain errors or bias. Always review before sending or acting on them, and avoid pasting confidential or personally identifying information you wouldn't share publicly.
        </div>
      </Card>
    </div>
  );
}
