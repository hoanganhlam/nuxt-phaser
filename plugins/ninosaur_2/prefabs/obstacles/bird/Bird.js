import Phaser from 'phaser';
import GAME_CONFIG from '../../../config';
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
   * @override
   */
  constructor(scene) {
    const width = 24
    const height = 24
    const min = GAME_CONFIG.scale.width * 3 / 20
    const max = GAME_CONFIG.scale.width * 17 / 20

    const t = Phaser.Math.RND.between(min, max)
    let x = t, y = t, r = 1, xx = t, yy = t;
    const p = Phaser.Math.RND.pick([0, 1, 2, 3])
    switch (p) {
      case 0:
        x = t
        y = min - height / 2
        yy = y - 50
        r = 0
        break
      case 1:
        x = max + height / 2
        y = t
        xx = x + 50
        r = 1
        break
      case 2:
        x = t
        y = max + height / 2
        yy = y + 50
        r = 2
        break
      case 3:
        x = min - height / 2
        y = t
        xx = x - 50
        r = -1
        break
    }
    super(scene, x, y, 6);

    this.animationManager = new AnimationManager(this);
    this.path = { t: 0, vec: new Phaser.Math.Vector2() };
    this.curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(x, y), new Phaser.Math.Vector2(xx, yy));

    scene.tweens.add({
      targets: this.path,
      t: 1,
      ease: 'Sine.easeInOut',
      duration: 2000,
      yoyo: true,
      repeat: -1
    });

    this.displayWidth = width
    this.displayHeight = height
    this.setAngle(r * 90)
    this.setOrigin(0.5, 0.5)
    this.scene = scene
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
