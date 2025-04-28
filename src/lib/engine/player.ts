import { ActionsFlags } from "./inputManager";
import { Settings } from "./settings";
import { Vector } from "./vector";

export type GeneratePlayerType = {
  position: {
    x: number;
    y: number;
  };
  direction: {
    x: number;
    y: number;
  };
  walkSpeed: number;
  rotateSpeed: number;
};

export class Player {
  private _settings: Settings;
  private _position: { x: number; y: number };
  public get position(): { x: number; y: number } {
    return this._position;
  }
  private _direction: { x: number; y: number };
  public get direction(): { x: number; y: number } {
    return this._direction;
  }
  private _movementVector: { x: number; y: number };
  private _walkSpeed: number;
  public get walkSpeed(): number {
    return this._walkSpeed;
  }
  private _rotateSpeed: number;
  public get rotateSpeed(): number {
    return this._rotateSpeed;
  }

  private actions: Record<ActionsFlags, () => void>;

  constructor(options: GeneratePlayerType, settings: Settings) {
    this._position = options.position;
    this._direction = options.direction;
    this._walkSpeed = options.walkSpeed;
    this._rotateSpeed = options.rotateSpeed;
    this._movementVector = { x: 0, y: 0 };
    this.actions = this.createActions();
    this._settings = settings;
  }

  createActions(): Record<ActionsFlags, () => void> {
    return {
      UP_KEY: () => {
        this._movementVector.x += this._direction.x;
        this._movementVector.y += this._direction.y;
      },
      DOWN_KEY: () => {
        this._movementVector.x -= this._direction.x;
        this._movementVector.y -= this._direction.y;
      },
      LEFT_KEY: () => {
        const towardVec = Vector.findPerpVector(this._direction);
        this._movementVector.x += towardVec.x;
        this._movementVector.y += towardVec.y;
      },
      RIGHT_KEY: () => {
        const towardVec = Vector.findPerpVector(this._direction);
        this._movementVector.x -= towardVec.x;
        this._movementVector.y -= towardVec.y;
      },
    };
  }

  update(keyboardSet: Set<ActionsFlags>, mouseOffsetX: number) {
    this.walk(keyboardSet);
    this.rotate(mouseOffsetX);
  }

  walk(keyboardSet: Set<ActionsFlags>) {
    const MAP = this._settings.map;
    this._movementVector = { x: 0, y: 0 };
    keyboardSet.forEach((flag) => {
      this.actions[flag]();
    });

    const movementMapX = Math.floor(this._position.x + this._movementVector.x * this._walkSpeed)
    const movementMapY = Math.floor(this.position.y - this._movementVector.y * this._walkSpeed)
    // NEGATIVE Y AXIS IN CANVAS
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

  rotate(mouseOffsetX: number) {
    const oldDir = { x: this._direction.x, y: this._direction.y };
    const rotateAngle =
      -(mouseOffsetX / this._settings.canvasWidth) * this._rotateSpeed;

    this._direction.x =
      this._direction.x * Math.cos(rotateAngle) -
      this.direction.y * Math.sin(rotateAngle);
    this._direction.y =
      oldDir.x * Math.sin(rotateAngle) +
      this._direction.y * Math.cos(rotateAngle);
  }
}
