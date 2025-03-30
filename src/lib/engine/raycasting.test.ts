import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi
} from "vitest"
import { findSidesSize } from "./raycasting"
import { Vec2 } from "./vec2"

describe("Function: findPerpendicularDistance", () => {
  beforeEach(() => {
    vi.doUnmock("./settings");
    vi.resetModules();
  });

  test("if the perpDist is 0 and mapHit is the same as player when player is in a wall", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [[1]],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const { perpDist, mapHit } = mockedFindPerpendicularDistance({
      initialPos: { x: 0, y: 0 },
      rayDirection: { x: -1, y: 0 },
    });

    expect(perpDist).toBe(0);
    expect(mapHit).toEqual({ x: 0, y: 0 });
  });

  test("if function returns correct values when the ray hits the map boundary by the x axis", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [[0]],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const res = mockedFindPerpendicularDistance({
      initialPos: { x: 0.5, y: 0.5 },
      rayDirection: { x: -1, y: 0 },
    });

    expect(res).toEqual({
      perpDist: 0.5,
      mapHit: {
        x: -1,
        y: 0,
      },
      side: "x",
    });
  });

  test("if function returns correct values when the ray hits the map boundary by the y axis", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [[0]],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const res = mockedFindPerpendicularDistance({
      initialPos: { x: 0.5, y: 0.5 },
      rayDirection: { x: 0, y: -1 },
    });

    expect(res).toEqual({
      perpDist: 0.5,
      mapHit: {
        x: 0,
        y: 1,
      },
      side: "y",
    });
  });

  test("if function returns correct values when the ray hits a wall by the x axis", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [[1, 0]],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const res = mockedFindPerpendicularDistance({
      initialPos: { x: 1.5, y: 0.5 },
      rayDirection: { x: -1, y: 0 },
    });

    expect(res).toEqual({
      perpDist: 0.5,
      mapHit: {
        x: 0,
        y: 0,
      },
      side: "x",
    });
  });

  test("if function returns correct values when the ray hits a wall by y the axis", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [[0], [1]],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const res = mockedFindPerpendicularDistance({
      initialPos: { x: 0.5, y: 0.5 },
      rayDirection: { x: 0, y: -1 },
    });

    expect(res).toEqual({
      perpDist: 0.5,
      mapHit: {
        x: 0,
        y: 1,
      },
      side: "y",
    });
  });

  test("if function returns correct values when ray is not orthogonal to standard euclidian basis", async () => {
    vi.doMock("./settings", () => {
      return {
        MAP: [
          [1, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
        ],
      };
    });
    const { findPerpendicularDistance: mockedFindPerpendicularDistance } =
      await import("./raycasting");

    const res = mockedFindPerpendicularDistance({
      initialPos: { x: 1.5, y: 1.5 },
      rayDirection: { x: 1, y: 1 },
    });

    expect(res).toEqual({
      perpDist: 0.5,
      mapHit: {
        x: 1,
        y: 0,
      },
      side: "y",
    });
  });
});

describe("Function: findSidesSize", () => {
  test("if right distance is correct in the x axis", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirRight = { x: 1, y: 0 };

    const sideDist = findSidesSize(rayDirRight, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
  });

  test("if left distance is correct in the x axis", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirLeft = { x: -1, y: 0 };

    const sideDist = findSidesSize(rayDirLeft, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
  });

  test("if up distance is correct in the y axis", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirUp = { x: 0, y: 1 };

    const sideDist = findSidesSize(rayDirUp, pos, mapPos);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if down distance is correct in the y axis", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirDown = { x: 0, y: -1 };

    const sideDist = findSidesSize(rayDirDown, pos, mapPos);
    expect(sideDist.y).toBeCloseTo(0.8);
  });

  test("if distance is correct for positive axes", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: 1, y: 2 };

    const sideDist = findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if distance is correct for negative axes", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: -1, y: -2 };

    const sideDist = findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
    expect(sideDist.y).toBeCloseTo(0.8);
  });

  test("if distance is correct given a negative x axis and positive y axis ", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: -1, y: 2 };

    const sideDist = findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if distance is correct given a positive x axis and negative y axis ", () => {
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: 1, y: -2 };

    const sideDist = findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
    expect(sideDist.y).toBeCloseTo(0.8);
  });
});

describe("Function: hitFunction", () => {
  let mockedHitFunction: (mapPos: Vec2) => boolean;
  beforeAll(async () => {
    vi.doUnmock("./settings");
    vi.resetModules();

    vi.doMock("./settings", () => {
      return {
        MAP: [
          [1, 0],
          [0, 0],
        ],
      };
    });
    const { hitFunction: newHitFunction } = await import("./raycasting");
    mockedHitFunction = newHitFunction;
  });

  it("returns true when cel is a wall", async () => {
    const res = mockedHitFunction({ x: 0, y: 0 });
    expect(res).toBe(true);
  });

  it("returns false when cel is not a wall ", async () => {
    const res = mockedHitFunction({ x: 1, y: 0 });
    expect(res).toBe(false);
  });

  it("returns true when one or both indexes are less than zero ", async () => {
    const res1 = mockedHitFunction({ x: -1, y: 0 });
    const res2 = mockedHitFunction({ x: 0, y: -1 });
    const res3 = mockedHitFunction({ x: -1, y: -1 });
    expect(res1).toBe(true);
    expect(res2).toBe(true);
    expect(res3).toBe(true);
  });

  it("returns true when one or both indexes are beyond map boundary ", async () => {
    const res1 = mockedHitFunction({ x: 9, y: 0 });
    const res2 = mockedHitFunction({ x: 0, y: 9 });
    const res3 = mockedHitFunction({ x: 9, y: 9 });
    expect(res1).toBe(true);
    expect(res2).toBe(true);
    expect(res3).toBe(true);
  });
});
