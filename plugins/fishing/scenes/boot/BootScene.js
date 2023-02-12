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
    this.load.path = '/fishing/';
    this.load.spritesheet('ship_tiles', 'ships.png', {frameWidth: 32, frameHeight: 32, spacing: 1});

    this.load.image('boat', 'boat.png');
    this.load.image('tiles', 'tiles.png');
    this.load.image('tween', 'tween.png');

    this.load.tilemapTiledJSON('map', 'map.json');
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
