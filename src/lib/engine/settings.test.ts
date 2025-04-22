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
