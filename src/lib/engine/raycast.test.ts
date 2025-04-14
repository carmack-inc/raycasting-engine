import { describe, expect, it, test } from "vitest";
import { RayCast } from "./raycast";
import { GenerateSettingsType, Settings } from "./settingsClass";
import { ColorOptions } from "./colors";

function generateSettings(map: ColorOptions[][]): GenerateSettingsType {
  return {
    canvas: {
      size: {
        w: 1,
        h: 1,
      },
    },
    map,
    minimap: {
      size: 0,
      position: {
        x: 0,
        y: 0,
      },
      zoom: 0,
    },
  };
}

describe("Function: findPerpendicularDistance", () => {
  test("if the perpDist is 0 and mapHit is the same as player when player is in a wall", async () => {
    const raycast = new RayCast(new Settings(generateSettings([])));
    const { perpDist, mapHit } = raycast.castRay({
      initialPos: { x: 0, y: 0 },
      rayDirection: { x: -1, y: 0 },
    });

    expect(perpDist).toBe(0);
    expect(mapHit).toEqual({ x: 0, y: 0 });
  });

  test("if function returns correct values when the ray hits the map boundary by the x axis", async () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));

    const res = raycast.castRay({
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
    const raycast = new RayCast(new Settings(generateSettings([[0]])));

    const res = raycast.castRay({
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
    const raycast = new RayCast(new Settings(generateSettings([[1, 0]])));

    const res = raycast.castRay({
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
    const raycast = new RayCast(new Settings(generateSettings([[0], [1]])));
    const res = raycast.castRay({
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
    const raycast = new RayCast(
      new Settings(
        generateSettings([
          [1, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
        ])
      )
    );

    const res = raycast.castRay({
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
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirRight = { x: 1, y: 0 };

    const sideDist = raycast.findSidesSize(rayDirRight, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
  });

  test("if left distance is correct in the x axis", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirLeft = { x: -1, y: 0 };

    const sideDist = raycast.findSidesSize(rayDirLeft, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
  });

  test("if up distance is correct in the y axis", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirUp = { x: 0, y: 1 };

    const sideDist = raycast.findSidesSize(rayDirUp, pos, mapPos);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if down distance is correct in the y axis", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDirDown = { x: 0, y: -1 };

    const sideDist = raycast.findSidesSize(rayDirDown, pos, mapPos);
    expect(sideDist.y).toBeCloseTo(0.8);
  });

  test("if distance is correct for positive axes", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: 1, y: 2 };

    const sideDist = raycast.findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if distance is correct for negative axes", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: -1, y: -2 };

    const sideDist = raycast.findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
    expect(sideDist.y).toBeCloseTo(0.8);
  });

  test("if distance is correct given a negative x axis and positive y axis ", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: -1, y: 2 };

    const sideDist = raycast.findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.2);
    expect(sideDist.y).toBeCloseTo(0.2);
  });

  test("if distance is correct given a positive x axis and negative y axis ", () => {
    const raycast = new RayCast(new Settings(generateSettings([[0]])));
    const mapPos = { x: 0, y: 0 };
    const pos = { x: mapPos.x + 0.2, y: mapPos.y + 0.2 };
    const rayDir = { x: 1, y: -2 };

    const sideDist = raycast.findSidesSize(rayDir, pos, mapPos);
    expect(sideDist.x).toBeCloseTo(0.8);
    expect(sideDist.y).toBeCloseTo(0.8);
  });
});

describe("Function: hitFunction", () => {
  it("returns true when cel is a wall", async () => {
    const raycast = new RayCast(
      new Settings(
        generateSettings([
          [1, 0],
          [0, 0],
        ])
      )
    );
    const res = raycast.hitFunction({ x: 0, y: 0 });
    expect(res).toBe(true);
  });

  it("returns false when cel is not a wall ", async () => {
    const raycast = new RayCast(
      new Settings(
        generateSettings([
          [1, 0],
          [0, 0],
        ])
      )
    );
    const res = raycast.hitFunction({ x: 1, y: 0 });
    expect(res).toBe(false);
  });

  it("returns true when one or both indexes are less than zero ", async () => {
    const raycast = new RayCast(
      new Settings(
        generateSettings([
          [1, 0],
          [0, 0],
        ])
      )
    );
    const res1 = raycast.hitFunction({ x: -1, y: 0 });
    const res2 = raycast.hitFunction({ x: 0, y: -1 });
    const res3 = raycast.hitFunction({ x: -1, y: -1 });
    expect(res1).toBe(true);
    expect(res2).toBe(true);
    expect(res3).toBe(true);
  });

  it("returns true when one or both indexes are beyond map boundary ", async () => {
    const raycast = new RayCast(
      new Settings(
        generateSettings([
          [1, 0],
          [0, 0],
        ])
      )
    );
    const res1 = raycast.hitFunction({ x: 9, y: 0 });
    const res2 = raycast.hitFunction({ x: 0, y: 9 });
    const res3 = raycast.hitFunction({ x: 9, y: 9 });
    expect(res1).toBe(true);
    expect(res2).toBe(true);
    expect(res3).toBe(true);
  });
});
