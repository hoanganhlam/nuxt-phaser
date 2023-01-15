import Phaser from 'phaser';
import GAME_CONFIG from '../../../config';
import CONFIG from '../../../config/game';
import Obstacle from '../../../abstract/Obstacle';
import AnimationManager from './AnimationManager';

/**
 * Tree obstacle
 * @class Tree
 * @extends {Obstacle}
 */
class Tree extends Obstacle {
  static CONFIG = CONFIG.PREFABS.OBSTACLES.BIRD;

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

    let x = min, y = min, r = 1;

    const t = Phaser.Math.RND.between(min, max)
    const p = Phaser.Math.RND.pick([0, 1, 2, 3])
    switch (p) {
      case 0:
        x = t
        y = min - height / 2
        r = 0
        break
      case 1:
        x = max + height / 2
        y = t
        r = 1
        break
      case 2:
        x = t
        y = max + height / 2
        r = 2
        break
      case 3:
        x = min - height / 2
        y = t
        r = -1
        break
    }
    super(scene, x, y, 3);
    this.displayWidth = width
    this.displayHeight = height
    this.setAngle(r * 90)
    this.setOrigin(0.5, 0.5)
    this.scene = scene
    this.animationManager = new AnimationManager(this);
  }

  update(speed) {
    super.update(speed);
    this.animationManager.update();
  }

  freeze() {
    super.freeze();
  }
}

export default Tree;
