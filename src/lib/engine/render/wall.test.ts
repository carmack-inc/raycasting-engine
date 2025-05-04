import { describe, expect, it } from "vitest";
import { GenerateSettingsType, Settings } from "../configuration/settings";
import { Wall } from "./wall";
import { RayInfo } from "../raycast";

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

describe("Function calculateLineHeight", () => {
  it("should calculate correct line start, end and height when the wall is far as possible to be a visivel pixel", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const {lineHeight, lineStart, lineEnd } = wall.calculateLineHeight(
      settings.canvasHeight
    );
    expect(lineHeight).toBe(1)
    expect(lineStart).toBe(settings.canvasHeight / 2 - 1);
    expect(lineEnd).toBe(settings.canvasHeight / 2);
  });

  it("should return the entire line height when the wall distance is 1", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const {lineHeight, lineStart, lineEnd } = wall.calculateLineHeight(1);
    expect(lineHeight).toBe(settings.canvasHeight)
    expect(lineStart).toBe(0);
    expect(lineEnd).toBe(settings.canvasHeight - 1);
  });

  it("should return the entire line height when the wall distance less than 1", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const {lineHeight, lineStart, lineEnd } = wall.calculateLineHeight(0.5);
    expect(lineHeight).toBe(settings.canvasHeight * 2)
    expect(lineStart).toBe(0);
    expect(lineEnd).toBe(settings.canvasHeight - 1);
  });
});

describe("Function getParallelWallDist", () => {
  it("should return the correct parallel wall distance when ray hits the cell by x axis ", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo ={
      perpDist: 1,
      mapHit: {
        x: 1,
        y: 1
      },
      rayDirection: {
        x: 1,
        y: 0
      },
      side: "x"
    }
    const playerPos = {x: 1, y: 1}
    const parallelDist = wall.getParallelWallDist(ray, playerPos)
    expect(parallelDist).toBeCloseTo(-1)
  })

  it("should return the correct parallel wall distance when ray hits the cell by y axis ", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo ={
      perpDist: 1,
      mapHit: {
        x: 1,
        y: 1
      },
      rayDirection: {
        x: 1,
        y: 0
      },
      side: "y"
    }
    const playerPos = {x: 1, y: 1}
    const parallelDist = wall.getParallelWallDist(ray, playerPos)
    expect(parallelDist).toBeCloseTo(2)
  })
})

describe("Function getTextureStepY", () => {
  it("should return the step when line height is greater than 1 ", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const textureHeight = 64
    const step = wall.getTextureStepY(2, textureHeight)
    expect(step).toBeCloseTo(32);
  })

  it("should return the step when line height is less than 1 ", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const textureHeight = 64
    const step = wall.getTextureStepY(0.5, textureHeight)
    expect(step).toBeCloseTo(128);
  })
})

describe("Function getTexturePositionY", () => {
  it("should return 0 when line height is smaller than canvas height and line start is greater than 0)", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const textureStep = 64 / settings.canvasHeight - 2;
    const tPosY = wall.getTexturePositionY(settings.canvasHeight - 2, 1, textureStep)
    expect(tPosY).toBeCloseTo(0);
  })

  it("should return the correct position when line height is greater than canvas height and line start in 0 ", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const textureHeight = 128;
    const textureStep = textureHeight / (settings.canvasHeight * 2);
    const tPosY = wall.getTexturePositionY(settings.canvasHeight * 2, 0, textureStep);
    expect(tPosY).toBeCloseTo(textureHeight / 4);
  })
})

describe("Function drawOutOfMapColumn", () => {
  it("should fill buffer with black color", () => {
    const settings = new Settings(generateSettings({w: 5, h: 5}));
    const wall = new Wall(settings);

    const buffer = [];
    for (let i = 0; i < 5 * 5; i++) {
      const index = i * 4;
      buffer[index] = 255;
      buffer[index + 1] = 255;
      buffer[index + 2] = 255;
      buffer[index + 3] = 255;
    }
    wall.drawOutOfMapColumn(0, 1, 2, buffer);

    const index = (1 * 5) * 4
    expect(buffer[index]).toBe(0)
    expect(buffer[index + 1]).toBe(0)
    expect(buffer[index + 2]).toBe(0)
    expect(buffer[index + 3]).toBe(255)

    const index2 = (2 * 5) * 4
    expect(buffer[index2]).toBe(0)
    expect(buffer[index2 + 1]).toBe(0)
    expect(buffer[index2 + 2]).toBe(0)
    expect(buffer[index2 + 3]).toBe(255)
  })
})

describe("Function getTextureCoordenateX", () => {
  it("should return the inverse coordenate when hit side is y and ray direction is positive", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo = {
      perpDist: 0.5,
      mapHit: {
        x: 1,
        y: 0
      },
      rayDirection: {
        x: 0,
        y: 1
      },
      side: "y"
    }

    const textureWidth = 64
    const playerPosition = {x: 1.5, y: 1.5};
    const tx = wall.getTextureCoordenateX(ray, playerPosition, textureWidth)
    expect(tx).toBeCloseTo( textureWidth - (0.5 * textureWidth) - 1)
  })

  it("should return the correct coordenate when hit side is y and ray direction is negative", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo = {
      perpDist: 0.5,
      mapHit: {
        x: 1,
        y: 2
      },
      rayDirection: {
        x: 0,
        y: -1
      },
      side: "y"
    }

    const textureWidth = 64
    const playerPosition = {x: 1.5, y: 1.5};
    const tx = wall.getTextureCoordenateX(ray, playerPosition, textureWidth)
    expect(tx).toBeCloseTo( 0.5 * textureWidth)
  })

  it("should return the inverse coordenate when hit side is x and ray direction is negative", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo = {
      perpDist: 0.5,
      mapHit: {
        x: 0,
        y: 1
      },
      rayDirection: {
        x: -1,
        y: 0
      },
      side: "x"
    }

    const textureWidth = 64
    const playerPosition = {x: 1.5, y: 1.5};
    const tx = wall.getTextureCoordenateX(ray, playerPosition, textureWidth)
    expect(tx).toBeCloseTo( textureWidth - (0.5 * textureWidth) - 1)
  })

  it("should return the correct coordenate when hit side is x and ray direction is positive", () => {
    const settings = new Settings(generateSettings());
    const wall = new Wall(settings);

    const ray: RayInfo = {
      perpDist: 0.5,
      mapHit: {
        x: 2,
        y: 1
      },
      rayDirection: {
        x: 1,
        y: 0
      },
      side: "x"
    }

    const textureWidth = 64
    const playerPosition = {x: 1.5, y: 1.5};
    const tx = wall.getTextureCoordenateX(ray, playerPosition, textureWidth)
    expect(tx).toBeCloseTo(0.5 * textureWidth)
  })

})

