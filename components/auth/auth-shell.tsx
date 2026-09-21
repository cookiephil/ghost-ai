import { FileText, Sparkles, Users, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-dvh w-full bg-base lg:grid-cols-2">
      <aside className="hidden border-r border-surface-border bg-surface lg:block">
        <div className="flex h-full flex-col justify-between bg-accent-dim px-16 py-12">
          <div className="flex items-center gap-3 text-base font-semibold text-copy-primary">
            <span className="h-8 w-8 rounded-xl bg-brand" aria-hidden="true" />
            Ghost AI
          </div>

          <div className="flex max-w-lg flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-copy-primary">
                Design systems at the speed of thought.
              </h1>
              <p className="text-base leading-relaxed text-copy-muted">
                Describe your architecture in plain English. Ghost AI maps it to a
                shared canvas your whole team can refine in real time.
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-accent-dim text-brand">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-medium text-copy-primary">
                      {title}
                    </span>
                    <span className="text-sm text-copy-muted">{description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-copy-faint">
            © {new Date().getFullYear()} Ghost AI. All rights reserved.
          </p>
        </div>
      </aside>
      <main className="flex items-center justify-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
