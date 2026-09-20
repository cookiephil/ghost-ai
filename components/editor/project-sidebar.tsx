import { FolderOpen, Plus, Users, X } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface EmptyStateProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <Icon className="h-8 w-8 text-copy-faint" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-copy-secondary">{title}</p>
        <p className="text-xs text-copy-muted">{description}</p>
      </div>
    </div>
  );
}

export function ProjectSidebar({ id, isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      id={id}
      aria-label="Projects"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        "absolute top-3 bottom-3 left-3 z-40 flex w-72 flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface/80 backdrop-blur-xl transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1.5rem)]",
      )}
    >
      <div className="flex items-center justify-between border-b border-surface-border py-3 pr-3 pl-4">
        <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-copy-muted hover:text-copy-primary"
          onClick={onClose}
          aria-label="Close projects sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 gap-0 p-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects">
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Projects you create will appear here."
          />
        </TabsContent>
        <TabsContent value="shared">
          <EmptyState
            icon={Users}
            title="Nothing shared with you"
            description="Projects others share with you will appear here."
          />
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border p-3">
        <Button className="w-full">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
