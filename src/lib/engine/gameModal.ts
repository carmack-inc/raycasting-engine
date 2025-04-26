import { Enemy, TextureType } from "./enemy";
import { ActionsFlags } from "./inputManager";
import { Player } from "./player";
import { Vec2 } from "./vector";


export type EnemyType = {
  position: Vec2,
  texture: TextureType,
}
export type GameState = {
  game:{
    state: "running" | "lose" | "win";
  },
  player: {
    position: Vec2,
    direction: Vec2,
  },
  enemies: EnemyType[]
}

export class GameModal{
  private _player: Player;
  private _enemies: Enemy[];
  private _state: GameState;
  public get state(): GameState {
    return this._state;
  }

  constructor(player:Player, enemies: Enemy[]){
    this._player = player;
    this._enemies = enemies;
    this._state = this.createState();

  }

  update(keyboardSet: Set<ActionsFlags>, mouseMovement: number): void{
    this._player.update(keyboardSet, mouseMovement);
    this._enemies.forEach(enemy => {
      enemy.update(this._player.position)
    })
    this._state = this.createState();
  }

  createState(): GameState{
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
