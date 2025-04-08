import { Settings } from "./settingsClass";
import { Input } from "./inputClass";

type generatePlayerType = {
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

const POSITION = { x: 3, y: 9 };
const DIRECTION = { x: 1, y: 0 };
const WALK_SPEED = 0.05;
const ROTATE_SPEED = 3;

export class Player {
  private static instance: Player | null = null;
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

  private constructor(options: generatePlayerType) {
    this._position = options.position;
    this._direction = options.direction;
    this._walkSpeed = options.walkSpeed;
    this._rotateSpeed = options.rotateSpeed;
    this._movementVector = { x: 0, y: 0 };
  }

  static getInstance(options?: generatePlayerType): Player {
    if (this.instance != null) return this.instance;

    if (options != null) {
      this.instance = new Player(options);
      return this.instance;
    }

    this.instance = new Player({
      position: POSITION,
      direction: DIRECTION,
      walkSpeed: WALK_SPEED,
      rotateSpeed: ROTATE_SPEED,
    });

    return this.instance;
  }

  update() {
    this.walk();
    this.rotate();
  }

  private walk() {
    const MAP = Settings.getInstance().map;
    this._movementVector = Input.getInstance().generateMoveVector(
      this._direction
    );

    if (
      MAP[Math.floor(this._position.y)][
        Math.floor(this._position.x + this._movementVector.x * this._walkSpeed)
      ] == 0
    )
      this._position.x += this._movementVector.x * this._walkSpeed;

    if (
      MAP[
        Math.floor(this.position.y - this._movementVector.y * this._walkSpeed)
      ][Math.floor(this._position.x)] == 0
    )
      this._position.y -= this._movementVector.y * this._walkSpeed; // NEGATIVE Y AXIS IN CANVAS
  }

  private rotate() {
    const oldDir = { x: this._direction.x, y: this._direction.y };
    const rotateAngle =
      -(Input.getInstance().mouseOffsetX / Settings.getInstance().canvasWidth) *
      this._rotateSpeed;

    this._direction.x =
      this._direction.x * Math.cos(rotateAngle) -
      this.direction.y * Math.sin(rotateAngle);
    this._direction.y =
      oldDir.x * Math.sin(rotateAngle) +
      this._direction.y * Math.cos(rotateAngle);

    Input.getInstance().mouseOffsetX = 0;
  }
}
