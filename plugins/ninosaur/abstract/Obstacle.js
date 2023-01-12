import Phaser from 'phaser';

import CONFIG from '../config/game';

/**
 * Obstacle
 * @class Obstacle
 * @extends {Phaser.Physics.Arcade.Sprite}
 */
class Obstacle extends Phaser.Physics.Matter.Sprite {
  /**
   * Creates an instance of Obstacle
   * @param {Phaser.Scene} scene - The Scene to which this Obstacle belongs
   * @param {number} x - The horizontal position of this Obstacle in the world
   * @param {number} y - The vertical position of this Obstacle in the world
   * @param {string} frame - The frame from the Texture this Obstacle is rendering with
   */
  constructor(scene, x, y, frame) {
    super(scene.matter.world, x, y, frame);
    this.timeout = 400
    this.setOrigin(0, 0)
    this.scene = scene
    this.scene.events.on(CONFIG.EVENTS.GAME_OVER, this.freeze, this);
    this.scene.add.existing(this);
    this.scene.tweens.add({
      targets: this,
      alpha: { value: 1, duration: 2000, ease: 'Power1' },
    });
    this.setAlpha(0)
    this.setStatic(true)
  }

  /**
   * Freeze obstacle
   */
  freeze() {
    this.scene.events.off(CONFIG.EVENTS.GAME_OVER, this.freeze);
  }

  /**
   * Kill obstacle
   */
  die() {
    this.freeze()
    this.destroy();
  }

  /**
   * Reset obstacle
   */
  reset() {
    this.die();
  }
}

export default Obstacle;
