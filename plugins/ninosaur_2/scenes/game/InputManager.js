import CONFIG from '../../config/game';

/**
 * Game input manager
 * @class InputManager
 */
class InputManager {
  /**
   * InputManager
   * @static
   */
  static CONFIG = CONFIG.SCENES.GAME;

  /**
   * Creates an instance of InputManager
   * @param {Phaser.Scene} scene - The Scene to which this InputManager belongs
   */
  constructor(scene) {
    this.scene = scene;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // Register event handlers
    scene.events.on(CONFIG.EVENTS.GAME_OVER, this.onGameOver, this);
  }

  /**
   * Update inputManager
   */
  update() {
    const { scene } = this;
  }

  /**
   * Handle gameover
   */
  onGameOver() {
    const { scene } = this;
    scene.time.delayedCall(InputManager.CONFIG.RESTART.COOL_DOWN, () => {
      scene.input.keyboard.resetKeys();
    });
  }
}

export default InputManager;
