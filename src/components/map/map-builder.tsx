"use client";

import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useMemo, useState } from "react";

export type Tool = GeneralTool | EssentialTool | EnemyTool | WallTool
export type GeneralTool = "pointer" | "eraser"
export type EssentialTool = "player" | "end" | "death"
export type EnemyTool = "enemy_gladiator"
export type WallTool = "wall_blue" | "wall_red" | "wall_green" | "wall_cyan" | "wall_magenta" | "wall_yellow"

export type CellValue = EssentialTool | EnemyTool | WallTool

const COLUMNS = 25;
const ROWS = 25;

function createInitialMap() {
  return Array.from<CellValue | undefined>({ length: ROWS * COLUMNS })
}

export function MapBuilder() {
  const [activeTool, setActiveTool] = useState<Tool>("pointer");
  const [map, setMap] = useState(createInitialMap);
  const playerRequired = useMemo(() => !map.includes("player"), [map])

  function updateCell(index: number) {
    if (activeTool === "pointer") {
      return;
    }

    if (activeTool === "eraser") {
      setMap((map) => map.with(index, undefined));
      return;
    }

    if (activeTool === "player" && playerRequired) {
      setMap((map) => map.with(index, "player"));
      setActiveTool("pointer");
      return;
    }

    setMap((map) => map.with(index, activeTool));
  }

  return (
    <SidebarProvider>
      <MapSidebar
        tool={activeTool}
        playerRequired={playerRequired}
        onToolChange={setActiveTool}
      />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header gameDisabled={playerRequired} />
        <MapContent
          map={map}
          columns={COLUMNS}
          onCellClick={updateCell}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
