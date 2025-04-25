import { Enemy } from "@/lib/engine/enemy";
import { ActionsFlags } from "@/lib/engine/inputManager";
import { Player } from "@/lib/engine/player";
import { Settings } from "@/lib/engine/settings";

export class GameState{
  private _player: Player;
  private _enemies: Enemy[];
  private _settings: Settings;

  constructor(player:Player, enemies: Enemy[], settings: Settings){
    this._player = player;
    this._enemies = enemies;
    this._settings = settings;
  }

  execute(keyboardSet: Set<ActionsFlags>, mouseMovement: number){
    this._player.update(keyboardSet, mouseMovement);
    this._enemies.forEach(enemy => {
      enemy.update(keyboardSet, mouseMovement)
    })

    const enemiesPos = this._enemies.map(enemy => {
      return {
        position:{
          x: enemy.position.x,
          y: enemy.position.y
        }
      }
    })

    return {
      game:{
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
