import { describe, expect, it } from "vitest";
import { GenerateSettingsType, Settings } from "../configuration/settings";
import { Floor } from "./floor";

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

describe("Function getCell", () => {
  it("should return the correct cell", () => {
    const floor = new Floor(new Settings(generateSettings()));
    const cell = floor.getCell({ x: 10.5, y: 12.5 });
    expect(cell).toEqual({ x: 10, y: 12 });
  });
});

describe("Function getSideRays", () => {
  it("should return the correct rays most left and right based in the player direction", () => {
    const settings = new Settings(generateSettings());
    const playerDirection = { x: 0, y: 1 };
    const floor = new Floor(settings);
    const { mostLeftRay, mostRightRay } = floor.getSideRays(playerDirection);
    expect(mostLeftRay).toEqual({ x: -1, y: 1 });
    expect(mostRightRay).toEqual({ x: 1, y: 1 });
  });
});

describe("Function getRowVector", () => {
  it("should return the correct start point to scanline in the maximum distance (camera space)", () => {
    const settings = new Settings(generateSettings());
    const floor = new Floor(settings);
    const maxDistance = settings.canvasHeight / 2; // y = vanishingPoint - 1
    const rowPositionStartPoint = floor.getRowVector({
      rowDistance: maxDistance,
      mostLeftRay: { x: -1, y: 1 },
    });
    expect(rowPositionStartPoint).toEqual({ x: -maxDistance, y: maxDistance });
  });

  it("should return the correct start point to scanline in the minimum distance (camera space)", () => {
    const settings = new Settings(generateSettings());
    const floor = new Floor(settings);
    const minDistance = 1; // y = 0
    const rowPositionStartPoint = floor.getRowVector({
      rowDistance: minDistance,
      mostLeftRay: { x: -1, y: 1 },
    });
    expect(rowPositionStartPoint).toEqual({ x: -1, y: 1 });
  });
});

describe("Function getRowPosition", () => {
  it("should return the correct start point to scanline in the maximum distance (world space)", () => {
    const settings = new Settings(generateSettings());
    const playerPosition = { x: 0, y: 0 }
    const floor = new Floor(settings);
    const maxDistance = settings.canvasHeight / 2; // y = vanishingPoint - 1
    const rowPositionStartPoint = floor.getRowPosition({
      playerPosition,
      rowVector: { x: -maxDistance, y: maxDistance },
    });
    expect(rowPositionStartPoint).toEqual({ x: -maxDistance, y: -maxDistance });
  });

  it("should return the correct start point to scanline in the minimum distance (world space)", () => {
    const settings = new Settings(generateSettings());
    const playerPosition = { x: 0, y: 0 }
    const floor = new Floor(settings);
    const minDistance = 1; // y = 0
    const rowPositionStartPoint = floor.getRowPosition({
      playerPosition,
      rowVector: { x: -minDistance, y: minDistance },
    });
    expect(rowPositionStartPoint).toEqual({ x: -minDistance, y: -minDistance });
  });
});

describe("Function getRowStep", () => {
  it("should return the correct step in the maximum distance ", () => {
    const settings = new Settings(generateSettings());
    const floor = new Floor(settings);
    const maxDistance = settings.canvasHeight / 2; // y = vanishingPoint - 1
    const rowStep = floor.getRowStep({
      rowDistance: maxDistance,
      mostLeftRay: { x: -1, y: 1 },
      mostRightRay: { x: 1, y: 1 },
    });

    expect(rowStep).toEqual({
      x: (2 * maxDistance) / settings.canvasWidth,
      y: 0,
    });
  });

  it("should return the correct step in the minimum distance ", () => {
    const settings = new Settings(generateSettings());
    const floor = new Floor(settings);
    const maxDistance = 1; // y = 0
    const rowStep = floor.getRowStep({
      rowDistance: maxDistance,
      mostLeftRay: { x: -1, y: 1 },
      mostRightRay: { x: 1, y: 1 },
    });

    expect(rowStep).toEqual({ x: 2 / settings.canvasWidth, y: 0 });
  });
});
