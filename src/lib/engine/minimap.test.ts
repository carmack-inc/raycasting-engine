import { describe, expect, test, vi } from "vitest";
import { getPixelColor, getPixelPos, getPixelSize } from "./minimap";
import { Vec2 } from "./vec2";

const {
  MAP,
  MINIMAP_POSITION_X,
  MINIMAP_POSITION_Y,
  MINIMAP_ZOOM,
  PIXEL_SIZE,
  RGB,
  colors,
} = await vi.hoisted(async () => {
  const {
    MAP,
    MINIMAP_POSITION_X,
    MINIMAP_POSITION_Y,
    MINIMAP_ZOOM,
    PIXEL_SIZE,
    RGB,
    colors,
  } = await import("./testSettings");
  return {
    MAP,
    colors,
    MINIMAP_POSITION_X,
    MINIMAP_POSITION_Y,
    MINIMAP_ZOOM,
    PIXEL_SIZE,
    RGB,
  };
});

vi.mock("./settings", () => {
  return {
    MAP,
    MINIMAP_POSITION_X,
    MINIMAP_POSITION_Y,
    MINIMAP_ZOOM,
    PIXEL_SIZE,
    RGB,
    colors,
  };
});

vi.mock("./main", () => {
  return {
    pos: {
      x: Math.random() * (MAP[0].length - 3) + 1,
      y: Math.random() * (MAP.length - 3) + 1,
    },
  };
});

vi.mock("./paint", () => {
  return {
    paintCircle: (
      pos: Vec2,
      size: { w: number; h: number },
      color: string,
      ctx: CanvasRenderingContext2D
    ) => {
      //TODO: Implement
    },
    paintLine: (
      start: Vec2,
      end: Vec2,
      color: string,
      ctx: CanvasRenderingContext2D
    ) => {
      //TODO: Implement
    },
    paintRect: (
      center: Vec2,
      radius: number,
      color: string,
      ctx: CanvasRenderingContext2D
    ) => {
      //TODO: Implement
    },
  };
});

describe("Function getPixelColor", () => {
  test("if getPixelColor returns black to pixels outside of the map's bounds", () => {
    const c1 = getPixelColor(MAP.length, MAP[0].length);
    const c2 = getPixelColor(0, MAP[0].length);
    const c3 = getPixelColor(MAP.length, 0);
    const c4 = getPixelColor(-1, -1);
    const c5 = getPixelColor(0, -1);
    const c6 = getPixelColor(-1, 0);
    expect(c1).toBe(RGB.black);
    expect(c2).toBe(RGB.black);
    expect(c3).toBe(RGB.black);
    expect(c4).toBe(RGB.black);
    expect(c5).toBe(RGB.black);
    expect(c6).toBe(RGB.black);
  });

  test("if getPixelColor returns correct color to pixels inside of the map's bounds", () => {
    const pixelPos = {
      x: Math.floor(Math.random() * (MAP[0].length - 1)),
      y: Math.floor(Math.random() * (MAP.length - 1)),
    };
    const color = getPixelColor(pixelPos.y, pixelPos.x);
    expect(color).toBe(colors[MAP[pixelPos.y][pixelPos.x]]);
  });
});

describe("Function getPixelPos", () => {
  test("if getPixelPos removes the offset for pixels in the maximum top (x = 0) or maximum left (y = 0)", () => {
    const offsetJ = Math.random();
    const offsetI = Math.random();
    const p1 = getPixelPos(0, 0, offsetJ, offsetI);
    const p2 = getPixelPos(1, 0, offsetJ, offsetI);
    const p3 = getPixelPos(0, 1, offsetJ, offsetI);

    expect(p1).toEqual({
      x: MINIMAP_POSITION_X,
      y: MINIMAP_POSITION_Y,
    });

    expect(p2).toEqual({
      x: MINIMAP_POSITION_X,
      y: (1 - offsetJ) * PIXEL_SIZE + MINIMAP_POSITION_Y,
    });

    expect(p3).toEqual({
      x: (1 - offsetI) * PIXEL_SIZE + MINIMAP_POSITION_X,
      y: MINIMAP_POSITION_Y,
    });
  });

  test("if getPixelPos returns the correct offset when pixel is not in the maximum top (x = 0) or left (y = 0)", () => {
    const offsetJ = Math.random();
    const offsetI = Math.random();
    const j = Math.random() * (MINIMAP_ZOOM * 2 + 1);
    const i = Math.random() * (MINIMAP_ZOOM * 2 + 1);
    const pos = getPixelPos(j, i, offsetJ, offsetI);
    expect(pos).toEqual({
      x: (i - offsetI) * PIXEL_SIZE + MINIMAP_POSITION_X,
      y: (j - offsetJ) * PIXEL_SIZE + MINIMAP_POSITION_Y,
    });
  });
});

describe("Function getPixelSize", () => {
  test("if getPixelSize return the correct size for pixels in the maximum top, left, right or bottom", () => {
    const offsetJ = Math.random();
    const offsetI = Math.random();
    const stl = getPixelSize(0, 0, offsetJ, offsetI);
    const st = getPixelSize(0, 1, offsetJ, offsetI);
    const sl = getPixelSize(1, 0, offsetJ, offsetI);
    const srb = getPixelSize(
      MINIMAP_ZOOM * 2,
      MINIMAP_ZOOM * 2,
      offsetJ,
      offsetI
    );
    const sr = getPixelSize(1, MINIMAP_ZOOM * 2, offsetJ, offsetI);
    const sb = getPixelSize(MINIMAP_ZOOM * 2, 1, offsetJ, offsetI);

    expect(stl).toEqual({
      w: (1 - offsetI) * PIXEL_SIZE,
      h: (1 - offsetJ) * PIXEL_SIZE,
    });

    expect(st).toEqual({
      w: PIXEL_SIZE,
      h: (1 - offsetJ) * PIXEL_SIZE,
    });

    expect(sl).toEqual({
      w: (1 - offsetI) * PIXEL_SIZE,
      h: PIXEL_SIZE,
    });

    expect(srb).toEqual({
      w: offsetI * PIXEL_SIZE,
      h: offsetJ * PIXEL_SIZE,
    });

    expect(sr).toEqual({
      w: offsetI * PIXEL_SIZE,
      h: PIXEL_SIZE,
    });

    expect(sb).toEqual({
      w: PIXEL_SIZE,
      h: offsetJ * PIXEL_SIZE,
    });
  });

  test("if getPixelPos returns the pixel size when pixel is not in the maximum top,left,right or bottom", () => {
    const j = Math.floor(Math.random() * (MINIMAP_ZOOM * 2 - 2) + 1);
    const i = Math.floor(Math.random() * (MINIMAP_ZOOM * 2 - 2) + 1);
    const offsetJ = Math.random();
    const offsetI = Math.random();

    const s = getPixelSize(j, i, offsetJ, offsetI);

    expect(s).toEqual({
      w: PIXEL_SIZE,
      h: PIXEL_SIZE,
    });
  });
});
