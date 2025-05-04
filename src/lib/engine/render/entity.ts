import { EnemyType, GameState } from "../logic/gameModal";
import { RayInfo } from "../raycast";
import { Renderable } from "./renderable";
import { Settings } from "../configuration/settings";
import { Vec2, Vector } from "../utils/vector";

export class Entity extends Renderable{
  constructor(settings: Settings){
    super(settings);
  }
  render(gameState: GameState, rays: RayInfo[], buffer: number[]): void {
    
    gameState.enemies.sort((a,b)=>{
      const playerPos = gameState.player.position
      const distA = ((playerPos.x - a.position.x) * (playerPos.x - a.position.x) + (playerPos.y - a.position.y) * (playerPos.y - a.position.y));
      const distB = ((playerPos.x - b.position.x) * (playerPos.x - b.position.x) + (playerPos.y - b.position.y) * (playerPos.y - b.position.y));

      return distB - distA // reverse order
    })
    for(let i = 0; i< gameState.enemies.length; i++){
      this.renderEnemySprite(gameState.enemies[i], gameState, rays, buffer);
    }
  }

  renderEnemySprite(enemy: EnemyType, gameState: GameState, rays: RayInfo[], buffer: number[]){
    const transform = this.worldToCameraTransform(enemy.position, gameState.player.position, gameState.player.direction)

    if(transform.y <= 0) return;

    const spriteWidthCenter = this.calculateCenterOfSprite(transform)
    const height = this.calculateHeight(transform)
    const width = this.calculateWidth(transform, spriteWidthCenter)
    for(let x = width.start; x < width.end; x++){
      if(x > 0 && x < this.settings.canvasWidth &&
        transform.y < rays[x].perpDist)
      for(let y = height.start; y < height.end; y++) 
      {
        if(enemy.texture == "Square"){
          this.setPixelBuffer(buffer, {x, y},{r:255 ,g:0 ,b:255,a:255})
        } else {
          const radius = Math.abs(Math.floor((this.settings.canvasHeight / 2)/ transform.y))
          if(this.isInCircle(x,y, (spriteWidthCenter), ((height.end - height.start) / 2) + height.start, radius)){
            this.setPixelBuffer(buffer, {x, y},{r:0 ,g:255 ,b:255,a:255})
          }
        }
       
      }
    }
  }

  isInCircle(x: number, y: number, xCenter: number, yCenter: number, radius: number){
    const term1 = x - xCenter
    const term2 = y - yCenter
    return (term1 * term1) + (term2 * term2) <= (radius * radius)
  }

  worldToCameraTransform(spritePosition: Vec2, playerPosition: Vec2, playerDirection: Vec2): Vec2{
    const spritePos = {
      x:spritePosition.x - playerPosition.x,
      y:spritePosition.y - playerPosition.y,
    }
    const plane = Vector.findPerpVector(playerDirection)
    const invDet = 1 / ((-plane.x) * (-playerDirection.y) - playerDirection.x * plane.y); 
    return {
        x: invDet * ((-playerDirection.y) * spritePos.x - playerDirection.x * spritePos.y),
        y: invDet * (-plane.y * spritePos.x + (-plane.x) * spritePos.y)
    }
  }

  calculateCenterOfSprite(positionInCamera: Vec2){
    return Math.floor((this.settings.canvasWidth / 2) * (1 + positionInCamera.x / positionInCamera.y))
  }

  calculateHeight(positionInCamera: Vec2): {start: number, end: number}{
    const canvasHeight = this.settings.canvasHeight
    const spriteHeight = Math.abs(Math.floor(canvasHeight / (positionInCamera.y))); 
    const start = -spriteHeight / 2 + canvasHeight / 2;
    const end = spriteHeight / 2 + canvasHeight / 2;

    return{
      start: start < 0 ? 0 : Math.floor(start),
      end: end >= canvasHeight ? canvasHeight - 1 : Math.floor(end) 
    }
  }

  calculateWidth(positionInCamera: Vec2, spriteCenter: number): {start: number, end: number}{
    const canvasHeight = this.settings.canvasHeight
    const canvasWidth = this.settings.canvasWidth
    const spriteWidth = Math.abs(Math.floor(canvasHeight / (positionInCamera.y))); 
    const start = -spriteWidth / 2 + spriteCenter
    const end = spriteWidth / 2 + spriteCenter;

    return{
      start: start < 0 ? 0 : Math.floor(start),
      end: end >= canvasWidth ? canvasWidth - 1 : Math.floor(end) 
    }
  }
}

