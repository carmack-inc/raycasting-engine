"use client";

import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export type Tool = GeneralTool | EssentialTool | EnemyTool | WallTool
type GeneralTool = "pointer" | "eraser"
type EssentialTool = "player" | "end" | "death"
type EnemyTool = "enemy_gladiator"
type WallTool = "wall_blue" | "wall_red" | "wall_green"

export function MapBuilder() {
  const [activeTool, setActiveTool] = useState<Tool>("pointer");

  return (
    <SidebarProvider>
      <MapSidebar tool={activeTool} onToolChange={setActiveTool} />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header />
        <MapContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
