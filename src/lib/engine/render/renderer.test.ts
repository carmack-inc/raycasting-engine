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
    map: [[0]],
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
  paintRect(pos: Vec2, size: { w: number; h: number }, color: string): void {}
  paintLine(start: Vec2, end: Vec2, color: string): void {}
  paintCircle(center: Vec2, radius: number, color: string): void {}
  paintBuffer(buffer: number[]): void {}
}

describe("Function resetBuffer", () => {
  it("should paint the buffer with black", () => {
    const settings = new Settings(generateSettings());
    const renderer = new Renderer(
      settings,
      new TestPaint()
    );
    const buffer: number[] = [];
    renderer.resetBuffer(settings.canvasWidth, settings.canvasHeight, buffer);
    expect(buffer).toEqual([0, 0, 0, 255]);
  });
});

describe("Function loseBuffer", () => {
  it("should paint the buffer with medium gray scale", () => {
    const settings = new Settings(generateSettings());
    const renderer = new Renderer(
      settings,
      new TestPaint()
    );
    const buffer: number[] = [200, 100, 0, 255];
    renderer.loseBuffer(settings.canvasWidth, settings.canvasHeight, buffer);
    expect(buffer).toEqual([100, 100, 100, 255]);
  });
});

describe("Function winBuffer", () => {
  it("should paint the buffer with gold scale", () => {
    const settings = new Settings(generateSettings());
    const renderer = new Renderer(
      settings,
      new TestPaint()
    );
    const buffer: number[] = [100, 100, 100, 255];
    renderer.winBuffer(settings.canvasWidth, settings.canvasHeight, buffer);
    expect(buffer).toEqual([100, 100, 0, 255]);
  });
});
