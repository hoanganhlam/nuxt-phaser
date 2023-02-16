import Phaser from 'phaser';
import Obstacle from '../../../abstract/Obstacle';
import AnimationManager from './AnimationManager';

/**
 * Tree obstacle
 * @class Bird
 * @extends {Obstacle}
 */
class Bird extends Obstacle {
  /**
   * Creates an instance of Tree
   * @param {Phaser.Scene} scene - The Scene to which this Tree belongs
   * @param {object} options - The Scene to which this Tree belongs
   * @override
   */
  constructor(scene, options) {
    super(scene, options.x, options.y, 6, options);
    this.scene = scene
    this.animationManager = new AnimationManager(this);

    let xx = options.x, yy = options.y;
    switch (options.position) {
      case 0:
        yy = options.y - 50
        break
      case 1:
        xx = options.x + 50
        break
      case 2:
        yy = options.y + 50
        break
      case 3:
        xx = options.x - 50
        break
    }

    this.path = {t: 0, vec: new Phaser.Math.Vector2()};
    this.curve = new Phaser.Curves.Line(
      new Phaser.Math.Vector2(options.x, options.y),
      new Phaser.Math.Vector2(xx, yy)
    );

    this.scene.tweens.add({
      targets: this.path,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 2000,
      yoyo: true,
      repeat: -1
    });
  }

  update(speed) {
    super.update(speed);
    this.animationManager.update();
    this.curve.getPoint(this.path.t, this.path.vec);
    this.setPosition(this.path.vec.x, this.path.vec.y)
  }

  freeze() {
    super.freeze();
  }
}

export default Bird;
