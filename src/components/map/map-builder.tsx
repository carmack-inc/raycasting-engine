"use client";

import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ColorOptions } from "@/lib/engine/colors";
import { useMemo, useState } from "react";

export type Tool = GeneralTool | EssentialTool | EnemyTool | WallTool
export type GeneralTool = "pointer" | "eraser"
export type EssentialTool = "player" | "end" | "death"
export type EnemyTool = "enemy_gladiator"
export type WallTool = "wall_blue" | "wall_red" | "wall_green" | "wall_cyan" | "wall_magenta" | "wall_yellow"

export type CellValue = EssentialTool | EnemyTool | WallTool
export type Map = (CellValue | undefined)[]

const MAP: ColorOptions[][] = [
  [0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
];

const COLUMNS = MAP[0].length;
const ROWS = MAP.length;

const innerToOutieMap: Record<ColorOptions, CellValue | undefined> = {
  0: undefined,
  1: "wall_red",
  2: "wall_green",
  3: "wall_blue",
  4: undefined,
  5: "wall_cyan",
  6: "wall_magenta",
  7: "wall_yellow",
}

function createInitialMap(): Map {
  // return Array.from<CellValue | undefined>({ length: ROWS * COLUMNS })

  const example = MAP.flatMap((row) => row.map((cell) => innerToOutieMap[cell]));

  // Position the player
  example[9 * COLUMNS + 3] = "player";

  return example;
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
