import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ListChecks } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { AppLayout } from '@/components/app-layout';
import { AiToolShell } from '@/components/ai-tool-shell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/tasks')({ component: TasksPage });

function TasksPage() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <LoginPage />;
  return (
    <AppLayout>
      <TaskTool />
    </AppLayout>
  );
}

function TaskTool() {
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');
  const [constraints, setConstraints] = useState('');

  const buildPrompt = () => {
    if (!goal.trim()) return null;
    const system = `You are an expert project planner. Break a goal into a clear, prioritized task plan.

Output Markdown with these sections, in order:
## Plan Overview
1–2 sentences framing the approach.

## Tasks
A numbered list. Each task is one line in this exact format:
"N. [Priority: High|Medium|Low] Task title — Est. <time>. <One-sentence rationale>."

## Suggested Order
A short paragraph explaining sequencing and any parallelizable work.

## Risks & Watch-outs
Bulleted list of risks or assumptions to validate.

Rules:
- 5–10 tasks. Be concrete and actionable.
- Time estimates in hours/days as appropriate.
- Don't invent facts; if context is missing, flag it as an assumption.`;
    const user = `Goal: ${goal.trim()}
Deadline: ${deadline || 'not specified'}
Constraints / context: ${constraints.trim() || 'none provided'}`;
    return { system, user };
  };

  return (
    <AiToolShell
      title="AI Task Planner"
      description="Turn a goal into a prioritized, time-estimated task list."
      icon={ListChecks}
      generateLabel="Build plan"
      renderMode="markdown"
      emptyHint="Describe a goal and the planner will break it into steps."
      buildPrompt={buildPrompt}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="goal">Goal *</Label>
            <Input
              id="goal"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="e.g. Launch a customer onboarding email sequence"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="deadline">Deadline (optional)</Label>
              <Input
                id="deadline"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                placeholder="e.g. End of Q2"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="constraints">Constraints / context (optional)</Label>
              <Input
                id="constraints"
                value={constraints}
                onChange={e => setConstraints(e.target.value)}
                placeholder="e.g. Solo, ~5 hrs/week, no budget"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="extra">Anything else worth knowing?</Label>
            <Textarea
              id="extra"
              value={constraints}
              onChange={e => setConstraints(e.target.value)}
              placeholder="Tools available, team size, dependencies, prior progress…"
              rows={4}
            />
          </div>
        </div>
      }
    />
  );
}
