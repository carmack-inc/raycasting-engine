"use client";

import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ColorOptions } from "@/lib/engine/colors";
import { useMemo, useState } from "react";

export type Tool = GeneralTool | EssentialTool | EnemyTool | WallTool
export type GeneralTool = "hand" | "pivot" | "eraser"
export type EssentialTool = "player" | "end" | "death"
export type EnemyTool = "enemy_gladiator"
export type WallTool = "wall_blue" | "wall_red" | "wall_green" | "wall_cyan" | "wall_magenta" | "wall_yellow"

export type SpawnPlayer = "player_t" | "player_tr" | "player_tl"
  | "player_l" | "player_r"
  | "player_b" | "player_br" | "player_bl"

export type CellValue = Exclude<EssentialTool, "player"> | EnemyTool | WallTool | SpawnPlayer
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
  example[9 * COLUMNS + 3] = "player_r";

  return example;
}

const PLAYER_POSITIONS: readonly SpawnPlayer[] = [
  "player_t", "player_tr", "player_r",
  "player_br", "player_b", "player_bl",
  "player_l", "player_tl",
]

export function isPlayerCell(val: CellValue | undefined): val is SpawnPlayer {
  return val?.startsWith("player_") ?? false
}

export function MapBuilder() {
  const [activeTool, setActiveTool] = useState<Tool>("hand");
  const [map, setMap] = useState(createInitialMap);
  const playerRequired = useMemo(
    () => map.findIndex((cell) => isPlayerCell(cell)) == -1,
    [map],
  );

  function updateCell(index: number) {
    const cell = map[index];

    if (activeTool === "hand") {
      return;
    }

    if (activeTool === "eraser") {
      setMap((map) => map.with(index, undefined));
      return;
    }

    if (activeTool === "pivot") {
      if (isPlayerCell(cell)) {
        const current = PLAYER_POSITIONS.indexOf(cell)
        const next = PLAYER_POSITIONS[(current + 1) % PLAYER_POSITIONS.length]

        setMap((map) => map.with(index, next))
      }

      return;
    }

    if (activeTool === "player") {
      // Check if there's an existing player and move it if it's the case.
      const existingPlayerIndex = map.findIndex((cell) => isPlayerCell(cell));
      
      if (existingPlayerIndex >= 0) {
        const existingPlayer = map[existingPlayerIndex];
        setMap((map) => map.with(existingPlayerIndex, undefined).with(index, existingPlayer))
      } else {
        setMap((map) => map.with(index, "player_r"));
      }

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
        <Header
          gameDisabled={playerRequired}
          map={map}
          columns={COLUMNS}
        />
        <div
          className="data-[tool=hand]:cursor-grab active:data-[tool=hand]:cursor-grabbing"
          data-tool={activeTool}
        >
          <MapContent
            map={map}
            zoomDisabled={activeTool !== "hand"}
            columns={COLUMNS}
            onCellClick={updateCell}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
