import type { ColorOptions } from "./settings";

type generateSettingsType = {
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

const MAP: ColorOptions[][] = [
  [0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
];

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const MINIMAP_SIZE: number = 200;
const MINIMAP_ZOOM: number = 5;
const PIXEL_SIZE: number = MINIMAP_SIZE / (MINIMAP_ZOOM * 2);
const MINIMAP_POSITION_X = CANVAS_WIDTH - MINIMAP_SIZE - PIXEL_SIZE / 2;
const MINIMAP_POSITION_Y = CANVAS_HEIGHT - MINIMAP_SIZE - PIXEL_SIZE / 2;

export class Settings {
  private static instance: Settings | null = null;
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
  private _minimapZoom: number;
  public get minimapZoom(): number {
    return this._minimapZoom;
  }
  private _pixelSize: number;
  public get pixelSize(): number {
    return this._pixelSize;
  }

  private constructor(options: generateSettingsType) {
    this._canvasWidth = options.canvas.size.w;
    this._canvasHeight = options.canvas.size.h;
    this._map = options.map;
    this._minimapSize = options.minimap.size;
    this._minimapZoom = options.minimap.zoom;
    this._pixelSize = options.minimap.size / (options.minimap.zoom * 2);
  }

  static getInstance(options?: generateSettingsType): Settings {
    if (this.instance != null) return this.instance;

    if (options) {
      this.instance = new Settings(options);
      return this.instance;
    }

    this.instance = new Settings({
      canvas: {
        size: {
          w: CANVAS_WIDTH,
          h: CANVAS_HEIGHT,
        },
      },
      map: MAP,
      minimap: {
        size: MINIMAP_SIZE,
        position: {
          x: MINIMAP_POSITION_X,
          y: MINIMAP_POSITION_Y,
        },
        zoom: MINIMAP_ZOOM,
      },
    });

    return this.instance;
  }
}
