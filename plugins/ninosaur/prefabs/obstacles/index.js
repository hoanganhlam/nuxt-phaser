import PrefabGroup from '../../abstract/PrefabGroup';
import Tree from '../obstacles/tree/Tree';

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
  }

  update(time) {
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
    const newObstacle = new Tree(this.scene);
    newObstacle.setCollisionCategory(this.cat)
    newObstacle.parentCat = this.cat
    this.add(newObstacle)
  }

  reset() {
    super.reset();
  }
}

export default Obstacles;
