import { Vec2 } from "../utils/vector";
import { Settings } from "../configuration/settings";

export class Collision{
  private _settings: Settings;
  constructor(settings: Settings){
    this._settings = settings;
  }

  check(position: Vec2, direction: Vec2, speed: number): Vec2{
    const newPosition = {x: position.x, y: position.y};
    const movementMapX = Math.floor(position.x + direction.x * speed)
    const movementMapY = Math.floor(position.y - direction.y * speed)
    // NEGATIVE Y AXIS IN CANVAS
    if(movementMapX >= 0 && movementMapX < this._settings.map[0].length){
      if (this._settings.map[Math.floor(position.y)][movementMapX] == 0){
        newPosition.x = (direction.x * speed) + position.x;
      }
    }

    if(movementMapY >= 0 && movementMapY < this._settings.map.length){
      if (this._settings.map[movementMapY][Math.floor(position.x)] == 0){
        newPosition.y = (direction.y * speed) + position.y;
      }
    }

    return newPosition;
  }
}
