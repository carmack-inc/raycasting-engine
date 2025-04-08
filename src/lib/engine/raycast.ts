import { colors } from "./colors";
import { drawMinimap } from "./minimap";
import { paintLine } from "./paint";
import { Player } from "./player";
import { Settings } from "./settingsClass";
import { getPerpVec, Vec2 } from "./vec2";

type DDAFunction = {
  initialPos: Vec2;
  rayDirection: Vec2;
};

export class RayCast {
  static draw(ctx: CanvasRenderingContext2D) {
    const MAP = Settings.getInstance().map;
    const pos = Player.getInstance().position;
    const rayDir = Player.getInstance().direction;
    const euclidianDistArray: Vec2[] = [];
    const perpRayDir = getPerpVec(rayDir);
    ctx.reset();

    const CANVAS_WIDTH = Settings.getInstance().canvasWidth;
    for (let i = 0; i < CANVAS_WIDTH; i++) {
      const offsetXViewport = 1 - (2 * i) / CANVAS_WIDTH;

      const rayDirection = {
        x: perpRayDir.x * offsetXViewport + rayDir.x,
        y: perpRayDir.y * offsetXViewport + rayDir.y,
      };

      const { perpDist, mapHit } = this.findPerpendicularDistance({
        initialPos: pos,
        rayDirection,
      });

      const euclidianDist = {
        x: rayDirection.x * perpDist,
        y: rayDirection.y * perpDist,
      };

      euclidianDistArray.push(euclidianDist);

      const { lineStart, lineEnd } = this.calculteLineHeight(i, perpDist);

      paintLine(lineStart, lineEnd, colors[MAP[mapHit.y][mapHit.x]], ctx);
    }
    drawMinimap(euclidianDistArray, ctx);
  }

  static findPerpendicularDistance({ initialPos, rayDirection }: DDAFunction) {
    const pos = { x: initialPos.x, y: initialPos.y };
    const mapPos = { x: Math.floor(pos.x), y: Math.floor(pos.y) };
    let side: "x" | "y" = "x";

    if (this.hitFunction(mapPos)) {
      return {
        perpDist: 0,
        mapHit: { x: mapPos.x, y: mapPos.y },
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
        side: "x",
      };

    return {
      perpDist: sideDist.y - deltaDist.y,
      mapHit: { x: mapPos.x, y: mapPos.y },
      side: "y",
    };
  }

  static hitFunction(mapPos: Vec2) {
    const MAP = Settings.getInstance().map;
    if (mapPos.y > MAP.length - 1) return true;
    if (mapPos.x > MAP[0].length - 1) return true;
    if (mapPos.y < 0) return true;
    if (mapPos.x < 0) return true;
    if (MAP[mapPos.y][mapPos.x] > 0) return true;
    return false;
  }

  static findSidesSize(rayDir: Vec2, pos: Vec2, mapPos: Vec2): Vec2 {
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

  static calculteLineHeight(column: number, perpDist: number) {
    const CANVAS_HEIGHT = Settings.getInstance().canvasHeight;
    const lineHeight = Math.floor(CANVAS_HEIGHT / perpDist);
    const lineStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
    const lineEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

    return {
      lineStart: { x: column, y: lineStart < 0 ? 0 : lineStart },
      lineEnd: {
        x: column,
        y: lineEnd >= CANVAS_HEIGHT ? CANVAS_HEIGHT - 1 : lineEnd,
      },
    };
  }
}
