import { Settings } from "./settings";
import { Vec2, Vector } from "./vector";

type DDAFunction = {
  initialPos: Vec2;
  rayDirection: Vec2;
};

type Sides = "x" | "y";

export type RayInfo = {
  perpDist: number;
  mapHit: Vec2;
  rayDirection: Vec2;
  side: Sides;
};

export class RayCast {
  private _settings: Settings;
  constructor(settings: Settings) {
    this._settings = settings;
  }

  castAllRays(playerPosition: Vec2, playerDirection: Vec2): RayInfo[] {
    // const pos = this._player.position;
    // const rayDir = this._player.direction;
    const raysInfo: RayInfo[] = [];
    const perpRayDir = Vector.findPerpVector(playerDirection);

    const CANVAS_WIDTH = this._settings.canvasWidth;
    for (let i = 0; i < CANVAS_WIDTH; i++) {
      const offsetXViewport = 1 - (2 * i) / CANVAS_WIDTH;

      const rayDirection = {
        x: perpRayDir.x * offsetXViewport + playerDirection.x,
        y: perpRayDir.y * offsetXViewport + playerDirection.y,
      };

      const rayInfo = this.castRay({
        initialPos: playerPosition,
        rayDirection,
      });

      raysInfo.push(rayInfo);
    }

    return raysInfo;
  }

  castRay({ initialPos, rayDirection }: DDAFunction): RayInfo {
    const pos = { x: initialPos.x, y: initialPos.y };
    const mapPos = { x: Math.floor(pos.x), y: Math.floor(pos.y) };
    let side: Sides = "x";

    if (this.hitFunction(mapPos)) {
      return {
        perpDist: 0,
        mapHit: { x: mapPos.x, y: mapPos.y },
        rayDirection,
        side,
      };
    }

    const deltaDist = {
      x: rayDirection.x == 0 ? Infinity : Math.abs(1 / rayDirection.x),
      y: rayDirection.y == 0 ? Infinity : Math.abs(1 / rayDirection.y),
    };

    const sideDist = this.findSidesSize(rayDirection, pos, mapPos);
    sideDist.x = sideDist.x * deltaDist.x;
    sideDist.y = sideDist.y * deltaDist.y;

    let hit = false;

    const step = {
      x: rayDirection.x > 0 ? 1 : -1,
      y: rayDirection.y > 0 ? -1 : 1, // NEGATIVE Y AXIS IN CANVAS
    };

    while (hit == false) {
      if (sideDist.x < sideDist.y) {
        sideDist.x += deltaDist.x;
        mapPos.x += step.x;
        side = "x";
      } else {
        sideDist.y += deltaDist.y;
        mapPos.y += step.y;
        side = "y";
      }

      hit = this.hitFunction(mapPos);
    }

    if (side == "x")
      return {
        perpDist: sideDist.x - deltaDist.x,
        mapHit: { x: mapPos.x, y: mapPos.y },
        rayDirection,
        side: "x",
      };

    return {
      perpDist: sideDist.y - deltaDist.y,
      mapHit: { x: mapPos.x, y: mapPos.y },
      rayDirection,
      side: "y",
    };
  }

  hitFunction(cell: Vec2) {
    const MAP = this._settings.map;
    if (this.isCellOutOfBounds(cell)) return true;
    if (MAP[cell.y][cell.x] > 0) return true;
    return false;
  }

  findSidesSize(rayDir: Vec2, pos: Vec2, mapPos: Vec2): Vec2 {
    let sideDist = { x: 0, y: 0 };

    if (rayDir.x > 0) {
      sideDist.x = mapPos.x + 1 - pos.x;
    } else {
      sideDist.x = pos.x - mapPos.x;
    }

    if (rayDir.y > 0) {
      sideDist.y = pos.y - mapPos.y;
    } else {
      sideDist.y = mapPos.y + 1 - pos.y;
    }

    return sideDist;
  }

  isCellOutOfBounds(cell: Vec2) {
    if (cell.y > this._settings.map.length - 1) return true;
    if (cell.x > this._settings.map[0].length - 1) return true;
    if (cell.y < 0) return true;
    if (cell.x < 0) return true;
    return false;
  }

  calculteLineHeight(perpDist: number) {
    const CANVAS_HEIGHT = this._settings.canvasHeight;
    const lineHeight = Math.floor(CANVAS_HEIGHT / perpDist);
    const lineStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
    const lineEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

    return {
      lineStart: lineStart < 0 ? 0 : Math.floor(lineStart),
      lineEnd:
        lineEnd >= CANVAS_HEIGHT ? CANVAS_HEIGHT - 1 : Math.floor(lineEnd),
    };
  }
}
