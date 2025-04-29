import { Entity } from "./entity";
import { GenerateSettingsType, Settings } from "../settings";
import { describe, expect, it } from "vitest";

function generateSettings(canvasSize?: {w: number, h: number}): GenerateSettingsType {
  return {
    canvas: {
      size: canvasSize ? canvasSize :
        {
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

describe("Function isInCircle", () => {
  it("should return false when distance of pixel and sprite center is greater than radius", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const center = {x: 32, y: 32};
    const radius = 32;
    const c = entity.isInCircle(0, 0, center.x, center.y, radius)
    expect(c).toBe(false)
  });

  it("should return true when distance of pixel and sprite center is less or equal than radius", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const center = {x: 32, y: 32};
    const radius = 32;
    const c = entity.isInCircle(32, 0, center.x, center.y, radius)
    expect(c).toBe(true)
  });
});

describe("Function worldToCameraTransform", () => {
  it("should transform correctly the world space entity position to camera space position in x axis (enetity in front of player)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const spritePosition = {x: 10 , y: 9};
    const playerPosition = {x: 3 , y: 9};
    const playerDirection = { x: 1, y: 0 };
    const cameraEntityPos = entity.worldToCameraTransform(spritePosition, playerPosition, playerDirection)
    expect(cameraEntityPos.x).toBeCloseTo(0);
    expect(cameraEntityPos.y).toBeCloseTo(7);
  });

  it("should transform correctly the world space entity position to camera space position in x axis (enetity behind the player)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const spritePosition = {x: 1 , y: 9};
    const playerPosition = {x: 3 , y: 9};
    const playerDirection = { x: 1, y: 0 };
    const cameraEntityPos = entity.worldToCameraTransform(spritePosition, playerPosition, playerDirection)
    expect(cameraEntityPos.x).toBeCloseTo(0);
    expect(cameraEntityPos.y).toBeCloseTo(-2);
  });

  it("should transform correctly the world space entity position to camera space position in y axis (entity in front of player)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const spritePosition = {x: 3 , y: 2};
    const playerPosition = {x: 3 , y: 9};
    const playerDirection = { x: 0, y: 1 };
    const cameraEntityPos = entity.worldToCameraTransform(spritePosition, playerPosition, playerDirection)
    expect(cameraEntityPos.x).toBeCloseTo(0);
    expect(cameraEntityPos.y).toBeCloseTo(7);
  });

  it("should transform correctly the world space entity position to camera space position in y axis (entity behind of player)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const spritePosition = {x: 3 , y: 12};
    const playerPosition = {x: 3 , y: 9};
    const playerDirection = { x: 0, y: 1 };
    const cameraEntityPos = entity.worldToCameraTransform(spritePosition, playerPosition, playerDirection)
    expect(cameraEntityPos.x).toBeCloseTo(0);
    expect(cameraEntityPos.y).toBeCloseTo(-3);
  });
});


describe("Function calculateHeight", () => {
  it("should calculate the start and end of entity height when its is far as possible to be a visivel pixel", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateHeight(
      {x: 0, y: settings.canvasHeight}
    );
    expect(start).toBe(settings.canvasHeight / 2 - 1);
    expect(end).toBe(settings.canvasHeight / 2);
  });

  it("should calculate the start and end of entity height when its distance is 1 in y axis (camera space)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateHeight(
      {x: 0, y: 1}
    );
    expect(start).toBe(0);
    expect(end).toBe(settings.canvasHeight - 1);
  });

  it("hould calculate the start and end of entity height when its distance less than 1", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateHeight(
      {x: 0, y: 0.5}
    );
    expect(start).toBe(0);
    expect(end).toBe(settings.canvasHeight - 1);
  });
});

describe("Function calculateWidth", () => {
  it("should calculate the start and end of entity width when its is far as possible to be a visivel pixel", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateWidth(
      {x: 0, y: settings.canvasHeight},
      settings.canvasWidth / 2
    );
    expect(start).toBe(settings.canvasWidth / 2 - 1);
    expect(end).toBe(settings.canvasWidth / 2);
  });

  it("should calculate the start and end of entity width when its distance is 1 in y axis (camera space)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateWidth(
      {x: 0, y: 1},
      settings.canvasWidth / 2
    );

    expect(start).toBe(settings.canvasWidth / 2 - settings.canvasHeight /2);
    expect(end).toBe(settings.canvasWidth / 2 + settings.canvasHeight / 2);
  });

  it("should calculate the start and end of entity width when its distance less than 1", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);

    const {start, end} =  entity.calculateWidth(
      {x: 0, y: 0.5},
      settings.canvasWidth / 2
    );
    expect(start).toBe(0);
    expect(end).toBe(settings.canvasWidth - 1);
  });
});

describe("Function calculateCenterOfSprite", () => {
  it("should return center of canvas width when sprite position in x axis is zero (camera space)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const positionInCamera = {x: 0, y: 1}
    const spriteCenter = entity.calculateCenterOfSprite(positionInCamera);
    expect(spriteCenter).toBe(settings.canvasWidth / 2)
  })

  it("should return canvas width when sprite position has both axes are equals (45 degree)(camera space)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const positionInCamera = {x: 1, y: 1}
    const spriteCenter = entity.calculateCenterOfSprite(positionInCamera);
    expect(spriteCenter).toBe(settings.canvasWidth)
  })

  it("should return zero when sprite position has both axes are equals, but with flopped sign (-45 degree)(camera space)", () => {
    const settings = new Settings(generateSettings());
    const entity = new Entity(settings);
    const positionInCamera = {x: -1, y: 1}
    const spriteCenter = entity.calculateCenterOfSprite(positionInCamera);
    expect(spriteCenter).toBe(0)
  })
});
