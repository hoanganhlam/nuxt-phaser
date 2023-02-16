import Phaser from 'phaser';

import CONFIG from '../../config/game';
import GameScene from '../game/GameScene';

/**
 * Boot game scene
 * @class BootScene
 * @extends {Phaser.Scene}
 */
class BootScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.BOOT;

  /**
   * Creates an instance of BootScene
   */
  constructor() {
    super(BootScene.CONFIG.NAME);
  }

  preload() {
    this.load.atlas('dino', '/dino/sprites/dino-atlas.png', '/dino/sprites/dino-atlas.json');

    this.load.bitmapFont(
      'joystix',
      '/dino/fonts/joystix_monospace.png',
      '/dino/fonts/joystix_monospace.fnt',
    );

    this.load.audio('player-action', '/dino/sounds/player-action.mp3');
    this.load.audio('achievement', '/dino/sounds/achievement.mp3');
    this.load.audio('gameover', '/dino/sounds/gameover.mp3');
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
