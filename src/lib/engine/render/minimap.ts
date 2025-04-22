import { colorsVector, RGBVector, RGB } from "../colors";
import { Paint } from "../paint";
import { RayInfo } from "../raycast";
import { Settings } from "../settings";
import { Vec2 } from "../vector";

export class Minimap {
  private _settings: Settings;
  private _paint: Paint;
  constructor(settings: Settings, paint: Paint) {
    this._settings = settings;
    this._paint = paint;
  }

  renderMinimap(playerPos: Vec2, raysInfo: RayInfo[]) {
    this.renderMinimapBorder();
    this.renderMinimapWalls(playerPos);
    this.renderMinimapRays(raysInfo);
    this.renderMinimapPlayer();
  }

  resizeRayOutOfMinimap(euclidianDist: Vec2) {
    const maxRayDist = this._settings.minimapZoom;

    const delimitedRay = { x: euclidianDist.x, y: euclidianDist.y };

    if (Math.abs(delimitedRay.x) > maxRayDist) {
      const proportion = maxRayDist / Math.abs(delimitedRay.x);

      delimitedRay.x = delimitedRay.x > 0 ? maxRayDist : -maxRayDist;
      delimitedRay.y *= proportion;
    }

    if (Math.abs(delimitedRay.y) > maxRayDist) {
      const proportion = maxRayDist / Math.abs(delimitedRay.y);

      delimitedRay.x *= proportion;
      delimitedRay.y = delimitedRay.y > 0 ? maxRayDist : -maxRayDist;
    }

    return delimitedRay;
  }

  renderMinimapPlayer() {
    const circleCenter = this.getMinimapCenter();
    this._paint.paintCircle(
      circleCenter,
      this._settings.pixelSize / 2,
      RGB.magenta
    );
  }

  renderMinimapRays(raysInfo: RayInfo[]) {
    const minimapCenter = this.getMinimapCenter();
    for (let i = 0; i < raysInfo.length; i++) {
      const euclidianVector = {
        x: raysInfo[i].rayDirection.x * raysInfo[i].perpDist,
        y: raysInfo[i].rayDirection.y * raysInfo[i].perpDist,
      };
      const euclidianVectorMinimap =
        this.resizeRayOutOfMinimap(euclidianVector);

      const moveToMinimapCenter = {
        x: this._settings.minimapZoom + euclidianVectorMinimap.x,
        y: this._settings.minimapZoom - euclidianVectorMinimap.y, // NEGATIVE Y AXIS IN CANVAS
      };

      this._paint.paintLine(
        minimapCenter,
        {
          x:
            moveToMinimapCenter.x * this._settings.pixelSize +
            this._settings.minimapPosition.x,
          y:
            moveToMinimapCenter.y * this._settings.pixelSize +
            this._settings.minimapPosition.y,
        },
        RGB.white
      );
    }
  }

  renderMinimapBorder() {
    this._paint.paintRect(
      {
        x: -0.5 * this._settings.pixelSize + this._settings.minimapPosition.x,
        y: -0.5 * this._settings.pixelSize + this._settings.minimapPosition.y,
      },
      {
        w: (this._settings.minimapZoom + 0.5) * 2 * this._settings.pixelSize,
        h: (this._settings.minimapZoom + 0.5) * 2 * this._settings.pixelSize,
      },
      RGB.magenta
    );
  }

  renderMinimapWalls(playerPos: Vec2) {
    const offsetJ = playerPos.y - this._settings.minimapZoom;
    const offsetI = playerPos.x - this._settings.minimapZoom;
    const floorOffSetJ = Math.floor(offsetJ);
    const floorOffSetI = Math.floor(offsetI);

    for (let j = 0; j < this._settings.minimapZoom * 2 + 1; j++) {
      for (let i = 0; i < this._settings.minimapZoom * 2 + 1; i++) {
        const color = this.getPixelColor(j + floorOffSetJ, i + floorOffSetI);
        const pixelSize = this.getPixelSize(
          j,
          i,
          offsetJ - floorOffSetJ,
          offsetI - floorOffSetI
        );
        const pixelPos = this.getPixelPos(
          j,
          i,
          offsetJ - floorOffSetJ,
          offsetI - floorOffSetI
        );
        this._paint.paintRect(
          pixelPos,
          pixelSize,
          `rgb( ${color[0]} ${color[1]} ${color[2]})`
        );
      }
    }
  }

  getMinimapCenter(): Vec2 {
    return {
      x:
        this._settings.minimapZoom * this._settings.pixelSize +
        this._settings.minimapPosition.x,
      y:
        this._settings.minimapZoom * this._settings.pixelSize +
        this._settings.minimapPosition.y,
    };
  }

  getPixelColor(jPos: number, iPos: number): number[] {
    if (jPos > this._settings.map.length - 1 || jPos < 0)
      return RGBVector.black;
    if (iPos < 0 || iPos > this._settings.map[0].length - 1)
      return RGBVector.black;
    return colorsVector[this._settings.map[jPos][iPos]];
  }

  getPixelPos(j: number, i: number, offsetJ: number, offsetI: number): Vec2 {
    const pos = {
      x:
        (i - offsetI) * this._settings.pixelSize +
        this._settings.minimapPosition.x,
      y:
        (j - offsetJ) * this._settings.pixelSize +
        this._settings.minimapPosition.y,
    };
    if (i == 0)
      pos.x = i * this._settings.pixelSize + this._settings.minimapPosition.x;
    if (j == 0)
      pos.y = j * this._settings.pixelSize + this._settings.minimapPosition.y;
    return pos;
  }

  getPixelSize(
    j: number,
    i: number,
    offsetJ: number,
    offsetI: number
  ): { w: number; h: number } {
    const size = { w: this._settings.pixelSize, h: this._settings.pixelSize };
    if (i == 0) size.w = (1 - offsetI) * this._settings.pixelSize;
    if (j == 0) size.h = (1 - offsetJ) * this._settings.pixelSize;

    if (i == this._settings.minimapZoom * 2)
      size.w = offsetI * this._settings.pixelSize;
    if (j == this._settings.minimapZoom * 2)
      size.h = offsetJ * this._settings.pixelSize;
    return size;
  }
}
