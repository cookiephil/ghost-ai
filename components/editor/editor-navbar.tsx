import { UserButton } from "@clerk/nextjs";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  sidebarId?: string;
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  sidebarId,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen;
  const label = isSidebarOpen ? "Close projects sidebar" : "Open projects sidebar";

  return (
    <header className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-surface-border bg-surface px-3">
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="ghost"
          size="icon-lg"
          className="text-copy-muted hover:text-copy-primary"
          onClick={onToggleSidebar}
          aria-label={label}
          aria-expanded={isSidebarOpen}
          aria-controls={sidebarId}
        >
          <SidebarIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2" />

      <div className="flex items-center justify-end gap-2">
        <UserButton />
      </div>
    </header>
  );
}
