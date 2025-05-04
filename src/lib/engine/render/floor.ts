import { GameState } from "../logic/gameModal";
import { RayInfo } from "../raycast";
import { Settings } from "../configuration/settings";
import { Vec2, Vector } from "../utils/vector";
import { Renderable } from "./renderable";

export class Floor extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }

  render(gameState: GameState, rays: RayInfo[], buffer: number[]) {
    const { mostLeftRay, mostRightRay } = this.getSideRays(gameState.player.direction);
    const canvasWidth = this.settings.canvasWidth;
    const canvasHeight = this.settings.canvasHeight;
    const playerViewHeight = canvasHeight / 2;
    const vanishingPoint = playerViewHeight;
    for (let y = vanishingPoint + 1; y < canvasHeight; y++) {
      const rowDistance = playerViewHeight / (y - vanishingPoint);
      // camera space
      const rowVector = this.getRowVector({
        rowDistance,
        mostLeftRay,
      });
      // transform in world space
      const rowPosition = this.getRowPosition({
        playerPosition: gameState.player.position,
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

        if (!this.settings.isCellOutOfBounds(cell)) {
          let isGoalCell = false;
          gameState.goals.forEach(goal => {
            isGoalCell = cell.x == goal.x && cell.y == goal.y
          })
          if(isGoalCell){
            this.setPixelBuffer(
              buffer,
              { x, y },
              { r: 255, g: 255, b: 0, a: 255 }
            );
          } else{
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
  }

  getSideRays(playerDirection: Vec2): { mostLeftRay: Vec2; mostRightRay: Vec2 } {
    const perpRayDir = Vector.findPerpVector(playerDirection);
    const mostLeftRay = {
      x: perpRayDir.x + playerDirection.x,
      y: perpRayDir.y + playerDirection.y,
    };

    const mostRightRay = {
      x: -perpRayDir.x + playerDirection.x,
      y: -perpRayDir.y + playerDirection.y,
    };

    return { mostLeftRay, mostRightRay };
  }

  getCell(position: Vec2): Vec2 {
    return {
      x: Math.floor(position.x),
      y: Math.floor(position.y),
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

  getRowPosition({
    playerPosition,
    rowVector,
  }: {
    playerPosition: Vec2;
    rowVector: Vec2;
  }): Vec2 {
    return {
      x: playerPosition.x + rowVector.x,
      y: playerPosition.y - rowVector.y,
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
