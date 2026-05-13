import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '@/lib/use-auth';
import { LoginPage } from '@/components/login-page';
import { AppLayout } from '@/components/app-layout';
import { AiToolShell } from '@/components/ai-tool-shell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Route = createFileRoute('/email')({ component: EmailPage });

function EmailPage() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <LoginPage />;
  return (
    <AppLayout>
      <EmailTool />
    </AppLayout>
  );
}

function EmailTool() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [context, setContext] = useState('');

  const buildPrompt = () => {
    if (!context.trim()) return null;
    const system = `You are an expert email writer. Produce a single, ready-to-send email.

Rules:
- Output ONLY the email body. Do not include "Subject:", commentary, or explanations.
- Match the requested tone exactly.
- Be specific; avoid filler. No placeholders unless the user asks for them.
- End with an appropriate sign-off.`;
    const user = `Write an email with the following details.

Recipient: ${recipient || 'unspecified'}
Subject: ${subject || 'unspecified'}
Tone: ${tone}
Length: ${length}

Context / what to say:
${context.trim()}`;
    return { system, user };
  };

  return (
    <AiToolShell
      title="Smart Email Generator"
      description="Draft a polished email from a few quick details."
      icon={Mail}
      generateLabel="Generate email"
      emptyHint="Add some context about what you want to say, then generate."
      buildPrompt={buildPrompt}
      inputs={
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. Sarah, my manager" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Project update" />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (2–3 sentences)</SelectItem>
                <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
                <SelectItem value="long">Long (multi-paragraph)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="context">What do you want to say? *</Label>
            <Textarea
              id="context"
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="Bullet points or a rough draft work great. e.g. Need to push the deadline by 1 week, blocker is design review, propose Friday Nov 22."
              rows={5}
            />
          </div>
        </div>
      }
    />
  );
}
