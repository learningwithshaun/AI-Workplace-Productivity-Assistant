import { Link, useLocation } from '@tanstack/react-router';
import { useAuth } from '@/lib/use-auth';
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Sparkles,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Email Generator', to: '/email', icon: Mail },
  { label: 'Meeting Notes', to: '/meeting-notes', icon: FileText },
  { label: 'Task Planner', to: '/tasks', icon: ListChecks },
  { label: 'Research', to: '/research', icon: Search },
  { label: 'Chatbot', to: '/chat', icon: MessageSquare },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">Workplace AI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(item => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 truncate px-3 text-xs text-sidebar-foreground/60">
            {user?.email}
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools, prompts, history…"
              className="h-9 w-full rounded-lg border-border bg-card pl-9 text-sm"
            />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user?.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
        <footer className="border-t border-border px-4 py-3 text-xs text-muted-foreground lg:px-6">
          AI can make mistakes. Verify important information. Do not share confidential data you wouldn't paste into a public form.
        </footer>
      </div>
    </div>
  );
}
