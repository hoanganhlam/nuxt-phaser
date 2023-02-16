import CONFIG from '../../../config/game';

/**
 * Tree animation manager
 * @class AnimationManager
 */
class AnimationManager {
  static CONFIG = CONFIG.PREFABS.OBSTACLES.BIRD;

  /**
   * Creates an instance of AnimationManager
   * @param {Tree} tree - The Bird to which this AnimationManager belongs
   */
  constructor(tree) {
    this.tree = tree;
    const {scene} = this.tree;
    scene.anims.create({
      key: 'tree_idle',
      frames: scene.anims.generateFrameNumbers('nino-obstacles', {
        frames: [3, 4, 5],
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  update() {
    this.tree.anims.play('tree_idle', true);
  }

  stop() {
    this.tree.anims.stop();
  }
}

export default AnimationManager;
