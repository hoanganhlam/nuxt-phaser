import PrefabGroup from '../../abstract/PrefabGroup';
import Tree from '../obstacles/tree/Tree';
import Bird from '../obstacles/bird/Bird';
import Phaser from "phaser";

/**
 * Obstacles group
 * @class Obstacles
 * @extends {HorizonItems}
 */
class Obstacles extends PrefabGroup {

  /**
   * Creates an instance of Obstacles
   * @param {Phaser.Scene} scene - The Scene to which this Obstacles group belongs
   * @override
   */
  constructor(scene) {
    super(scene);
    this.cat = scene.matter.world.nextCategory()
    this.spawn()
    this.time = 0
  }

  update(time) {
    this.time = this.time + 1
    if (this.time === 400) {
      this.spawn()
      this.time = 0
    }
    this.children.each(item => {
      item.update()
    })
  }

  spawn() {
    this.scene.time.delayedCall(2000, () => {
        this.spawnItem()
        this.spawnItem()
        this.spawnItem()
      }
    );
  }

  spawnItem() {
    let newObstacle;
    const index = Phaser.Math.RND.pick([0, 1])
    if (index === 0) {
      newObstacle = new Bird(this.scene);
    } else {
      newObstacle = new Tree(this.scene);
    }
    newObstacle.setCollisionCategory(this.cat)
    this.add(newObstacle)
  }

  reset() {
    super.reset();
  }
}

export default Obstacles;
