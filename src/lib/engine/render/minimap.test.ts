import { describe, expect, it } from "vitest";
import { GenerateSettingsType, Settings } from "../settings";
import { Vec2 } from "../vector";
import { colorsVector, RGBVector } from "../colors";
import { Minimap } from "./minimap";
import { Paint } from "../paint";

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

describe("Function getPixelColor", () => {
  it("should return black when pixel is outside of the map's bounds", () => {
    const minimap = new Minimap(
      new Settings(generateSettings()),
      new TestPaint()
    );
    const c1 = minimap.getPixelColor(3, 3);
    const c2 = minimap.getPixelColor(0, 3);
    const c3 = minimap.getPixelColor(3, 0);
    const c4 = minimap.getPixelColor(-1, -1);
    const c5 = minimap.getPixelColor(0, -1);
    const c6 = minimap.getPixelColor(-1, 0);
    expect(c1).toEqual(RGBVector.black);
    expect(c2).toEqual(RGBVector.black);
    expect(c3).toEqual(RGBVector.black);
    expect(c4).toEqual(RGBVector.black);
    expect(c5).toEqual(RGBVector.black);
    expect(c6).toEqual(RGBVector.black);
  });

  it("should return correct color when pixel inside of the map's bounds", () => {
    const minimap = new Minimap(
      new Settings(generateSettings()),
      new TestPaint()
    );
    const pixelPos = {
      x: 0,
      y: 0,
    };
    const color = minimap.getPixelColor(pixelPos.y, pixelPos.x);
    expect(color).toEqual(colorsVector[1]);
  });
});

describe("Function getPixelPos", () => {
  it("should remove the offset from pixels in the maximum top (x = 0) or maximum left (y = 0)", () => {
    const settings = new Settings(generateSettings());
    const minimap = new Minimap(settings, new TestPaint());
    const offsetJ = 0.5;
    const offsetI = 0.2;
    const p1 = minimap.getPixelPos(0, 0, offsetJ, offsetI);
    const p2 = minimap.getPixelPos(1, 0, offsetJ, offsetI);
    const p3 = minimap.getPixelPos(0, 1, offsetJ, offsetI);

    expect(p1).toEqual({
      x: 0,
      y: 0,
    });

    expect(p1.x).toBeCloseTo(0);
    expect(p1.y).toBeCloseTo(0);

    expect(p2.x).toBeCloseTo(0);
    expect(p2.y).toBeCloseTo(
      0.5 * settings.pixelSize + settings.minimapPosition.y
    );

    expect(p2).toEqual({
      x: 0,
      y: 0.5 * settings.pixelSize + settings.minimapPosition.y,
    });

    expect(p3.x).toBeCloseTo(
      0.8 * settings.pixelSize + settings.minimapPosition.x
    );
    expect(p3.y).toBeCloseTo(settings.minimapPosition.y);
  });

  it("should apply offset to pixels that is not in the maximum top (x = 0) or left (y = 0)", () => {
    const settings = new Settings(generateSettings());
    const minimap = new Minimap(settings, new TestPaint());
    const offsetJ = 0.9;
    const offsetI = 0.3;
    const pos = minimap.getPixelPos(1, 1, offsetJ, offsetI);
    expect(pos.x).toBeCloseTo(
      0.7 * settings.pixelSize + settings.minimapPosition.x
    );
    expect(pos.y).toBeCloseTo(
      0.1 * settings.pixelSize + settings.minimapPosition.y
    );
  });
});

describe("Function getPixelSize", () => {
  it("should cut part of the pixel off when it is in maximum top, left, right or bottom", () => {
    const settings = new Settings(generateSettings());
    const minimap = new Minimap(settings, new TestPaint());
    const offsetJ = 0.2;
    const offsetI = 0.6;
    const stl = minimap.getPixelSize(0, 0, offsetJ, offsetI);
    const st = minimap.getPixelSize(0, 1, offsetJ, offsetI);
    const sl = minimap.getPixelSize(1, 0, offsetJ, offsetI);
    const srb = minimap.getPixelSize(
      settings.minimapZoom * 2,
      settings.minimapZoom * 2,
      offsetJ,
      offsetI
    );
    const sr = minimap.getPixelSize(
      1,
      settings.minimapZoom * 2,
      offsetJ,
      offsetI
    );
    const sb = minimap.getPixelSize(
      settings.minimapZoom * 2,
      1,
      offsetJ,
      offsetI
    );

    expect(stl).toEqual({
      w: (1 - offsetI) * settings.pixelSize,
      h: (1 - offsetJ) * settings.pixelSize,
    });

    expect(st).toEqual({
      w: settings.pixelSize,
      h: (1 - offsetJ) * settings.pixelSize,
    });

    expect(sl).toEqual({
      w: (1 - offsetI) * settings.pixelSize,
      h: settings.pixelSize,
    });

    expect(srb).toEqual({
      w: offsetI * settings.pixelSize,
      h: offsetJ * settings.pixelSize,
    });

    expect(sr).toEqual({
      w: offsetI * settings.pixelSize,
      h: settings.pixelSize,
    });

    expect(sb).toEqual({
      w: settings.pixelSize,
      h: offsetJ * settings.pixelSize,
    });
  });

  it(" should return the correct pixel size when it is not in the maximum top,left,right or bottom", () => {
    const settings = new Settings(generateSettings());
    const minimap = new Minimap(settings, new TestPaint());
    const s = minimap.getPixelSize(1, 1, 0.8, 0.4);

    expect(s).toEqual({
      w: settings.pixelSize,
      h: settings.pixelSize,
    });
  });
});
