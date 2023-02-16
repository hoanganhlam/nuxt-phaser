import Phaser from 'phaser';

import CONFIG from '../../config/game';
import GameScene from "@/plugins/bak/oxacircle/scenes/game/GameScene";

// import GameScene from '../game/GameScene';

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
    this.load.tilemapTiledJSON('ninosaur', '/ninosaur_2/map.json');
    this.load.image('nino-tileset', '/ninosaur_2/tileset.png');
    this.load.image('nino-background', '/ninosaur_2/background_packed.png');
    this.load.spritesheet('nino-doux', '/ninosaur_2/sprite/doux.png', {frameWidth: 24, frameHeight: 24});
    this.load.spritesheet('nino-obstacles', '/ninosaur_2/characters.png', {frameWidth: 24, frameHeight: 24});

    this.load.audio('player-action', '/dino/sounds/player-action.mp3');
    this.load.audio('achievement', '/dino/sounds/achievement.mp3');
    this.load.audio('gameover', '/dino/sounds/gameover.mp3');
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
