import { describe, expect, it } from "vitest";
import { Paint } from "../paint";
import { Vec2 } from "../vector";
import { GenerateSettingsType, Settings } from "../settings";
import { Renderer } from "./renderer";

function generateSettings(): GenerateSettingsType {
  return {
    canvas: {
      size: {
        w: 1,
        h: 1,
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

class TestPaint implements Paint {
  reset(): void {}
  paintRect(pos: Vec2, size: { w: number; h: number }, color: string): void {}
  paintLine(start: Vec2, end: Vec2, color: string): void {}
  paintCircle(center: Vec2, radius: number, color: string): void {}
  paintBuffer(buffer: number[]): void {}
}
describe("Function resetBuffer", () => {
  it("should paint the buffer with black", () => {
    const renderer = new Renderer(
      new Settings(generateSettings()),
      new TestPaint()
    );
    renderer.resetBuffer();
    expect(renderer.buffer).toEqual([0, 0, 0, 255]);
  });
});
