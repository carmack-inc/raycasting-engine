import { Vec2 } from "./utils/vector";

export interface Paint {
  paintRect(pos: Vec2, size: { w: number; h: number }, color: string): void;
  paintLine(start: Vec2, end: Vec2, color: string): void;
  paintCircle(center: Vec2, radius: number, color: string): void;
  paintBuffer(buffer: number[]): void;
}

export class CanvasPaint implements Paint {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    const ctx = this._canvas.getContext("2d", { alpha: false });
    if (!ctx) throw Error();
    this._ctx = ctx;
  }

  paintRect(pos: Vec2, size: { w: number; h: number }, color: string) {
    this._ctx.fillStyle = color;
    this._ctx.fillRect(pos.x, pos.y, size.w, size.h);
  }

  paintLine(start: Vec2, end: Vec2, color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.beginPath();
    this._ctx.moveTo(start.x, start.y);
    this._ctx.lineTo(end.x, end.y);
    this._ctx.lineWidth = 1;
    this._ctx.stroke();
  }

  paintCircle(center: Vec2, radius: number, color: string) {
    this._ctx.beginPath();
    this._ctx.fillStyle = color;
    this._ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    this._ctx.fill();
  }

  paintBuffer(buffer: number[]) {
    const imageData = this._ctx.createImageData(
      this._canvas.width,
      this._canvas.height
    );
    const bufferData = imageData.data;
    for (let i = 0; i < this._canvas.height * this._canvas.width; i++) {
      const index = i * 4;
      bufferData[index] = buffer[index]; // R
      bufferData[index + 1] = buffer[index + 1]; // G
      bufferData[index + 2] = buffer[index + 2]; // B
      bufferData[index + 3] = buffer[index + 3]; // A
    }

    this._ctx.putImageData(imageData, 0, 0);
  }
}
