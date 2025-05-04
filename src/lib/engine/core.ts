import { GameModal } from "./logic/gameModal";
import { InputManager } from "./controllers/inputManager";
import { Renderer } from "./render/renderer";

export class Core {
  private _input: InputManager;
  private _renderer: Renderer;
  private _gameModal: GameModal;
  private _currentTime: number;
  private _timeAccumulator: number;
  private _stopLoop: boolean;
  private readonly FPS = 60;
  private readonly timePerFrame = 1000 / this.FPS;
  constructor(gameModal: GameModal, input: InputManager, renderer: Renderer) {
    this._input = input;
    this._renderer = renderer;
    this._gameModal = gameModal
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
    if(this._gameModal.state.game.state == "lose") return;
    if(this._gameModal.state.game.state == "win") return;
    if (this._stopLoop) return;
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  
}
