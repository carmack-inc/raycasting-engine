
import { GameModal } from "@/lib/engine/gameModal";
import { InputManager } from "./inputManager";
import { Player } from "./player";
import { Renderer } from "./render/renderer";
import { Enemy } from "@/lib/engine/enemy";

export class Core {
  private _player: Player;
  private _input: InputManager;
  private _renderer: Renderer;
  private _gameModal: GameModal;
  private _currentTime: number;
  private _timeAccumulator: number;
  private _stopLoop: boolean;
  private readonly FPS = 60;
  private readonly timePerFrame = 1000 / this.FPS;
  constructor(player: Player, enemies: Enemy[], input: InputManager, renderer: Renderer) {
    this._player = player;
    this._input = input;
    this._renderer = renderer;
    this._gameModal = new GameModal(player, enemies);
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
      this._gameModal.update(keyboardSet, mouseMovement);
      this._timeAccumulator -= this.timePerFrame;
    }
    this._renderer.render(this._gameModal.state);
    if (this._stopLoop) return;
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  
}
