import Phaser from 'phaser';

/**
 * Cloud
 * @class Cloud
 * @extends {Phaser.GameObjects.Image}
 */
class Cloud extends Phaser.GameObjects.Image {
  /**
   * Creates an instance of Cloud
   * @param {Phaser.Scene} scene - The Scene to which this Cloud belongs
   * @param {number} x - The horizontal position of this Cloud in the world
   * @param {number} y - The vertical position of this Cloud in the world
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'dino', 'cloud');
    this.speed = Phaser.Math.FloatBetween(-0.0005, 0.0005);
    this.setOrigin(0.5, 0.5);
    this.setDepth(300);
    const angleDeg = Math.atan2(this.y - 400, this.x - 400) * 180 / Math.PI;
    this.angle = angleDeg + 90
    this.scene.add.existing(this);
  }

  update(speed) {
    Phaser.Actions.RotateAroundDistance([this], { x: 400, y: 400 }, this.speed, 370)
    const angleDeg = Math.atan2(this.y - 400, this.x - 400) * 180 / Math.PI;
    this.angle = angleDeg + 90
  }
}

export default Cloud;
