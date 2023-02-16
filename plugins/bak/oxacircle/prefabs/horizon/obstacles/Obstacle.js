import Phaser from 'phaser';

import CONFIG from '../../../config/game';

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
    const radians = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
    x = 400 + 270 * Math.cos(radians);
    y = 400 + 270 * Math.sin(radians);
    super(scene.matter.world, x, y, 'dino', frame);
    const angleDeg = Math.atan2(this.y - 400, this.x - 400) * 180 / Math.PI;
    this.angle = angleDeg + 90
    this.setScale(0.5);
    this.setOrigin(0.5, 0.5);
    this.setDepth(900);
    this.scene.events.on(CONFIG.EVENTS.GAME_OVER, this.freeze, this);
    this.timeout = 400
    this.scene.add.existing(this);
    this.setAlpha(0)
    scene.tweens.add({
      targets: this,
      alpha: { value: 1, duration: 2000, ease: 'Power1' },
    });
    this.scene = scene
    this.setStatic(true)
    this.dying = false
    this.parentCat = 0
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
