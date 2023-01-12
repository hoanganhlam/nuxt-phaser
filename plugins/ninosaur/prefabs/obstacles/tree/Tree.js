import Phaser from 'phaser';

import CONFIG from '../../../config/game';
import Obstacle from '../../../abstract/Obstacle';

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
    const rate = {
      "tree_tree": 119 / 111, "tree_palm": 79 / 176, "tree_pine":  82 / 130
    }
    const frame = Phaser.Math.RND.pick(["tree_tree", "tree_palm", "tree_pine"])
    const width = 36
    const height = width / rate[frame]
    const min = 680 * 0.25
    const max = 680 * 0.75
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
    super(scene, x, y, frame);
    this.displayWidth = width
    this.displayHeight = height
    this.setAngle(r * 90)
    this.setOrigin(0.5, 0.5)
  }

  update(speed) {
    super.update(speed);
  }

  freeze() {
    super.freeze();
  }
}

export default Tree;
