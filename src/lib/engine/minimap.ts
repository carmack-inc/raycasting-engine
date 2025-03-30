import { pos } from "./main";
import { paintCircle, paintLine, paintRect } from "./paint";
import {
  colors,
  MAP,
  MINIMAP_POSITION_X,
  MINIMAP_POSITION_Y,
  MINIMAP_ZOOM,
  PIXEL_SIZE,
  RGB,
} from "./settings";
import { Vec2 } from "./vec2";

export function drawMinimap(
  euclidianDistArray: Vec2[],
  ctx: CanvasRenderingContext2D
) {
  drawMinimapBorder(ctx);
  drawMinimapWalls(pos, ctx);
  drawMinimapRays(euclidianDistArray, ctx);
  drawMinimapPlayer(ctx);
}

function resizeRayOutOfMinimap(euclidianDist: Vec2) {
  const maxRayDist = MINIMAP_ZOOM;

  const delimitedRay = { x: euclidianDist.x, y: euclidianDist.y };

  if (Math.abs(delimitedRay.x) > maxRayDist) {
    const proportion = maxRayDist / Math.abs(delimitedRay.x);

    delimitedRay.x = delimitedRay.x > 0 ? maxRayDist : -maxRayDist;
    delimitedRay.y *= proportion;
  }

  if (Math.abs(delimitedRay.y) > maxRayDist) {
    const proportion = maxRayDist / Math.abs(delimitedRay.y);

    delimitedRay.x *= proportion;
    delimitedRay.y = delimitedRay.y > 0 ? maxRayDist : -maxRayDist;
  }

  return delimitedRay;
}

function drawMinimapPlayer(ctx: CanvasRenderingContext2D) {
  paintCircle(
    {
      x: MINIMAP_ZOOM * PIXEL_SIZE + MINIMAP_POSITION_X,
      y: MINIMAP_ZOOM * PIXEL_SIZE + MINIMAP_POSITION_Y,
    },
    PIXEL_SIZE / 2,
    RGB.magenta,
    ctx
  );
}

function drawMinimapRays(
  euclidianDistArray: Vec2[],
  ctx: CanvasRenderingContext2D
) {
  for (let i = 0; i < euclidianDistArray.length; i++) {
    const euclidianDistMinimap = resizeRayOutOfMinimap(euclidianDistArray[i]);

    const wallHitMinimap = {
      x: MINIMAP_ZOOM + euclidianDistMinimap.x,
      y: MINIMAP_ZOOM - euclidianDistMinimap.y, // NEGATIVE Y AXIS IN CANVAS
    };

    paintLine(
      {
        x: MINIMAP_ZOOM * PIXEL_SIZE + MINIMAP_POSITION_X,
        y: MINIMAP_ZOOM * PIXEL_SIZE + MINIMAP_POSITION_Y,
      },
      {
        x: wallHitMinimap.x * PIXEL_SIZE + MINIMAP_POSITION_X,
        y: wallHitMinimap.y * PIXEL_SIZE + MINIMAP_POSITION_Y,
      },
      RGB.white,
      ctx
    );
  }
}

function drawMinimapBorder(ctx: CanvasRenderingContext2D) {
  paintRect(
    {
      x: -0.5 * PIXEL_SIZE + MINIMAP_POSITION_X,
      y: -0.5 * PIXEL_SIZE + MINIMAP_POSITION_Y,
    },
    {
      w: (MINIMAP_ZOOM + 0.5) * 2 * PIXEL_SIZE,
      h: (MINIMAP_ZOOM + 0.5) * 2 * PIXEL_SIZE,
    },
    RGB.magenta,
    ctx
  );
}

function drawMinimapWalls(pos: Vec2, ctx: CanvasRenderingContext2D) {
  const offsetJ = pos.y - MINIMAP_ZOOM;
  const offsetI = pos.x - MINIMAP_ZOOM;
  const floorOffSetJ = Math.floor(offsetJ);
  const floorOffSetI = Math.floor(offsetI);

  for (let j = 0; j < MINIMAP_ZOOM * 2 + 1; j++) {
    for (let i = 0; i < MINIMAP_ZOOM * 2 + 1; i++) {
      const color = getPixelColor(j + floorOffSetJ, i + floorOffSetI);
      const pixelSize = getPixelSize(
        j,
        i,
        offsetJ - floorOffSetJ,
        offsetI - floorOffSetI
      );
      const pixelPos = getPixelPos(
        j,
        i,
        offsetJ - floorOffSetJ,
        offsetI - floorOffSetI
      );
      paintRect(pixelPos, pixelSize, color, ctx);
    }
  }
}

export function getPixelColor(jPos: number, iPos: number): string {
  if (jPos > MAP.length - 1 || jPos < 0) return RGB.black;
  if (iPos < 0 || iPos > MAP[0].length - 1) return RGB.black;
  return colors[MAP[jPos][iPos]];
}

export function getPixelPos(
  j: number,
  i: number,
  offsetJ: number,
  offsetI: number
): Vec2 {
  const pos = {
    x: (i - offsetI) * PIXEL_SIZE + MINIMAP_POSITION_X,
    y: (j - offsetJ) * PIXEL_SIZE + MINIMAP_POSITION_Y,
  };
  if (i == 0) pos.x = i * PIXEL_SIZE + MINIMAP_POSITION_X;
  if (j == 0) pos.y = j * PIXEL_SIZE + MINIMAP_POSITION_Y;
  return pos;
}

export function getPixelSize(
  j: number,
  i: number,
  offsetJ: number,
  offsetI: number
): { w: number; h: number } {
  const size = { w: PIXEL_SIZE, h: PIXEL_SIZE };
  if (i == 0) size.w = (1 - offsetI) * PIXEL_SIZE;
  if (j == 0) size.h = (1 - offsetJ) * PIXEL_SIZE;

  if (i == MINIMAP_ZOOM * 2) size.w = offsetI * PIXEL_SIZE;
  if (j == MINIMAP_ZOOM * 2) size.h = offsetJ * PIXEL_SIZE;
  return size;
}
