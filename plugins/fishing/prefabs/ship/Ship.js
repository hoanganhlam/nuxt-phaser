import Phaser from 'phaser';
import GAME_CONFIG from '../../config';
import CONFIG from '../../config/game';

class Ship extends Phaser.Physics.Matter.Sprite {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  constructor(scene, raw, x = Ship.CONFIG.POS.INITIAL_X, y = Ship.CONFIG.POS.Y) {
    super(scene.matter.world, x, y, 'ship_tiles', 1, {label: 'ship'});
    this.scene = scene;
    this.graphics = scene.graphics;
    this.setMass(30);
    this.setFriction(0.5);
    this.setFixedRotation();
    this.setOrigin(0.5);
    scene.add.existing(this);
  }

  /**
   * Update player
   */
  update(time) {

  }
}

export default Ship;
