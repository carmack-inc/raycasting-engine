import { Player } from "../player";
import { Settings } from "../settings";
import { Renderable } from "./renderable";
import { colorsVector } from "../colors";
import { RayInfo } from "../raycast";

export class Wall extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }

  render(player: Player, rays: RayInfo[], buffer: number[]) {
    const MAP = this.settings.map;
    for (let x = 0; x < rays.length; x++) {
      const { lineStart, lineEnd } = this.calculteLineHeight(rays[x].perpDist);

      const color = colorsVector[MAP[rays[x].mapHit.y][rays[x].mapHit.x]];

      for (let y = lineStart; y <= lineEnd; y++) {
        this.setPixelBuffer(
          buffer,
          { x, y },
          { r: color[0], g: color[1], b: color[2], a: 255 }
        );
      }
    }
  }

  calculteLineHeight(perpDist: number): { lineStart: number; lineEnd: number } {
    const CANVAS_HEIGHT = this.settings.canvasHeight;
    const lineHeight = Math.floor(CANVAS_HEIGHT / perpDist);
    const lineStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
    const lineEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

    return {
      lineStart: lineStart < 0 ? 0 : Math.floor(lineStart),
      lineEnd:
        lineEnd >= CANVAS_HEIGHT ? CANVAS_HEIGHT - 1 : Math.floor(lineEnd),
    };
  }
}
