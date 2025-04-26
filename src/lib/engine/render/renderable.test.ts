import { describe, expect, it } from "vitest";
import { RayInfo } from "../raycast";
import { GenerateSettingsType, Settings } from "../settings";
import { Renderable } from "./renderable";
import { GameState } from "../gameModal";

function generateSettings(): GenerateSettingsType {
  return {
    canvas: {
      size: {
        w: 100,
        h: 100,
      },
    },
    map: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    minimap: {
      size: 200,
      position: {
        x: 0,
        y: 0,
      },
      zoom: 5,
    },
  };
}

class TestRender extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }
  render(gameState: GameState, rays: RayInfo[], buffer: number[]): void {}
}
describe("Function isCellOutOfBounds", () => {
  it("should return true when cell is outside the map's bounds", () => {
    const test = new TestRender(new Settings(generateSettings()));
    const o1 = test.isCellOutOfBounds({ x: 3, y: 3 });
    const o2 = test.isCellOutOfBounds({ x: 3, y: 1 });
    const o3 = test.isCellOutOfBounds({ x: 1, y: 3 });
    const o4 = test.isCellOutOfBounds({ x: -1, y: 3 });
    const o5 = test.isCellOutOfBounds({ x: 3, y: -1 });
    const o6 = test.isCellOutOfBounds({ x: -1, y: -1 });
    expect(o1).toBe(true);
    expect(o2).toBe(true);
    expect(o3).toBe(true);
    expect(o4).toBe(true);
    expect(o5).toBe(true);
    expect(o6).toBe(true);
  });

  it("should return false when cell is inside the map's bounds", () => {
    const test = new TestRender(new Settings(generateSettings()));
    const i1 = test.isCellOutOfBounds({ x: 0, y: 0 });
    const i2 = test.isCellOutOfBounds({ x: 2, y: 1 });
    expect(i1).toBe(false);
    expect(i2).toBe(false);
  });
});

describe("Function setPixelBuffer", () => {
  it("should modify pixel in buffer correctly", () => {
    const buffer: number[] = [0, 0, 0, 255];
    const test = new TestRender(new Settings(generateSettings()));
    test.setPixelBuffer(
      buffer,
      { x: 0, y: 0 },
      { r: 255, g: 255, b: 255, a: 255 }
    );
    expect(buffer).toEqual([255, 255, 255, 255]);
  });

  it("should ignore pixel modification when the position is out of range", () => {
    const buffer: number[] = [0, 0, 0, 255];
    const test = new TestRender(new Settings(generateSettings()));
    test.setPixelBuffer(
      buffer,
      { x: 10, y: 10 },
      { r: 255, g: 255, b: 255, a: 255 }
    );
    expect(buffer).toEqual([0, 0, 0, 255]);
  });
});
