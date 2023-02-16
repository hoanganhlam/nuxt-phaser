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
   * @param {object} options - The Scene to which this Tree belongs
   * @override
   */
  constructor(scene, options) {
    super(scene, options.x, options.y, 3, options);
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
