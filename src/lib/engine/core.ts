import { GameState, GameStates } from "@/lib/engine/gameState";
import { InputManager } from "./inputManager";
import { Player } from "./player";
import { Renderer } from "./render/renderer";
import { Enemy } from "@/lib/engine/enemy";

export class Core {
  private _player: Player;
  private _input: InputManager;
  private _renderer: Renderer;
  private _gameState: GameState;
  private _actualState: GameStates;
  private _currentTime: number;
  private _timeAccumulator: number;
  private _stopLoop: boolean;
  private readonly FPS = 60;
  private readonly timePerFrame = 1000 / this.FPS;
  constructor(player: Player, enemies: Enemy[], input: InputManager, renderer: Renderer) {
    this._player = player;
    this._input = input;
    this._renderer = renderer;
    this._gameState = new GameState(player, enemies);
    this._actualState = this.createInitialState(enemies);
    this._currentTime = Date.now();
    this._stopLoop = false;
    this._timeAccumulator = 0;
  }
  start() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  stop() {
    this._stopLoop = true;
  }

  private gameLoop(newCurrentTime: number) {
    const frameTime = newCurrentTime - this._currentTime;

    this._currentTime = newCurrentTime;
    if (frameTime > 0) this._timeAccumulator += frameTime;

    while (this._timeAccumulator >= this.timePerFrame) {
      //console.log((1 / frameTime) * 1000);
      const keyboardSet = this._input.getKeyboardSet();
      const mouseMovement = this._input.consumeMouseInput();
      //this._player.update(keyboardSet, mouseMovement);
      this._actualState = this._gameState.update(keyboardSet, mouseMovement);
      this._timeAccumulator -= this.timePerFrame;
    }
    this._renderer.render(this._actualState);
    if (this._stopLoop) return;
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  createInitialState(enemies: Enemy[]): GameStates{
    const enemiesPos = enemies.map(enemy => {
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
