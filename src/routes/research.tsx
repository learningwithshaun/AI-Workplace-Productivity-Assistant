import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { AppLayout } from '@/components/app-layout';
import { AiToolShell } from '@/components/ai-tool-shell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Route = createFileRoute('/research')({ component: ResearchPage });

function ResearchPage() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <LoginPage />;
  return (
    <AppLayout>
      <ResearchTool />
    </AppLayout>
  );
}

function ResearchTool() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('general');
  const [angle, setAngle] = useState('');

  const buildPrompt = () => {
    if (!topic.trim()) return null;
    const system = `You are a research assistant producing structured briefings.

Output Markdown with these sections, in order:
## Summary
A 3–5 sentence overview of the topic.

## Key Facts
A bulleted list of 5–8 concrete facts or definitions.

## Different Perspectives
Bulleted list summarizing 2–4 viewpoints, trade-offs, or schools of thought.

## Practical Implications
What this means for the reader's audience.

## Suggested Next Steps
3–5 things the reader could do, read, or ask next.

## Caveats
Note your knowledge limits and where the reader should verify with primary sources.

Rules:
- Be balanced and label opinions as such.
- Do NOT invent statistics, dates, citations, or quotes. If unsure, say so.
- Prefer clarity over length.`;
    const user = `Topic: ${topic.trim()}
Audience: ${audience}
Specific angle or question: ${angle.trim() || 'general overview'}`;
    return { system, user };
  };

  return (
    <AiToolShell
      title="AI Research Assistant"
      description="Get a structured briefing on any topic — with caveats and next steps."
      icon={Search}
      generateLabel="Research"
      renderMode="markdown"
      emptyHint="Enter a topic to get a structured briefing."
      buildPrompt={buildPrompt}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="topic">Topic *</Label>
            <Input
              id="topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Retrieval-augmented generation in enterprise apps"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General professional</SelectItem>
                  <SelectItem value="exec">Executive / non-technical</SelectItem>
                  <SelectItem value="technical">Technical / engineer</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="angle">Specific angle (optional)</Label>
              <Input
                id="angle"
                value={angle}
                onChange={e => setAngle(e.target.value)}
                placeholder="e.g. Cost vs. accuracy trade-offs"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="extra">Extra context (optional)</Label>
            <Textarea
              id="extra"
              value={angle}
              onChange={e => setAngle(e.target.value)}
              placeholder="Anything specific you already know or want emphasized…"
              rows={3}
            />
          </div>
        </div>
      }
    />
  );
}
