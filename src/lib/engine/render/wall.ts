import { Settings } from "../settings";
import { Renderable } from "./renderable";
import { Color, colorsVector } from "../colors";
import { RayInfo } from "../raycast";
import { GameState } from "../gameModal";


export class Wall extends Renderable {
  constructor(settings: Settings) {
    super(settings);
  }

  render(gameState: GameState, rays: RayInfo[], buffer: number[]) {
    
    const MAP = this.settings.map;
    for (let x = 0; x < rays.length; x++) {
      const {lineHeight, lineStart, lineEnd } = this.calculateLineHeight(rays[x].perpDist);

      let wallHit = rays[x].side == "x" ? 
          rays[x].rayDirection.y * rays[x].perpDist - gameState.player.position.y :
          rays[x].rayDirection.x * rays[x].perpDist + gameState.player.position.x

      wallHit -= Math.floor(wallHit)

      let texX = Math.floor(wallHit * 64);

      if(rays[x].side == "x" && rays[x].rayDirection.x > 0) texX = 64 - texX - 1;
      if(rays[x].side == "y" && rays[x].rayDirection.y > 0) texX = 64 - texX - 1;

      const texStep = 64 / lineHeight;
      let texPos =( lineStart - (this.settings.canvasHeight / 2) + (lineHeight / 2)) * texStep


      for (let y = lineStart; y <= lineEnd; y++) {
        let texY = Math.floor(texPos); // &(64 - 1)
        texY = texY > 64 - 1 ? 63 : texY
        texPos += texStep
        let color = colorsVector[0]
        if(!this.isCellOutOfBounds(rays[x].mapHit)){
          const mapIndex = MAP[rays[x].mapHit.y][rays[x].mapHit.x];
          if(mapIndex <= Color.texture.length){
            const texIndex = (texY* 64 + texX) * 4
            color = [Color.texture[mapIndex - 1][texIndex], Color.texture[mapIndex - 1][texIndex + 1], Color.texture[mapIndex - 1][texIndex + 2]]
          } else {
            color = colorsVector[mapIndex]
          }
        }

        if(rays[x].side == "x"){
          color = [color[0]/2, color[1]/2, color[2]/2] 
        }
        
        this.setPixelBuffer(
          buffer,
          { x, y },
          { r: color[0], g: color[1], b: color[2], a: 255 }
        );
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
}
