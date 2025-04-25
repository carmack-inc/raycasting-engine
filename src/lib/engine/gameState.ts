import { Enemy, TextureType } from "@/lib/engine/enemy";
import { ActionsFlags } from "@/lib/engine/inputManager";
import { Player } from "@/lib/engine/player";
import { Vec2 } from "@/lib/engine/vector";


export type EnemyType = {
  position: Vec2,
  texture: TextureType,
}
export type GameStates = {
  game:{
    state: "running" | "lose" | "win";
  },
  player: {
    position: Vec2,
    direction: Vec2,
  },
  enemies: EnemyType[]
}

export class GameState{
  private _player: Player;
  private _enemies: Enemy[];

  constructor(player:Player, enemies: Enemy[]){
    this._player = player;
    this._enemies = enemies;
  }

  update(keyboardSet: Set<ActionsFlags>, mouseMovement: number): GameStates{
    this._player.update(keyboardSet, mouseMovement);
    this._enemies.forEach(enemy => {
      enemy.update(this._player.position)
    })

    const enemiesPos = this._enemies.map(enemy => {
      return {
        position:{
          x: enemy.position.x,
          y: enemy.position.y
        },
        texture: enemy.texture
      }
    })

    return {
      game: {
        state: "running",
      },
      player:{
        position:{
          x: this._player.position.x,
          y: this._player.position.y
        },
        direction:{
          x: this._player.direction.x,
          y: this._player.direction.y
        }
      },
      enemies: enemiesPos
    }
  }
  


}
