import { describe, expect, it } from "vitest";
import { GenerateSettingsType, Settings } from "../settings";
import { Wall } from "./wall";

function generateSettings(): GenerateSettingsType {
  return {
    canvas: {
      size: {
        w: 200,
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

describe("Function calculteLineHeight", () => {
  it("should calculate correct line start and end when the wall is far as possible to be a visivel pixel", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const { lineStart, lineEnd } = wall.calculteLineHeight(
      settings.canvasHeight
    );
    expect(lineStart).toBe(settings.canvasHeight / 2 - 1);
    expect(lineEnd).toBe(settings.canvasHeight / 2);
  });

  it("should returns the entire line height when the wall distance is 1", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const { lineStart, lineEnd } = wall.calculteLineHeight(1);
    expect(lineStart).toBe(0);
    expect(lineEnd).toBe(settings.canvasHeight - 1);
  });

  it("should returns the entire line height when the wall distance less than 1", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const { lineStart, lineEnd } = wall.calculteLineHeight(0.5);
    expect(lineStart).toBe(0);
    expect(lineEnd).toBe(settings.canvasHeight - 1);
  });
});
