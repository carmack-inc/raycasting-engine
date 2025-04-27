import { Enemy, TextureType } from "./enemy";
import { ActionsFlags } from "./inputManager";
import { Player } from "./player";
import { Vec2 } from "./vector";

type State = "running" | "lose" | "win";
export type EnemyType = {
  position: Vec2,
  texture: TextureType,
}
export type GameState = {
  game:{
    state: State,
  },
  player: {
    position: Vec2,
    direction: Vec2,
  },
  enemies: EnemyType[]
  goals: Vec2[];
}

export class GameModal{
  private _player: Player;
  private _enemies: Enemy[];
  private _goals: Vec2[];
  private _state: GameState;
  public get state(): GameState {
    return this._state;
  }

  constructor(player:Player, enemies: Enemy[], goals: Vec2[]){
    this._player = player;
    this._enemies = enemies;
    this._goals = goals;
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
    let state: State = "running"
    const enemiesPos = this._enemies.map(enemy => {
      return {
        position:{
          x: enemy.position.x,
          y: enemy.position.y
        },
        texture: enemy.texture
      }
    })

    const goalsPos = this._goals.map(goal => {
      return {
          x: goal.x,
          y: goal.y
      }
    })

    this._enemies.forEach(enemy => {
      if(Math.floor(enemy.position.x) == Math.floor(this._player.position.x) &&
         Math.floor(enemy.position.y) == Math.floor(this._player.position.y)){
          state = "lose";
         }
    })

    this._goals.forEach(goal => {
      if(Math.floor(goal.x) == Math.floor(this._player.position.x) &&
      Math.floor(goal.y) == Math.floor(this._player.position.y)){
       state = "win";
      }
    })

    return {
      game:{
        state: state
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
      enemies: enemiesPos,
      goals: goalsPos
    }
  
  }
  


}
