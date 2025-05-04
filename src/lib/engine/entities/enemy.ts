import { Settings } from "../configuration/settings";
import { Vec2, Vector } from "../utils/vector";

export type TextureType = "Square" | "Circle"
export type GenerateEnemyType = {
  position: {
    x: number;
    y: number;
  };
  texture: TextureType;
};

export class Enemy {
  private _settings: Settings;
  private _position: { x: number; y: number };
  public get position(): { x: number; y: number } {
    return this._position;
  }
  private _movementVector: { x: number; y: number };
  private _walkSpeed: number;
  public get walkSpeed(): number {
    return this._walkSpeed;
  }
  private _texture: TextureType;
  public get texture(): TextureType {
    return this._texture;
  }

  constructor(options: GenerateEnemyType, settings: Settings) {
    this._position = options.position;
    this._walkSpeed = 0.01;
    this._movementVector = { x: 0, y: 0 };
    this._settings = settings;
    this._texture = options.texture;
  }

  update(playerPosition: Vec2) {
    this.walk(playerPosition);
  }

  walk(playerPosition: Vec2) {
    const MAP = this._settings.map;
    const mov = {
      x: playerPosition.x - this._position.x,
      y: -(playerPosition.y - this._position.y)
    }
    this._movementVector = Vector.normalizeVector(mov)
    const movementMapX = Math.floor(this._position.x + this._movementVector.x * this._walkSpeed)
    const movementMapY = Math.floor(this.position.y - this._movementVector.y * this._walkSpeed)

    if(movementMapX >= 0 && movementMapX < MAP[0].length){
      if (MAP[Math.floor(this._position.y)][movementMapX] == 0){
        this._position.x += this._movementVector.x * this._walkSpeed;
      }
    }

    if(movementMapY >= 0 && movementMapY < MAP.length){
      if (MAP[movementMapY][Math.floor(this._position.x)] == 0){
        this._position.y -= this._movementVector.y * this._walkSpeed;
      }
    }
  }
}
