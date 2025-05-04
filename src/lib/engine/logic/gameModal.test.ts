import { Player } from "../entities/player";
import { GenerateSettingsType, Settings } from "../configuration/settings";
import { describe, expect, it } from "vitest";
import { Enemy } from "../entities/enemy";
import { GameModal } from "../logic/gameModal";

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


describe("Function createState", () => {
  it("should be 'lose' state when player and enemy are in the same cell", () => {
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

    const enemy = new Enemy({
        position: { x: POSITION.x, y: POSITION.y },
        texture: "Square"
      }, 
      settings
    );

    const gameModel = new GameModal(player, [enemy], []);

    const state = gameModel.createState()
    expect(state.game.state).toBe("lose")
  });

  it("should be 'win' state when player and goal are in the same cell", () => {
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

    const gameModel = new GameModal(player, [], [{ x: POSITION.x, y: POSITION.y }]);

    const state = gameModel.createState()
    expect(state.game.state).toBe("win")
  });

  it("should be 'running' state when player is not in the same cell of enemies or goal", () => {
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

    const gameModel = new GameModal(player, [], []);

    const state = gameModel.createState()
    expect(state.game.state).toBe("running")
  });

  it("should return the same player position and direction present in the player instance", () => {
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

    const gameModel = new GameModal(player, [], []);

    const state = gameModel.createState()
    expect(state.player.position).toEqual({ x: POSITION.x, y: POSITION.y })
    expect(state.player.direction).toEqual({ x: DIRECTION.x, y: DIRECTION.y })
  });

  it("should return the same enemy position present in the enemy instance", () => {
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

    const enemy = new Enemy({
        position: { x: POSITION.x, y: POSITION.y },
        texture: "Square"
      }, 
      settings
    );

    const gameModel = new GameModal(player, [enemy], []);

    const state = gameModel.createState()
    expect(state.enemies[0].position).toEqual({ x: POSITION.x, y: POSITION.y })
  });

  it("should return the same goal position passed as argument in the gameModal instance", () => {
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

    const gameModel = new GameModal(player, [], [{ x: POSITION.x, y: POSITION.y }]);

    const state = gameModel.createState()
    expect(state.goals[0]).toEqual({ x: POSITION.x, y: POSITION.y })
  });
});
