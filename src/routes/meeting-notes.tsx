import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { AppLayout } from '@/components/app-layout';
import { AiToolShell } from '@/components/ai-tool-shell';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Route = createFileRoute('/meeting-notes')({ component: MeetingPage });

function MeetingPage() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <LoginPage />;
  return (
    <AppLayout>
      <MeetingTool />
    </AppLayout>
  );
}

function MeetingTool() {
  const [transcript, setTranscript] = useState('');
  const [style, setStyle] = useState('exec');

  const buildPrompt = () => {
    if (!transcript.trim()) return null;
    const styleHint =
      style === 'exec'
        ? 'a tight executive summary suitable for leadership'
        : style === 'detailed'
          ? 'a detailed structured summary preserving nuance'
          : 'a brief stand-up style recap';
    const system = `You summarize meeting transcripts and notes for busy professionals.

Always output Markdown with these sections, in order:
## TL;DR
A 2–3 sentence summary.

## Key Discussion Points
Bulleted list of the substantive topics discussed.

## Decisions
Bulleted list of decisions made. If none, write "None recorded."

## Action Items
Bulleted list in the form: "- [Owner] Action — due [date if mentioned, else 'TBD']".
If no owner is mentioned, use "[Unassigned]".

## Open Questions
Anything raised but not resolved. If none, write "None."

Be faithful to the source. Do not invent owners, dates, or decisions.`;
    const user = `Summarize the following meeting notes as ${styleHint}.

---
${transcript.trim()}`;
    return { system, user };
  };

  return (
    <AiToolShell
      title="Meeting Notes Summarizer"
      description="Paste a transcript or rough notes and get a structured summary."
      icon={FileText}
      generateLabel="Summarize"
      renderMode="markdown"
      emptyHint="Paste meeting notes or a transcript to get a summary."
      buildPrompt={buildPrompt}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Summary style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="sm:max-w-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="exec">Executive summary</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="standup">Stand-up recap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="transcript">Transcript or notes *</Label>
            <Textarea
              id="transcript"
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Paste the full transcript or your raw notes here…"
              rows={10}
            />
          </div>
        </div>
      }
    />
  );
}
