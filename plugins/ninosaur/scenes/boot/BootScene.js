import Phaser from 'phaser';

import CONFIG from '../../config/game';
import GameScene from "@/plugins/oxacircle/scenes/game/GameScene";
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
    this.load.tilemapTiledJSON('ninosaur', '/ninosaur/map.json');
    this.load.image('cavesofgallet_tiles', '/ninosaur/cavesofgallet_tiles.png');
    this.load.spritesheet('nino-doux', '/ninosaur/sprite/doux.png', { frameWidth: 24, frameHeight: 24 });

    this.load.audio('player-action', '/dino/sounds/player-action.mp3');
    this.load.audio('achievement', '/dino/sounds/achievement.mp3');
    this.load.audio('gameover', '/dino/sounds/gameover.mp3');
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
