import { colors, colorsVector, RGB } from "./colors";
import { Minimap } from "./minimapClass";
import { Paint } from "./paintClass";
import { Player } from "./player";
import { RayCast, RayInfo } from "./raycast";
import { Settings } from "./settingsClass";
import { Vector } from "./vector";

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
    for (
      let i = 0;
      i < this._settings.canvasHeight * this._settings.canvasWidth;
      i++
    ) {
      const index = i * 4;
      this.buffer[index] = 0;
      this.buffer[index + 1] = 0;
      this.buffer[index + 2] = 0;
      this.buffer[index + 3] = 255;
    }
  }

  resetBuffer() {
    for (
      let i = 0;
      i < this._settings.canvasHeight * this._settings.canvasWidth;
      i++
    ) {
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
        x,
        raysInfo[x].perpDist
      );

      const color =
        colorsVector[MAP[raysInfo[x].mapHit.y][raysInfo[x].mapHit.x]];

      for (let y = lineStart.y; y < lineEnd.y; y++) {
        const index = (y * this._settings.canvasWidth + x) * 4;
        this.buffer[index] = color[0];
        this.buffer[index + 1] = color[1];
        this.buffer[index + 2] = color[2];
        this.buffer[index + 3] = 255;
      }
    }
  }

  renderFloor() {
    const perpRayDir = Vector.findPerpVector(this._player.direction);
    const mostLeftRay = {
      x: perpRayDir.x + this._player.direction.x,
      y: perpRayDir.y + this._player.direction.y,
    };

    const mostRightRay = {
      x: -perpRayDir.x + this._player.direction.x,
      y: -perpRayDir.y + this._player.direction.y,
    };
    for (
      let y = this._settings.canvasHeight / 2 + 1;
      y < this._settings.canvasHeight;
      y++
    ) {
      const rowDistance =
        (0.5 * this._settings.canvasHeight) /
        (y - this._settings.canvasHeight / 2);

      const floorStep = {
        x:
          (rowDistance * (mostRightRay.x - mostLeftRay.x)) /
          this._settings.canvasWidth,
        y:
          (rowDistance * (mostRightRay.y - mostLeftRay.y)) /
          this._settings.canvasWidth,
      };

      const floor = {
        x: this._player.position.x + rowDistance * mostLeftRay.x,
        y: this._player.position.y - rowDistance * mostLeftRay.y,
      };

      for (let x = 0; x < this._settings.canvasWidth; x++) {
        const cell = {
          x: Math.floor(floor.x),
          y: Math.floor(floor.y),
        };

        let outOfMap = false;

        if (cell.y > this._settings.map.length - 1) outOfMap = true;
        if (cell.x > this._settings.map[0].length - 1) outOfMap = true;
        if (cell.y < 0) outOfMap = true;
        if (cell.x < 0) outOfMap = true;

        floor.x += floorStep.x;
        floor.y -= floorStep.y;

        if (!outOfMap) {
          const index = (y * this._settings.canvasWidth + x) * 4;
          if ((cell.y + cell.x) % 2 == 0) {
            this.buffer[index] = 255;
            this.buffer[index + 1] = 255;
            this.buffer[index + 2] = 255;
            this.buffer[index + 3] = 255;
          } else {
            this.buffer[index] = 0;
            this.buffer[index + 1] = 0;
            this.buffer[index + 2] = 0;
            this.buffer[index + 3] = 255;
          }
        }
      }
    }
  }

  renderCeil() {
    const perpRayDir = Vector.findPerpVector(this._player.direction);
    const mostLeftRay = {
      x: perpRayDir.x + this._player.direction.x,
      y: perpRayDir.y + this._player.direction.y,
    };

    const mostRightRay = {
      x: -perpRayDir.x + this._player.direction.x,
      y: -perpRayDir.y + this._player.direction.y,
    };
    for (let y = 0; y < this._settings.canvasHeight / 2 + 1; y++) {
      const rowDistance =
        (0.5 * this._settings.canvasHeight) /
        (this._settings.canvasHeight / 2 - y);

      const floorStep = {
        x:
          (rowDistance * (mostRightRay.x - mostLeftRay.x)) /
          this._settings.canvasWidth,
        y:
          (rowDistance * (mostRightRay.y - mostLeftRay.y)) /
          this._settings.canvasWidth,
      };

      const floor = {
        x: this._player.position.x + rowDistance * mostLeftRay.x,
        y: this._player.position.y - rowDistance * mostLeftRay.y,
      };

      for (let x = 0; x < this._settings.canvasWidth; x++) {
        const cell = {
          x: Math.floor(floor.x),
          y: Math.floor(floor.y),
        };

        let outOfMap = false;

        if (cell.y > this._settings.map.length - 1) outOfMap = true;
        if (cell.x > this._settings.map[0].length - 1) outOfMap = true;
        if (cell.y < 0) outOfMap = true;
        if (cell.x < 0) outOfMap = true;

        floor.x += floorStep.x;
        floor.y -= floorStep.y;

        if (!outOfMap) {
          const index = (y * this._settings.canvasWidth + x) * 4;
          if ((cell.y + cell.x) % 2 == 0) {
            this.buffer[index] = 255;
            this.buffer[index + 1] = 255;
            this.buffer[index + 2] = 255;
            this.buffer[index + 3] = 255;
          } else {
            this.buffer[index] = 0;
            this.buffer[index + 1] = 0;
            this.buffer[index + 2] = 0;
            this.buffer[index + 3] = 255;
          }
        }
      }
    }
  }

  renderMinimapPlayer() {
    const circleCenter = this._minimap.getMinimapCenter();
    this._paint.paintCircle(
      circleCenter,
      this._settings.pixelSize / 2,
      RGB.magenta
    );
  }
}
