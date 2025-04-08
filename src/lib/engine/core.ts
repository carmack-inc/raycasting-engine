import { Player } from "./player";
import { RayCast } from "./raycast";

export class Core {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private currentTime: number;
  private timeAccumulator: number;
  private readonly FPS = 60;
  private readonly timePerFrame = 1000 / this.FPS;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    const ctx = this._canvas.getContext("2d");
    if (!ctx) throw Error();
    this._ctx = ctx;
    this.currentTime = Date.now();
    this.timeAccumulator = 0;
  }
  start() {
    window.requestAnimationFrame(this.gameLoop);
  }

  private gameLoop(newCurrentTime: number) {
    const frameTime = newCurrentTime - this.currentTime;

    this.currentTime = newCurrentTime;
    if (frameTime > 0) this.timeAccumulator += frameTime;

    while (this.timeAccumulator >= this.timePerFrame) {
      //console.log((1 / frameTime) * 1000);
      Player.getInstance().update();
      this.timeAccumulator -= this.timePerFrame;
    }
    RayCast.draw(this._ctx);
    window.requestAnimationFrame(this.gameLoop);
  }
}
