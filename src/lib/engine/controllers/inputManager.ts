export type ActionsFlags = "UP_KEY" | "DOWN_KEY" | "LEFT_KEY" | "RIGHT_KEY";

export type GenerateInputType = Record<ActionsFlags, string>;

export class InputManager {
  private _keySet: Set<ActionsFlags>;
  private _validKeys: Record<string, ActionsFlags>;
  private _mouseOffsetX: number;

  constructor(input: GenerateInputType) {
    this._keySet = new Set<ActionsFlags>();
    this._validKeys = this.createValidKeys(input)
    this._mouseOffsetX = 0;
  }

  createValidKeys(input: GenerateInputType): Record<string, ActionsFlags>{
    return Object.fromEntries(
      (Object.entries(input) as [ActionsFlags, string][]).map<
        [string, ActionsFlags]
      >(([action, key]) => {
        return [key.toUpperCase(), action];
      })
    ) as Record<string, ActionsFlags>;
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
