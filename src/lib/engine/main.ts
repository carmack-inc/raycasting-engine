import {
  deregisterKeyboardInput,
  registerKeyboardInput,
  registerMouseInput,
  rotate,
  walk,
} from "./input"
import { drawMinimap } from "./minimap"
import { paintLine } from "./paint"
import { calculteLineHeight, findPerpendicularDistance } from "./raycasting"
import { CANVAS_WIDTH, colors, MAP } from "./settings"
import { getPerpVec, Vec2 } from "./vec2"

export const pos = { x: 3, y: 9 };
export const direction = { x: 1, y: 0 };

const euclidianDistArray: Vec2[] = [];

let currentTime = Date.now();
let timeAccumulator = 0;
const FPS = 60;
const timePerFrame = 1000 / FPS;

export function start(canvas: HTMLCanvasElement) {
  // canvas.width = CANVAS_WIDTH;
  // canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.addEventListener("click", async () => {
    if (!document.pointerLockElement) {
      try {
        await canvas.requestPointerLock({
          unadjustedMovement: true,
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "NotSupportedError") {
            await canvas.requestPointerLock();
          } else {
            throw error;
          }
        }
      }
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    registerMouseInput(event.movementX);
  });

  document.addEventListener("keydown", (event) => {
    registerKeyboardInput(event.key);
  });

  document.addEventListener("keyup", (event) => {
    deregisterKeyboardInput(event.key);
  });
  window.requestAnimationFrame(gameLoop.bind(ctx));
}

function gameLoop(this: CanvasRenderingContext2D, newCurrentTime: number) {
  const frameTime = newCurrentTime - currentTime;

  currentTime = newCurrentTime;
  if (frameTime > 0) timeAccumulator += frameTime;

  while (timeAccumulator >= timePerFrame) {
    //console.log((1 / frameTime) * 1000);
    walk(pos, direction);
    rotate(direction);
    timeAccumulator -= timePerFrame;
  }
  drawScene(this);
  window.requestAnimationFrame(gameLoop.bind(this));
}

function drawScene(ctx: CanvasRenderingContext2D) {
  // reset Array
  euclidianDistArray.length = 0;
  const rayDir = { x: direction.x, y: direction.y };
  const perpRayDir = getPerpVec(rayDir);
  ctx.reset();

  for (let i = 0; i < CANVAS_WIDTH; i++) {
    const offsetXViewport = 1 - (2 * i) / CANVAS_WIDTH;

    const rayDirection = {
      x: perpRayDir.x * offsetXViewport + rayDir.x,
      y: perpRayDir.y * offsetXViewport + rayDir.y,
    };

    const { perpDist, mapHit } = findPerpendicularDistance({
      initialPos: pos,
      rayDirection,
    });

    const euclidianDist = {
      x: rayDirection.x * perpDist,
      y: rayDirection.y * perpDist,
    };

    euclidianDistArray.push(euclidianDist);

    const { lineStart, lineEnd } = calculteLineHeight(i, perpDist);

    paintLine(lineStart, lineEnd, colors[MAP[mapHit.y][mapHit.x]], ctx);
  }
  drawMinimap(euclidianDistArray, ctx);
}

// function hitFunction(mapPos: Vec2) {
//   if (MAP[mapPos.y][mapPos.x] > 0) return true;
//   return false;
// }
