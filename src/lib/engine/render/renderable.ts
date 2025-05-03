import { GameState } from "../gameModal";
import { RayInfo } from "../raycast";
import { Settings } from "../settings";
import { Vec2 } from "../vector";

export abstract class Renderable {
  private _settings: Settings;
  public get settings(): Settings {
    return this._settings;
  }

  constructor(settings: Settings) {
    this._settings = settings;
  }
  abstract render(gameState: GameState, rays: RayInfo[], buffer: number[]): void;
  setPixelBuffer(
    buffer: number[],
    position: Vec2,
    values: { r: number; g: number; b: number; a: number }
  ): void {
    const index = (position.y * this._settings.canvasWidth + position.x) * 4;
    if (index >= buffer.length) return;
    buffer[index] = values.r;
    buffer[index + 1] = values.g;
    buffer[index + 2] = values.b;
    buffer[index + 3] = values.a;
  }
}
