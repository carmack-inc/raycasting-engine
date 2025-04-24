"use client";

import { CellValue, Map, SpawnPlayer } from "@/components/map/map-builder";
import { ColorOptions } from "@/lib/engine/colors";
import { Core } from "@/lib/engine/core";
import { InputManager } from "@/lib/engine/inputManager";
import { CanvasPaint } from "@/lib/engine/paint";

import { Player } from "@/lib/engine/player";
import { Renderer } from "@/lib/engine/render/renderer";
import { Settings } from "@/lib/engine/settings";
import { Vec2 } from "@/lib/engine/vector";
import { useEffect, useMemo, useRef } from "react";

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
const CANVAS_WIDTH = 640; // USER PREFERENCE
const CANVAS_HEIGHT = 480; // USER PREFERENCE
const MINIMAP_SIZE: number = 200; // USER PREFERENCE
const MINIMAP_ZOOM: number = 5; // USER PREFERENCE
const PIXEL_SIZE: number = MINIMAP_SIZE / (MINIMAP_ZOOM * 2); // INTERNAL
const MINIMAP_POSITION_X = CANVAS_WIDTH - MINIMAP_SIZE - PIXEL_SIZE / 2; // USER PREFERENCE
const MINIMAP_POSITION_Y = CANVAS_HEIGHT - MINIMAP_SIZE - PIXEL_SIZE / 2; // USER PREFERENCE
const UP_KEY = "W"; // USER PREFERENCE
const DOWN_KEY = "S"; // USER PREFERENCE
const LEFT_KEY = "A"; // USER PREFERENCE
const RIGHT_KEY = "D"; // USER PREFERENCE
const WALK_SPEED = 0.05;
const ROTATE_SPEED = 3;
const POSITION = { x: 3, y: 9 };
const DIRECTION = { x: 1, y: 0 };

export interface GameProps {
  map: Map
  columns: number
}

const outieToInnerMap: Partial<Record<CellValue, ColorOptions>> = {
  wall_red: 1,
  wall_green: 2,
  wall_blue: 3,
  wall_cyan: 5,
  wall_magenta: 6,
  wall_yellow: 7,
}

const playerPosMapping: Record<SpawnPlayer, Vec2> = {
  player_l: { x: -1, y: 0 },
  player_tl: { x: -1, y: 1 },
  player_t: { x: 0, y: 1 },
  player_tr: { x: 1, y: 1 },
  player_r: { x: 1, y: 0 },
  player_br: { x: 1, y: -1 },
  player_b: { x: 0, y: -1 },
  player_bl: { x: -1, y: -1 }
}

export function Game({ map, columns }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineMap = useMemo(() => {
    const transformed = map.map((cell) => cell ? (outieToInnerMap[cell] ?? 0) : 0);
    const innerMap: ColorOptions[][] = [];

    for (let i = 0; i < map.length; i += columns) {
      innerMap.push(transformed.slice(i, i + columns));
    }

    return innerMap;
  }, [map, columns]);

  const mapPlayer = useMemo(() => {
    const index = map.findIndex((cell) => cell?.startsWith("player_"));
    const player = map[index] as SpawnPlayer

    return {
      position: { x: index % columns, y: Math.floor(index / columns) },
      direction: playerPosMapping[player],
    };
  }, [map, columns])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;

    const requestPointer = async () => {
      if (!document.pointerLockElement) {
        try {
          await canvas.requestPointerLock({
            unadjustedMovement: true,
          });
        } catch (error) {
          if (error instanceof Error && error.name === "NotSupportedError") {
            await canvas.requestPointerLock();
          } else {
            throw error;
          }
        }
      }
    };
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    const settings = new Settings({
      canvas: {
        size: {
          w: CANVAS_WIDTH,
          h: CANVAS_HEIGHT,
        },
      },
      map: engineMap,
      minimap: {
        size: MINIMAP_SIZE,
        position: {
          x: MINIMAP_POSITION_X,
          y: MINIMAP_POSITION_Y,
        },
        zoom: MINIMAP_ZOOM,
      },
    });

    canvas.addEventListener("click", requestPointer);

    canvas.addEventListener("mousemove", (event) => {
      input.produceMouseInput(event.movementX);
    });

    document.addEventListener("keydown", (event) => {
      input.registerKeyboardInput(event.key);
    });

    document.addEventListener("keyup", (event) => {
      input.deregisterKeyboardInput(event.key);
    });

    const player = new Player(
      {
        position: { x: mapPlayer.position.x, y: mapPlayer.position.y },
        direction: { x: mapPlayer.direction.x, y: mapPlayer.direction.y },
        rotateSpeed: ROTATE_SPEED,
        walkSpeed: WALK_SPEED,
      },
      settings
    );

    const canvasPaint = new CanvasPaint(canvas);

    const renderer = new Renderer(settings, canvasPaint);
    const core = new Core(player, input, renderer);
    core.start();

    //start(canvas);
    return () => {
      core.stop();
      canvas.removeEventListener("click", requestPointer);
    };
  }, []);

  return (
    <canvas
      className="bg-black rounded-md"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      ref={canvasRef}
    />
  );
}
