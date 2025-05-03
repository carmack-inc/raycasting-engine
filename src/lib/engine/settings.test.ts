import { describe, expect, it } from "vitest";
import { GenerateSettingsType, Settings } from "./settings";

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

describe("Constructor", () => {
  it("should create a player with correct attributes", () => {
    const settingsConfig = generateSettings();
    const settings = new Settings(settingsConfig);

    expect(settings.canvasHeight).toBe(settingsConfig.canvas.size.h);
    expect(settings.canvasWidth).toBe(settingsConfig.canvas.size.w);
    expect(settings.map).toBe(settingsConfig.map);
    expect(settings.minimapPosition).toBe(settingsConfig.minimap.position);
    expect(settings.minimapSize).toBe(settingsConfig.minimap.size);
    expect(settings.minimapZoom).toBe(settingsConfig.minimap.zoom);
    expect(settings.pixelSize).toBe(
      settingsConfig.minimap.size / (settingsConfig.minimap.zoom * 2)
    );
  });
});

describe("Function isCellOutOfBounds", () => {
  it("should return true when cell is outside the map's bounds", () => {
    const settings = new Settings(generateSettings());
    const o1 = settings.isCellOutOfBounds({ x: 3, y: 3 });
    const o2 = settings.isCellOutOfBounds({ x: 3, y: 1 });
    const o3 = settings.isCellOutOfBounds({ x: 1, y: 3 });
    const o4 = settings.isCellOutOfBounds({ x: -1, y: 3 });
    const o5 = settings.isCellOutOfBounds({ x: 3, y: -1 });
    const o6 = settings.isCellOutOfBounds({ x: -1, y: -1 });
    expect(o1).toBe(true);
    expect(o2).toBe(true);
    expect(o3).toBe(true);
    expect(o4).toBe(true);
    expect(o5).toBe(true);
    expect(o6).toBe(true);
  });

  it("should return false when cell is inside the map's bounds", () => {
    const settings = new Settings(generateSettings());
    const i1 = settings.isCellOutOfBounds({ x: 0, y: 0 });
    const i2 = settings.isCellOutOfBounds({ x: 2, y: 1 });
    expect(i1).toBe(false);
    expect(i2).toBe(false);
  });
});
