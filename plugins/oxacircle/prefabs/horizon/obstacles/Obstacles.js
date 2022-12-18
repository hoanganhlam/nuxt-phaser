import Phaser from 'phaser';

import CONFIG from '../../../config/game';
import HorizonItems from '../HorizonItems';
import Cactus from './cactus/Cactus';
import Bird from './bird/Bird';

/**
 * Obstacles group
 * @class Obstacles
 * @extends {HorizonItems}
 */
class Obstacles extends HorizonItems {
  static CONFIG = {
    TYPES: CONFIG.SCENES.GAME.GAME.OBSTACLES.TYPES,
    MAX_DUPLICATION: CONFIG.SCENES.GAME.GAME.OBSTACLES.SPAWN.MAX_DUPLICATION,
    GAP: CONFIG.SCENES.GAME.GAME.OBSTACLES.GAP,
  };

  /**
   * Creates an instance of Obstacles
   * @param {Phaser.Scene} scene - The Scene to which this Obstacles group belongs
   * @override
   */
  constructor(scene) {
    super(scene);
    this.cat = scene.matter.world.nextCategory()
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
        this.spawnItem(0, false)
        this.spawnItem(0, false)
        this.spawnItem(0, false)
      }
    );
  }

  /**
   * Check if next obstacle is duplicate
   * @param {Obstacle} nextObstacle - next obstacle object
   * @param {number} maxDuplication - max duplication count
   * @returns {boolean}
   */
  checkDuplication(nextObstacle, maxDuplication) {
    return false
  }

  /**
   * Spawn obstacle
   * @param {number} speed - Current game speed
   * @param {boolean} isMobile - Whether game is running in mobile mode
   */
  spawnItem(speed, isMobile) {
    const { MAX_DUPLICATION } = Obstacles.CONFIG;
    const { BIRD, CACTUS } = Obstacles.CONFIG.TYPES;

    let obstacleType;
    if (speed > BIRD.SPAWN.SPEED.MIN) {
      obstacleType = Phaser.Math.RND.pick([BIRD, CACTUS.SMALL, CACTUS.LARGE]);
    } else {
      obstacleType = Phaser.Math.RND.pick([CACTUS.SMALL, CACTUS.LARGE]);
    }

    if (this.checkDuplication(obstacleType, MAX_DUPLICATION)) {
      this.spawnItem(speed, isMobile);
    } else {
      if (obstacleType === BIRD) {
        this.spawnBird(speed, isMobile);
      } else {
        let cactusSize = 1;
        const cactusSizingSpeed = !isMobile
          ? obstacleType.SIZING.SPEED.MIN
          : obstacleType.SIZING.SPEED.MIN_MOBILE;
        if (speed > cactusSizingSpeed) {
          cactusSize = Phaser.Math.RND.pick(CONFIG.PREFABS.OBSTACLES.CACTUS.SIZES);
        }
        this.spawnCactus(speed, isMobile, `${obstacleType.FRAME}-${cactusSize}`);
      }
    }
  }

  /**
   * Spawn bird obstacle
   * @param {number} speed - Current game speed
   * @param {boolean} isMobile - Whether game is running in mobile mode
   */
  spawnBird(speed, isMobile) {
    const { width } = this.scene.scale.gameSize;
    const { BIRD } = CONFIG.PREFABS.OBSTACLES;
    const y = !isMobile
      ? Phaser.Math.RND.pick(BIRD.POS.Y)
      : Phaser.Math.RND.pick(BIRD.POS.Y_MOBILE);
    const newObstacle = new Bird(this.scene, width, y);
    newObstacle.setCollisionCategory(this.cat)
    newObstacle.parentCat = this.cat
    this.add(newObstacle)
  }

  /**
   * Spawn cactus obstacle
   * @param {number} speed - Current game speed
   * @param {boolean} isMobile - Whether game is running in mobile mode
   * @param {string} frame - Frame to display cactus obstacle
   */
  spawnCactus(speed, isMobile, frame) {
    const { width } = this.scene.scale.gameSize;
    const { CACTUS } = CONFIG.PREFABS.OBSTACLES;
    const newObstacle = new Cactus(this.scene, width, CACTUS.POS.Y, frame);
    newObstacle.setCollisionCategory(this.cat)
    newObstacle.parentCat = this.cat
    this.add(newObstacle)
  }

  reset() {
    super.reset();
  }
}

export default Obstacles;
