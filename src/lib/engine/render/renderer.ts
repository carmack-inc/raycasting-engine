import { Entity } from "./entity";
import { Paint } from "../paint";
import { RayCast } from "../raycast";
import { Settings } from "../settings";
import { Ceil } from "./ceil";
import { Floor } from "./floor";
import { Minimap } from "./minimap";
import { Renderable } from "./renderable";
import { Wall } from "./wall";
import { GameState } from "../gameModal";


export class Renderer {
  private _settings: Settings;
  private _paint: Paint;
  private _minimap: Minimap;
  private _raycast: RayCast;
  private _floor: Renderable;
  private _ceil: Renderable;
  private _wall: Renderable;
  private _entity: Renderable;
  private _buffer: number[];

  constructor(settings: Settings, paint: Paint) {
    this._settings = settings;
    this._paint = paint;
    this._raycast = new RayCast(settings);
    this._minimap = new Minimap(settings, paint);
    this._floor = new Floor(settings);
    this._ceil = new Ceil(settings);
    this._wall = new Wall(settings);
    this._entity = new Entity(settings)
    this._buffer = [];
    this.resetBuffer(this._settings.canvasWidth,this._settings.canvasHeight, this._buffer);
  }

  resetBuffer(canvasWidth: number, canvasHeight: number, buffer: number[]) {
    for (let i = 0; i < canvasHeight * canvasWidth; i++) {
      const index = i * 4;
      buffer[index] = 0;
      buffer[index + 1] = 0;
      buffer[index + 2] = 0;
      buffer[index + 3] = 255;
    }
  }

  loseBuffer(canvasWidth: number, canvasHeight: number, buffer: number[]) {
    for (let i = 0; i < canvasHeight * canvasWidth; i++) {
      const index = i * 4;
      const bw = (buffer[index] + buffer[index + 1] +buffer[index + 2])/3
      buffer[index] = bw;
      buffer[index + 1] = bw;
      buffer[index + 2] = bw;
      buffer[index + 3] = 255;
    }
  }

  winBuffer(canvasWidth: number, canvasHeight: number, buffer: number[]) {
    for (let i = 0; i < canvasHeight * canvasWidth; i++) {
      const index = i * 4;
      const bw = (buffer[index] + buffer[index + 1] +buffer[index + 2])/3
      buffer[index] = bw;
      buffer[index + 1] = bw;
      buffer[index + 2] = 0;
      buffer[index + 3] = 255;
    }
  }

  render(gameState: GameState) {
    this.resetBuffer(this._settings.canvasWidth,this._settings.canvasHeight, this._buffer);
    const raysInfo = this._raycast.castAllRays(
      gameState.player.position,
      gameState.player.direction,
    );
    this._floor.render(gameState, raysInfo, this._buffer);
    this._ceil.render(gameState, raysInfo, this._buffer);
    this._wall.render(gameState, raysInfo, this._buffer);
    this._entity.render(gameState, raysInfo, this._buffer);
    this._paint.paintBuffer(this._buffer);
    this._minimap.renderMinimap(gameState.player.position, raysInfo);
    if(gameState.game.state == "lose"){
      this.loseBuffer(this._settings.canvasWidth,this._settings.canvasHeight, this._buffer);
      this._paint.paintBuffer(this._buffer);
    }

    if(gameState.game.state == "win"){
      this.winBuffer(this._settings.canvasWidth,this._settings.canvasHeight, this._buffer);
      this._paint.paintBuffer(this._buffer);
    }
    
  } 


    
  
}
