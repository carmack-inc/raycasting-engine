import { Paint } from "../paint";
import { Player } from "../player";
import { RayCast } from "../raycast";
import { Settings } from "../settings";
import { Ceil } from "./ceil";
import { Floor } from "./floor";
import { Minimap } from "./minimap";
import { Renderable } from "./renderable";
import { Wall } from "./wall";

export class Renderer {
  private _settings: Settings;
  private _paint: Paint;
  private _minimap: Minimap;
  private _raycast: RayCast;
  private _floor: Renderable;
  private _ceil: Renderable;
  private _wall: Renderable;
  private _buffer: number[];
  public get buffer(): number[] {
    return this._buffer;
  }

  constructor(settings: Settings, paint: Paint) {
    this._settings = settings;
    this._paint = paint;
    this._raycast = new RayCast(settings);
    this._minimap = new Minimap(settings, paint);
    this._floor = new Floor(settings);
    this._ceil = new Ceil(settings);
    this._wall = new Wall(settings);
    this._buffer = [];
    this.resetBuffer();
  }

  resetBuffer() {
    const canvasWidth = this._settings.canvasWidth;
    const canvasHeight = this._settings.canvasHeight;
    for (let i = 0; i < canvasHeight * canvasWidth; i++) {
      const index = i * 4;
      this._buffer[index] = 0;
      this._buffer[index + 1] = 0;
      this._buffer[index + 2] = 0;
      this._buffer[index + 3] = 255;
    }
  }

  render(player: Player) {
    this.resetBuffer();
    const raysInfo = this._raycast.castAllRays(
      player.position,
      player.direction
    );
    this._floor.render(player, raysInfo, this.buffer);
    this._ceil.render(player, raysInfo, this.buffer);
    this._wall.render(player, raysInfo, this.buffer);
    this._paint.paintBuffer(this.buffer);
    this._minimap.renderMinimap(player.position, raysInfo);
  }
}
