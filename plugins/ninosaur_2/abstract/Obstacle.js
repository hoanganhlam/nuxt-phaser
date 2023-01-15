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
   * @param {number} frame - The frame from the Texture this Obstacle is rendering with
   */
  constructor(scene, x, y, frame) {
    super(scene.matter.world, x, y, 'nino-obstacles', frame);
    this.setOrigin(0, 0)

    this.timeout = 500

    this.scene = scene
    this.scene.add.existing(this);
    this.scene.tweens.add({
      targets: this,
      alpha: { value: 1, duration: 2000, ease: 'Power1' },
    });
    this.setAlpha(0)
    this.setStatic(true)
  }

  update(time) {
    if (this.alpha >= 0.9) {
      this.setCollisionCategory(this.scene.playerCategory)
    } else {
      this.setCollisionCategory(0)
    }
    this.timeout = this.timeout - 1
    if (this.timeout === 0) {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 1000,
        ease: 'Power2'
      }, this);
      const _this = this
      setTimeout(function () {
        _this.die()
      }, 1000)
    }
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
