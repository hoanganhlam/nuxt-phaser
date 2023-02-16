import PrefabGroup from '../../abstract/PrefabGroup';
import Tree from './tree/Tree';
import Bird from './bird/Bird';

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
  }

  update(time) {
    this.children.each(item => {
      item.update()
    })
  }

  spawn(data) {
    this.scene.time.delayedCall(2000, () => {
        const now = new Date().getTime();
        data.forEach(item => {
          if (now < item.time_end) {
            this.spawnItem(item)
          }
        })
      }
    );
  }

  spawnItem(data) {
    let newObstacle;
    if (data.type === 0) {
      newObstacle = new Bird(this.scene, data);
    } else {
      newObstacle = new Tree(this.scene, data);
    }
    this.add(newObstacle)
  }

  reset() {
    super.reset();
  }
}

export default Obstacles;
