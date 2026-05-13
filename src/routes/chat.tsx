import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/lib/use-auth';
import { AppLayout } from '@/components/app-layout';
import { LoginPage } from '@/components/login-page';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { streamAI, type Msg } from '@/lib/ai-stream';

export const Route = createFileRoute('/chat')({ component: ChatPage });

function ChatPage() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <LoginPage />;
  return (
    <AppLayout>
      <ChatInterface />
    </AppLayout>
  );
}

const SYSTEM = `You are Workplace AI, a friendly and helpful assistant for professionals.
- Use Markdown formatting (lists, headings, code blocks where useful).
- Be concise by default; expand on request.
- If you're uncertain, say so. Don't fabricate facts, citations, or numbers.
- Remind the user to verify important information when relevant.`;

function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setIsLoading(true);

    let acc = '';
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: acc } : m));
        }
        return [...prev, { role: 'assistant', content: acc }];
      });
    };

    await streamAI({
      system: SYSTEM,
      messages: next,
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: e => {
        setIsLoading(false);
        toast.error(e.message ?? 'Failed to get response');
      },
    });

    inputRef.current?.focus();
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-4xl flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">AI Chatbot</h1>
          <p className="text-sm text-muted-foreground">Ask anything — brainstorming, rewriting, explaining, planning.</p>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <Bot className="h-10 w-10" />
              <p className="text-sm">Start a conversation. Try "Help me draft a quick stand-up update."</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[90%] rounded-lg px-3 py-2.5 text-sm sm:max-w-[80%] sm:px-4 ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-muted px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Workplace AI…"
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            AI responses may be inaccurate. Don't share confidential information.
          </p>
        </div>
      </Card>
    </div>
  );
}
