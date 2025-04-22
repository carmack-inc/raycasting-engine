export type ActionsFlags = "UP_KEY" | "DOWN_KEY" | "LEFT_KEY" | "RIGHT_KEY";

export type GenerateInputType = Record<ActionsFlags, string>;

export class InputManager {
  private _keySet: Set<ActionsFlags>;
  private _validKeys: Record<string, ActionsFlags>;
  private _mouseOffsetX: number;

  constructor(input: GenerateInputType) {
    this._keySet = new Set<ActionsFlags>();

    this._validKeys = Object.fromEntries(
      (Object.entries(input) as [string, ActionsFlags][]).map<
        [ActionsFlags, string]
      >(([action, key]) => {
        return [key, action];
      })
    ) as Record<string, ActionsFlags>;

    this._mouseOffsetX = 0;
  }

  registerKeyboardInput(key: string) {
    key = key.toUpperCase();
    if (this._validKeys[key] != null) this._keySet.add(this._validKeys[key]);
  }

  deregisterKeyboardInput(key: string) {
    key = key.toUpperCase();
    if (this._validKeys[key] != null) this._keySet.delete(this._validKeys[key]);
  }

  getKeyboardSet() {
    return this._keySet;
  }

  produceMouseInput(mouseMovementX: number) {
    this._mouseOffsetX = mouseMovementX;
  }

  consumeMouseInput() {
    const oldMouseOffsetX = this._mouseOffsetX;
    this._mouseOffsetX = 0;
    return oldMouseOffsetX;
  }
}
