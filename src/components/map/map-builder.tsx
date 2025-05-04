"use client";

import { Header } from "@/app/engine/header";
import { MapContent } from "@/components/map/map-content";
import { MapSidebar } from "@/components/map/map-sidebar";
import { SettingsDialog, SettingsSchema } from "@/components/settings-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ColorOptions } from "@/lib/engine/configuration/colors";
import { maps } from "@/lib/map-examples";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

export type Tool = GeneralTool | EssentialTool | EnemyTool | WallTool
export type GeneralTool = "hand" | "pivot" | "eraser"
export type EssentialTool = "player" | "end" | "death"
export type EnemyTool = "enemy_square" | "enemy_circle"
export type WallTool = "wall_blue" | "wall_red" | "wall_green" | "wall_cyan" | "wall_magenta" | "wall_yellow"

export type SpawnPlayer = "player_t" | "player_tr" | "player_tl"
  | "player_l" | "player_r"
  | "player_b" | "player_br" | "player_bl"

export type CellValue = Exclude<EssentialTool, "player"> | EnemyTool | WallTool | SpawnPlayer
export type Map = (CellValue | undefined)[]

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

const querySchema = z.coerce.number().min(1).max(6);

interface MapState {
  map: Map;
  columns: number;
  rows: number;
}

function createInitialMap(exampleId?: number): MapState {
  if (!exampleId) {
    const rows = 20;
    const columns = 20;

    return {
      map: Array.from<CellValue | undefined>({ length: rows * columns }),
      rows,
      columns,
    };
  }

  const example = maps[exampleId - 1];
  const rows = example.map.length;
  const columns = example.map[0].length;
  const map = example.map.flatMap((row) => row.map((cell) => innerToOutieMap[cell]));

  // Position the player
  map[example.spawn.x * columns + example.spawn.y] = "player_r";

  return { map, rows, columns };
}

const PLAYER_POSITIONS: readonly SpawnPlayer[] = [
  "player_t", "player_tr", "player_r",
  "player_br", "player_b", "player_bl",
  "player_l", "player_tl",
]

export function isPlayerCell(val: CellValue | undefined): val is SpawnPlayer {
  return val?.startsWith("player_") ?? false
}

export function isEnemyCell(val: CellValue | undefined): val is EnemyTool {
  return val?.startsWith("enemy_") ?? false
}

export function MapBuilder() {
  const [activeTool, setActiveTool] = useState<Tool>("hand");
  const [map, setMap] = useState(createInitialMap);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsSchema>({
    sensitivity: [3],
    // fov: [80],
    minimapSize: [200],
    minimapZoom: [1],
    keyUp: "W",
    keyDown: "S",
    keyLeft: "A",
    keyRight: "D",
  });

  const searchParams = useSearchParams();
  const exampleQuery = searchParams.get("example");

  useEffect(() => {
    const exampleId = querySchema.safeParse(exampleQuery);

    if (exampleId.data) {
      setMap(createInitialMap(exampleId.data));
    }
  }, [exampleQuery]);

  const playerRequired = useMemo(
    () => map.map.findIndex((cell) => isPlayerCell(cell)) == -1,
    [map],
  );

  function updateCell(index: number) {
    const cell = map.map[index];

    if (activeTool === "hand") {
      return;
    }

    if (activeTool === "eraser") {
      setMap((map) => ({ ...map, map: map.map.with(index, undefined) }));
      return;
    }

    if (activeTool === "pivot") {
      if (isPlayerCell(cell)) {
        const current = PLAYER_POSITIONS.indexOf(cell)
        const next = PLAYER_POSITIONS[(current + 1) % PLAYER_POSITIONS.length]

        setMap((map) => ({ ...map, map: map.map.with(index, next) }));
      }

      return;
    }

    if (activeTool === "player") {
      // Check if there's an existing player and move it if it's the case.
      const existingPlayerIndex = map.map.findIndex((cell) => isPlayerCell(cell));
      
      if (existingPlayerIndex >= 0) {
        const existingPlayer = map.map[existingPlayerIndex];
        setMap((map) => ({
          ...map,
          map: map.map.with(existingPlayerIndex, undefined).with(index, existingPlayer),
        }))
      } else {
        setMap((map) => ({ ...map, map: map.map.with(index, "player_r") }));
      }

      return;
    }

    setMap((map) => ({ ...map, map: map.map.with(index, activeTool) }));
  }

  return (
    <SidebarProvider>
      <MapSidebar
        tool={activeTool}
        playerRequired={playerRequired}
        onToolChange={setActiveTool}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      <SidebarInset className="min-w-0 [--navbar-height:theme(spacing.12)]">
        <Header
          gameDisabled={playerRequired}
          map={map.map}
          columns={map.columns}
          settings={settings}
        />
        <div
          className="data-[tool=hand]:cursor-grab active:data-[tool=hand]:cursor-grabbing"
          data-tool={activeTool}
        >
          <MapContent
            map={map.map}
            zoomDisabled={activeTool !== "hand"}
            columns={map.columns}
            onCellClick={updateCell}
          />
        </div>
      </SidebarInset>
      
      <SettingsDialog
        open={settingsOpen}
        settings={settings}
        onOpenChange={setSettingsOpen}
        onSettingsChange={setSettings}
      />
    </SidebarProvider>
  );
}
