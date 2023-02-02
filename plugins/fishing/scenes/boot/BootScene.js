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
    this.load.spritesheet("sprWater", "/fishing/sprWater.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprSand", "/fishing/sprSand.png");
    this.load.image("sprGrass", "/fishing/sprGrass.png");
    this.load.tilemapTiledJSON('fishing_map', '/fishing/map.json');
    this.load.image('fishing_tiles', '/fishing/tiles.png');
    this.load.spritesheet('ship_tiles', '/fishing/ships.png', {frameWidth: 32, frameHeight: 32, spacing: 1});
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
