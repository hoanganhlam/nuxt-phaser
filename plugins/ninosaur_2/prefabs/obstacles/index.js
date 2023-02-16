import PrefabGroup from '../../abstract/PrefabGroup';
import Tree from '../obstacles/tree/Tree';
import Bird from '../obstacles/bird/Bird';

function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min) + min);
}

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
    this.time = 0;
  }

  update(time) {
    this.time ++
    this.children.each(item => {
      item.update()
    })
    if (this.time > 300) {
      this.time = 0
      this.spawn()
    }
  }

  spawn() {
    const data = []
    for (let i = 0; i < 3; i++) {
      const type = getRandomInt(0, 1)
      const gameWidth = 500
      const width = 24
      const height = 24
      const min = gameWidth * 3 / 20
      const max = gameWidth * 17 / 20

      let x = min, y = min, r = 1;

      const t = getRandomInt(min, max)
      const p = getRandomInt(0, 3)
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
      const now = new Date()
      data.push({
        type: type,
        width: width,
        height: height,
        position: p,
        radian: r,
        x: x,
        y: y,
        time_start: now.getTime() + 3000,
        time_end: now.getTime() + 6000
      })
    }
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
