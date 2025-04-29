import { Settings } from "../settings";
import { Renderable } from "./renderable";
import { Color, colorsVector } from "../colors";
import { RayInfo } from "../raycast";
import { GameState } from "../gameModal";
import { Vec2 } from "../vector";


export class Wall extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }

  render(gameState: GameState, rays: RayInfo[], buffer: number[]): void {
    
    const MAP = this.settings.map;
    for (let x = 0; x < rays.length; x++) {
      const {lineHeight, lineStart, lineEnd } = this.calculateLineHeight(rays[x].perpDist);
      const textureWidth = 64;
      const textureHeight = 64;
      const textureX = this.getTextureCoordenateX(rays[x], gameState.player.position, textureWidth);
      const textureStepY = this.getTextureStepY(lineHeight, textureHeight);
      let texturePositionY = this.getTexturePositionY(lineHeight, lineStart, textureStepY)

      if(this.isCellOutOfBounds(rays[x].mapHit)){
        this.drawOutOfMapColumn(x, lineStart, lineEnd, buffer)
      } else {
        for (let y = lineStart; y <= lineEnd; y++) {
          const textureY = this.getTextureCoordenateY(texturePositionY, textureHeight)
          texturePositionY += textureStepY
          const mapIndex = MAP[rays[x].mapHit.y][rays[x].mapHit.x];
          let color = colorsVector[mapIndex]
          if(mapIndex <= Color.texture.length){
            const texIndex = (textureY * 64 + textureX) * 4
            color = [Color.texture[mapIndex - 1][texIndex], Color.texture[mapIndex - 1][texIndex + 1], Color.texture[mapIndex - 1][texIndex + 2]]
          } 
          if(rays[x].side == "x"){
            color = [color[0] >> 1, color[1] >> 1, color[2] >> 1] 
          }
          
          this.setPixelBuffer(
            buffer,
            { x, y },
            { r: color[0], g: color[1], b: color[2], a: 255 }
          );
        }     
      }
    }
  }

  calculateLineHeight(perpDist: number): {lineHeight: number, lineStart: number; lineEnd: number } {
    const CANVAS_HEIGHT = this.settings.canvasHeight;
    const lineHeight = Math.floor(CANVAS_HEIGHT / perpDist);
    const lineStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
    const lineEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;

    return {
      lineHeight,
      lineStart: lineStart < 0 ? 0 : Math.floor(lineStart),
      lineEnd:
        lineEnd >= CANVAS_HEIGHT ? CANVAS_HEIGHT - 1 : Math.floor(lineEnd),
    };
  }

  getTextureCoordenateX(ray: RayInfo, playerPosition: Vec2, textureWidth: number): number{
    
    const parallelWallDist = this.getParallelWallDist(ray, playerPosition);
    const widthPercent = parallelWallDist - Math.floor(parallelWallDist);
    const textureCoordenateX = Math.floor(widthPercent * textureWidth);

    // inverse for continuos texture
    if(ray.side == "x" && ray.rayDirection.x < 0) return textureWidth - textureCoordenateX - 1;
    if(ray.side == "y" && ray.rayDirection.y > 0) return textureWidth - textureCoordenateX - 1;

    return textureCoordenateX;
  }

  getTextureCoordenateY(texturePositionY: number, textureHeight: number): number{
    const textureY = Math.floor(texturePositionY);
    return textureY > textureHeight - 1 ? textureHeight - 1 : textureY
  }

  getParallelWallDist(ray: RayInfo, playerPosition: Vec2): number{
    return ray.side == "x" ? 
        ray.rayDirection.y * ray.perpDist - playerPosition.y :
        ray.rayDirection.x * ray.perpDist + playerPosition.x;
  }

  getTextureStepY(lineHeight: number, textureHeight: number): number{
    return textureHeight / lineHeight
  }

  getTexturePositionY(lineHeight: number, lineStart: number, textureYStep: number): number{
    return (lineStart - (this.settings.canvasHeight / 2) + (lineHeight / 2)) * textureYStep
  }

  drawOutOfMapColumn(column: number, lineStart: number, lineEnd: number, buffer: number[]): void{
    for (let y = lineStart; y <= lineEnd; y++) {
      const color = colorsVector[0]
      this.setPixelBuffer(
        buffer,
        { x: column, y },
        { r: color[0], g: color[1], b: color[2], a: 255 }
      );
    }
  }

}
