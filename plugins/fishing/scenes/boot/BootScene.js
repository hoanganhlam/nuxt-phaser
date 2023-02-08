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

    this.load.spritesheet("sprWater", "sprWater.png", {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('ship_tiles', 'ships.png', {frameWidth: 32, frameHeight: 32, spacing: 1});

    this.load.image('fishing_tiles', 'tiles_packed.png');
    this.load.image('tilex', 'tilex.png');
    this.load.image('tiley', 'tiley.png');
    this.load.image('tiles', 'tiles.png');
    this.load.image('ship', 'ship.png');
    this.load.image('boat', 'boat.png');

    this.load.tilemapTiledJSON('fishing_map', 'map.json');
    this.load.tilemapTiledJSON('map4', 'map4.json');
    this.load.tilemapTiledJSON('map5', 'map5.json');
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
