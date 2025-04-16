import { colorsVector, RGB } from "./colors";
import { Minimap } from "./minimapClass";
import { Paint } from "./paintClass";
import { Player } from "./player";
import { RayCast, RayInfo } from "./raycast";
import { Settings } from "./settingsClass";
import { Vec2, Vector } from "./vector";

export class Renderer {
  private _player: Player;
  private _settings: Settings;
  private _paint: Paint;
  private _minimap: Minimap;
  private _raycast: RayCast;

  private buffer: number[];
  constructor(player: Player, settings: Settings, paint: Paint) {
    this._player = player;
    this._settings = settings;
    this._paint = paint;
    this._raycast = new RayCast(settings);
    this._minimap = new Minimap(settings, paint);
    this.buffer = [];
    this.resetBuffer();
  }

  resetBuffer() {
    const canvasWidth = this._settings.canvasWidth;
    const canvasHeight = this._settings.canvasHeight;
    for (let i = 0; i < canvasHeight * canvasWidth; i++) {
      const index = i * 4;
      this.buffer[index] = 0;
      this.buffer[index + 1] = 0;
      this.buffer[index + 2] = 0;
      this.buffer[index + 3] = 255;
    }
  }

  render() {
    this.resetBuffer();
    const raysInfo = this._raycast.castAllRays(
      this._player.position,
      this._player.direction
    );
    this.renderFloor();
    this.renderCeil();
    this.renderWalls(raysInfo);
    this._paint.paintBuffer(this.buffer);
    this._minimap.renderMinimap(this._player.position, raysInfo);
  }

  renderWalls(raysInfo: RayInfo[]) {
    const MAP = this._settings.map;
    for (let x = 0; x < raysInfo.length; x++) {
      const { lineStart, lineEnd } = this._raycast.calculteLineHeight(
        raysInfo[x].perpDist
      );

      const color =
        colorsVector[MAP[raysInfo[x].mapHit.y][raysInfo[x].mapHit.x]];

      for (let y = lineStart; y <= lineEnd; y++) {
        this.setPixelBuffer(
          { x, y },
          { r: color[0], g: color[1], b: color[2], a: 255 }
        );
      }
    }
  }

  renderFloor() {
    const { mostLeftRay, mostRightRay } = this.getSideRays();
    const canvasWidth = this._settings.canvasWidth;
    const canvasHeight = this._settings.canvasHeight;
    const playerViewHeight = canvasHeight / 2;
    const vanishingPoint = playerViewHeight;
    for (let y = vanishingPoint + 1; y < canvasHeight; y++) {
      const rowDistance = playerViewHeight / (y - vanishingPoint);
      const rowPosition = this.getRowPosition({ rowDistance, mostLeftRay });
      const rowStep = this.getRowStep({
        rowDistance,
        mostLeftRay,
        mostRightRay,
      });

      for (let x = 0; x < canvasWidth; x++) {
        const cell = this.getCell(rowPosition);
        rowPosition.x += rowStep.x;
        rowPosition.y -= rowStep.y;

        if (!this.isCellOutOfBounds(cell)) {
          if ((cell.y + cell.x) % 2 == 0) {
            this.setPixelBuffer({ x, y }, { r: 255, g: 255, b: 255, a: 255 });
          } else {
            this.setPixelBuffer({ x, y }, { r: 0, g: 0, b: 0, a: 255 });
          }
        }
      }
    }
  }

  renderCeil() {
    const { mostLeftRay, mostRightRay } = this.getSideRays();
    const canvasWidth = this._settings.canvasWidth;
    const canvasHeight = this._settings.canvasHeight;
    const playerViewHeight = canvasHeight / 2;
    const vanishingPoint = playerViewHeight;
    for (let y = 0; y < vanishingPoint + 1; y++) {
      const rowDistance = playerViewHeight / (vanishingPoint - y);
      const rowPosition = this.getRowPosition({ rowDistance, mostLeftRay });
      const rowStep = this.getRowStep({
        rowDistance,
        mostLeftRay,
        mostRightRay,
      });

      for (let x = 0; x < canvasWidth; x++) {
        const cell = this.getCell(rowPosition);

        rowPosition.x += rowStep.x;
        rowPosition.y -= rowStep.y;

        if (!this.isCellOutOfBounds(cell)) {
          if ((cell.y + cell.x) % 2 == 0) {
            this.setPixelBuffer({ x, y }, { r: 255, g: 255, b: 255, a: 255 });
          } else {
            this.setPixelBuffer({ x, y }, { r: 0, g: 0, b: 0, a: 255 });
          }
        }
      }
    }
  }

  isCellOutOfBounds(cell: Vec2) {
    if (cell.y > this._settings.map.length - 1) return true;
    if (cell.x > this._settings.map[0].length - 1) return true;
    if (cell.y < 0) return true;
    if (cell.x < 0) return true;
    return false;
  }

  setPixelBuffer(
    position: Vec2,
    values: { r: number; g: number; b: number; a: number }
  ): void {
    const index = (position.y * this._settings.canvasWidth + position.x) * 4;
    this.buffer[index] = values.r;
    this.buffer[index + 1] = values.g;
    this.buffer[index + 2] = values.b;
    this.buffer[index + 3] = values.a;
  }

  getSideRays(): { mostLeftRay: Vec2; mostRightRay: Vec2 } {
    const perpRayDir = Vector.findPerpVector(this._player.direction);
    const mostLeftRay = {
      x: perpRayDir.x + this._player.direction.x,
      y: perpRayDir.y + this._player.direction.y,
    };

    const mostRightRay = {
      x: -perpRayDir.x + this._player.direction.x,
      y: -perpRayDir.y + this._player.direction.y,
    };

    return { mostLeftRay, mostRightRay };
  }

  getCell(position: Vec2): Vec2 {
    return {
      x: Math.floor(position.x),
      y: Math.floor(position.y),
    };
  }

  getRowPosition({
    rowDistance,
    mostLeftRay,
  }: {
    rowDistance: number;
    mostLeftRay: Vec2;
  }): Vec2 {
    const rowPosition = {
      x: this._player.position.x + rowDistance * mostLeftRay.x,
      y: this._player.position.y - rowDistance * mostLeftRay.y,
    };

    return rowPosition;
  }

  getRowStep({
    rowDistance,
    mostRightRay,
    mostLeftRay,
  }: {
    rowDistance: number;
    mostRightRay: Vec2;
    mostLeftRay: Vec2;
  }): Vec2 {
    const canvasWidth = this._settings.canvasWidth;
    const rowStep = {
      x: (rowDistance * (mostRightRay.x - mostLeftRay.x)) / canvasWidth,
      y: (rowDistance * (mostRightRay.y - mostLeftRay.y)) / canvasWidth,
    };

    return rowStep;
  }
}
