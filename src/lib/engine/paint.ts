import { Vec2 } from "./vec2";

export function paintRect(
  pos: Vec2,
  size: { w: number; h: number },
  color: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = color;
  ctx.fillRect(pos.x, pos.y, size.w, size.h);
}

export function paintLine(
  start: Vec2,
  end: Vec2,
  color: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineWidth = 1;
  ctx.stroke();
}

export function paintCircle(
  center: Vec2,
  radius: number,
  color: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
}
