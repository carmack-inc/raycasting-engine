import { describe, expect, it } from "vitest";
import { Player } from "./player";
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
    const settings = new Settings(generateSettings());
    const WALK_SPEED = 0.05;
    const ROTATE_SPEED = 3;
    const POSITION = { x: 3, y: 9 };
    const DIRECTION = { x: 1, y: 0 };

    const player = new Player(
      {
        position: { x: POSITION.x, y: POSITION.y },
        direction: { x: DIRECTION.x, y: DIRECTION.y },
        rotateSpeed: ROTATE_SPEED,
        walkSpeed: WALK_SPEED,
      },
      settings
    );

    expect(player.position).toEqual(POSITION);
    expect(player.direction).toEqual(DIRECTION);
    expect(player.rotateSpeed).toEqual(ROTATE_SPEED);
    expect(player.walkSpeed).toEqual(WALK_SPEED);
  });
});

describe("Function walk", () => {
  it("walk", () => {
    // TO DO
  });
});

describe("Function rotate", () => {
  it("rotate", () => {
    // TO DO
  });
});
