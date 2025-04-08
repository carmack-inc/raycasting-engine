import { getPerpVec, normalizeVector } from "./vec2";

const UP_KEY = "W";
const DOWN_KEY = "S";
const LEFT_KEY = "A";
const RIGHT_KEY = "D";

type generateInputType = {
  up: string;
  down: string;
  left: string;
  right: string;
};

export class Input {
  private static instance: Input | null = null;
  private _keySet: Set<string>;
  public get keySet(): Set<string> {
    return this._keySet;
  }
  private _validKeys: string[];
  private _upKey: string;
  private _downKey: string;
  private _leftKey: string;
  private _rightKey: string;
  private _mouseOffsetX: number;
  public get mouseOffsetX(): number {
    return this._mouseOffsetX;
  }
  public set mouseOffsetX(value: number) {
    this._mouseOffsetX = value;
  }

  private constructor(input: generateInputType) {
    this._keySet = new Set<string>();
    this._upKey = input.up;
    this._downKey = input.down;
    this._leftKey = input.left;
    this._rightKey = input.right;
    this._validKeys = [input.up, input.down, input.left, input.left];
    this._mouseOffsetX = 0;
  }
  static getInstance(options?: generateInputType) {
    if (this.instance != null) return this.instance;

    if (options != null) {
      this.instance = new Input(options);
      return this.instance;
    }

    this.instance = new Input({
      up: UP_KEY,
      down: DOWN_KEY,
      left: LEFT_KEY,
      right: RIGHT_KEY,
    });

    return this.instance;
  }

  registerKeyboardInput(key: string) {
    if (this._validKeys.includes(key)) this._keySet.add(key);
  }

  deregisterKeyboardInput(key: string) {
    key = key.toUpperCase();
    this._keySet.delete(key);
  }

  registerMouseInput(mouseMovementX: number) {
    this._mouseOffsetX = mouseMovementX;
  }

  generateMoveVector(towardVec: { x: number; y: number }) {
    let movementVec = { x: 0, y: 0 };
    if (this._keySet.size == 0) {
      return movementVec;
    }
    if (this._keySet.has(UP_KEY)) {
      movementVec = {
        x: movementVec.x + towardVec.x,
        y: movementVec.y + towardVec.y,
      };
    }

    if (this._keySet.has(DOWN_KEY)) {
      movementVec = {
        x: movementVec.x - towardVec.x,
        y: movementVec.y - towardVec.y,
      };
    }

    const perpTowardVec = getPerpVec(towardVec);

    if (this._keySet.has(RIGHT_KEY)) {
      movementVec = {
        x: movementVec.x - perpTowardVec.x,
        y: movementVec.y - perpTowardVec.y,
      };
    }

    if (this._keySet.has(LEFT_KEY)) {
      movementVec = {
        x: movementVec.x + perpTowardVec.x,
        y: movementVec.y + perpTowardVec.y,
      };
    }

    return normalizeVector(movementVec);
  }
}
