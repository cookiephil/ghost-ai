"use client";

import { useState } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

const SIDEBAR_ID = "project-sidebar";

export function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        sidebarId={SIDEBAR_ID}
      />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <ProjectSidebar
          id={SIDEBAR_ID}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex h-full items-center justify-center text-copy-muted">
          ghost ai
        </main>
      </div>
    </div>
  );
}
