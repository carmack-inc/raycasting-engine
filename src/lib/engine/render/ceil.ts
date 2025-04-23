import { Player } from "../player";
import { RayInfo } from "../raycast";
import { Settings } from "../settings";
import { Vec2, Vector } from "../vector";
import { Renderable } from "./renderable";

export class Ceil extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }

  render(player: Player, rays: RayInfo[], buffer: number[]) {
    const { mostLeftRay, mostRightRay } = this.getSideRays(player);
    const canvasWidth = this.settings.canvasWidth;
    const canvasHeight = this.settings.canvasHeight;
    const playerViewHeight = canvasHeight / 2;
    const vanishingPoint = playerViewHeight;
    for (let y = 0; y < vanishingPoint; y++) {
      const rowDistance = playerViewHeight / (vanishingPoint - y);
      // camera space
      const rowVector = this.getRowVector({
        rowDistance,
        mostLeftRay,
      });
      // transform in world space
      const rowPosition = this.getRowPosition({
        player,
        rowVector,
      });

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
            this.setPixelBuffer(
              buffer,
              { x, y },
              { r: 255, g: 255, b: 255, a: 255 }
            );
          } else {
            this.setPixelBuffer(buffer, { x, y }, { r: 0, g: 0, b: 0, a: 255 });
          }
        }
      }
    }
  }

  getSideRays(player: Player): { mostLeftRay: Vec2; mostRightRay: Vec2 } {
    const perpRayDir = Vector.findPerpVector(player.direction);
    const mostLeftRay = {
      x: perpRayDir.x + player.direction.x,
      y: perpRayDir.y + player.direction.y,
    };

    const mostRightRay = {
      x: -perpRayDir.x + player.direction.x,
      y: -perpRayDir.y + player.direction.y,
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
    player,
    rowVector,
  }: {
    player: Player;
    rowVector: Vec2;
  }): Vec2 {
    return {
      x: player.position.x + rowVector.x,
      y: player.position.y - rowVector.y,
    };
  }

  getRowVector({
    rowDistance,
    mostLeftRay,
  }: {
    rowDistance: number;
    mostLeftRay: Vec2;
  }): Vec2 {
    return {
      x: rowDistance * mostLeftRay.x,
      y: rowDistance * mostLeftRay.y,
    };
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
    const canvasWidth = this.settings.canvasWidth;
    const rowStep = {
      x: (rowDistance * (mostRightRay.x - mostLeftRay.x)) / canvasWidth,
      y: (rowDistance * (mostRightRay.y - mostLeftRay.y)) / canvasWidth,
    };

    return rowStep;
  }
}
