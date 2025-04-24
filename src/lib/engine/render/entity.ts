import { Player } from "@/lib/engine/player";
import { RayInfo } from "@/lib/engine/raycast";
import { Renderable } from "@/lib/engine/render/renderable";
import { Settings } from "@/lib/engine/settings";
import { Vec2, Vector } from "@/lib/engine/vector";

export class Entity extends Renderable{
  private position: Vec2 ;

  constructor(settings: Settings){
    super(settings);
    this.position = {x: 10 , y: 9};
  }
  render(player: Player, rays: RayInfo[], buffer: number[]): void {
    const spritePos = {
      x:this.position.x - player.position.x,
      y:this.position.y - player.position.y,
    }
    const plane = Vector.findPerpVector(player.direction)
    //  plane.x = -plane.x
    const invDet = 1 / ((-plane.x) * (-player.direction.y) - player.direction.x * plane.y); 
    const transform = {
        x: invDet * ((-player.direction.y) * spritePos.x - player.direction.x * spritePos.y),
        y: invDet * (-plane.y * spritePos.x + (-plane.x) * spritePos.y)
    }


    if(transform.y == 0) return;

    const spriteScreenX = Math.floor((this.settings.canvasWidth / 2) * (1 + transform.x / transform.y))


    const spriteHeight = Math.abs(Math.floor(this.settings.canvasHeight / (transform.y))); 
    let drawStartY = -spriteHeight / 2 + this.settings.canvasHeight  / 2;
    if(drawStartY < 0) drawStartY = 0;
    let drawEndY = spriteHeight / 2 + this.settings.canvasHeight  / 2;
    if(drawEndY >= this.settings.canvasHeight) drawEndY = this.settings.canvasHeight - 1;


    const spriteWidth = Math.abs(Math.floor(this.settings.canvasHeight / (transform.y))); 
    let drawStartX = -spriteWidth / 2 + spriteScreenX;
    if(drawStartX < 0) drawStartX = 0;
    let drawEndX = spriteWidth / 2 + spriteScreenX;
    if(drawEndX >= this.settings.canvasWidth) drawEndX = this.settings.canvasWidth - 1;

    drawStartX = Math.floor(drawStartX)
    drawStartY = Math.floor(drawStartY)
    drawEndX = Math.floor(drawEndX)
    drawEndX = Math.floor(drawEndX)

    for(let x = drawStartX; x < drawEndX; x++)
      {
        if(transform.y > 0 && 
          x > 0 &&
          x < this.settings.canvasWidth &&
          transform.y < rays[x].perpDist)
        for(let y = drawStartY; y < drawEndY; y++) //for every pixel of the current stripe
        {
          this.setPixelBuffer(buffer, {x, y},{r:255 ,g:0 ,b:255,a:255})
        }
      }
  }



}


// [ -dirY      -dirX ]
// [                 ]
// [ planeY  planeX ]

// (planeX*-dirY-dirX*-planeY)

