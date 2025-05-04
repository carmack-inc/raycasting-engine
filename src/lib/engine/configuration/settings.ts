import { Vec2 } from "../utils/vector";
import { ColorOptions } from "./colors";

export type GenerateSettingsType = {
  canvas: {
    size: {
      w: number;
      h: number;
    };
  };
  map: ColorOptions[][];
  minimap: {
    size: number;
    position: {
      x: number;
      y: number;
    };
    zoom: number;
  };
};

export class Settings {
  private _canvasWidth: number;
  public get canvasWidth(): number {
    return this._canvasWidth;
  }
  private _canvasHeight: number;
  public get canvasHeight(): number {
    return this._canvasHeight;
  }
  private _map: ColorOptions[][];
  public get map(): ColorOptions[][] {
    return this._map;
  }
  private _minimapSize: number;
  public get minimapSize(): number {
    return this._minimapSize;
  }
  private _minimapPosition: { x: number; y: number };
  public get minimapPosition(): { x: number; y: number } {
    return this._minimapPosition;
  }
  private _minimapZoom: number;
  public get minimapZoom(): number {
    return this._minimapZoom;
  }
  private _pixelSize: number;
  public get pixelSize(): number {
    return this._pixelSize;
  }

  constructor(options: GenerateSettingsType) {
    this._canvasWidth = options.canvas.size.w;
    this._canvasHeight = options.canvas.size.h;
    this._map = options.map;
    this._minimapSize = options.minimap.size;
    this._minimapPosition = options.minimap.position;
    this._minimapZoom = options.minimap.zoom;
    this._pixelSize = options.minimap.size / (options.minimap.zoom * 2);
  }

  isCellOutOfBounds(cell: Vec2) {
    if (cell.y > this._map.length - 1) return true;
    if (cell.x > this._map[0].length - 1) return true;
    if (cell.y < 0) return true;
    if (cell.x < 0) return true;
    return false;
  }
}
