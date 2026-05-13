import { ReactNode, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Copy, RotateCcw, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { streamAI, type Msg } from '@/lib/ai-stream';

type Props = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Form fields rendered at the top */
  inputs: ReactNode;
  /** Build the system + user prompt from current state */
  buildPrompt: () => { system: string; user: string } | null;
  /** Optional empty-state message when the form isn't filled in */
  emptyHint?: string;
  /** Optional: render markdown vs. plain editable text. Default: editable text. */
  renderMode?: 'markdown' | 'text';
  generateLabel?: string;
};

export function AiToolShell({
  title,
  description,
  icon: Icon,
  inputs,
  buildPrompt,
  emptyHint = 'Fill in the form above to generate.',
  renderMode = 'text',
  generateLabel = 'Generate',
}: Props) {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const run = async () => {
    const prompt = buildPrompt();
    if (!prompt) {
      toast.error('Please fill in the required fields.');
      return;
    }
    setOutput('');
    setLoading(true);
    abortRef.current = new AbortController();
    let acc = '';
    await streamAI({
      system: prompt.system,
      messages: [{ role: 'user', content: prompt.user }] as Msg[],
      signal: abortRef.current.signal,
      onDelta: chunk => {
        acc += chunk;
        setOutput(acc);
      },
      onDone: () => setLoading(false),
      onError: e => {
        setLoading(false);
        toast.error(e.message || 'AI request failed');
      },
    });
  };

  const stop = () => abortRef.current?.abort();

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card className="p-5 space-y-4">
        {inputs}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button onClick={run} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Generating…' : generateLabel}
          </Button>
          {loading && (
            <Button variant="outline" onClick={stop}>Stop</Button>
          )}
        </div>
      </Card>

      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Output</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOutput('')}
              disabled={!output || loading}
              className="gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={copy}
              disabled={!output}
              className="gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        {output || loading ? (
          renderMode === 'markdown' && !loading ? (
            <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border border-border bg-muted/30 p-4">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          ) : (
            <Textarea
              value={output}
              onChange={e => setOutput(e.target.value)}
              placeholder={loading ? 'Streaming response…' : ''}
              rows={14}
              className="font-mono text-sm leading-relaxed resize-y"
            />
          )
        ) : (
          <div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {emptyHint}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Output is editable. Always review AI-generated content for accuracy, tone, and compliance before using it.
        </p>
      </Card>
    </div>
  );
}
