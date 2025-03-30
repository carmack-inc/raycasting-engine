import {
  CANVAS_WIDTH,
  DOWN_KEY,
  LEFT_KEY,
  MAP,
  RIGHT_KEY,
  ROTATE_SPEED,
  UP_KEY,
  WALK_SPEED,
} from "./settings";
import { getPerpVec, normalizeVector, Vec2 } from "./vec2";

const availableKeys = [UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY];
const keySet = new Set();
let moveVector = { x: 0, y: 0 };
let mouseOffsetX = 0;

export function registerKeyboardInput(key: string) {
  key = key.toUpperCase();
  if (availableKeys.includes(key)) keySet.add(key);
}

export function deregisterKeyboardInput(key: string) {
  key = key.toUpperCase();
  keySet.delete(key);
}

export function registerMouseInput(mouseMovementX: number) {
  mouseOffsetX = mouseMovementX;
}

export function walk(pos: Vec2, direction: Vec2) {
  generateMoveVector(direction);
  // if (
  //   MAP[Math.floor(pos.x + moveVector.x * WALK_SPEED)][Math.floor(pos.y)] == 0
  // )
  //   pos.x += moveVector.x * WALK_SPEED;

  // if (
  //   MAP[Math.floor(pos.x)][Math.floor(pos.y + moveVector.y * WALK_SPEED)] == 0
  // )
  //   pos.y += moveVector.y * WALK_SPEED;

  if (
    MAP[Math.floor(pos.y)][Math.floor(pos.x + moveVector.x * WALK_SPEED)] == 0
  )
    pos.x += moveVector.x * WALK_SPEED;

  if (
    MAP[Math.floor(pos.y - moveVector.y * WALK_SPEED)][Math.floor(pos.x)] == 0
  )
    pos.y -= moveVector.y * WALK_SPEED; // NEGATIVE Y AXIS IN CANVAS
}
export function rotate(direction: Vec2) {
  const oldDir = { x: direction.x, y: direction.y };
  const rotateAngle = -(mouseOffsetX / CANVAS_WIDTH) * ROTATE_SPEED;

  direction.x =
    direction.x * Math.cos(rotateAngle) - direction.y * Math.sin(rotateAngle);
  // direction.y =
  //   direction.y * Math.cos(-rotateAngle) - direction.x * Math.sin(-rotateAngle);

  direction.y =
    oldDir.x * Math.sin(rotateAngle) + direction.y * Math.cos(rotateAngle);

  // direction.x =
  //   oldDir.y * Math.sin(-rotateAngle) + direction.x * Math.cos(-rotateAngle);

  mouseOffsetX = 0;
}

function generateMoveVector(direction: Vec2) {
  if (keySet.size == 0) {
    moveVector.x = 0;
    moveVector.y = 0;
    return;
  }
  if (keySet.has(UP_KEY)) {
    moveVector.x += direction.x;
    moveVector.y += direction.y;
  }

  if (keySet.has(DOWN_KEY)) {
    moveVector.x -= direction.x;
    moveVector.y -= direction.y;
  }

  const perpDirVector = getPerpVec(direction);

  if (keySet.has(RIGHT_KEY)) {
    moveVector.x -= perpDirVector.x;
    moveVector.y -= perpDirVector.y;
  }

  if (keySet.has(LEFT_KEY)) {
    moveVector.x += perpDirVector.x;
    moveVector.y += perpDirVector.y;
  }

  moveVector = normalizeVector(moveVector);
}
