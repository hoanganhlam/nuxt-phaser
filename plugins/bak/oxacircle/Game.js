import Phaser from 'phaser';

import CONFIG from './config/game';
import BootScene from './scenes/boot/BootScene';
import GameScene from './scenes/game/GameScene';

/**
 * Game
 * @class Game
 * @extends {Phaser.Game}
 */
class Game extends Phaser.Game {
  static CONFIG = CONFIG.GAME;

  /**
   * Creates an instance of Game
   * @param {Phaser.Types.Core.GameConfig} config - Game config
   */
  constructor(config) {
    super(config);

    this.registerResizeHandler();
    this.addScenes();
    this.startScene();
  }

  /**
   * Add scenes to game
   */
  addScenes() {
    this.scene.add(BootScene.CONFIG.NAME, BootScene);
    this.scene.add(GameScene.CONFIG.NAME, GameScene);
  }

  /**
   * Start scene
   */
  startScene() {
    this.scene.start(BootScene.CONFIG.NAME);
  }

  /**
   * Register resize handler
   */
  registerResizeHandler() {
    this.scale.on('resize', () => {

    });
  }

  /**
   * Resize game
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resize(parentSize) {

  }
}

export default Game;
