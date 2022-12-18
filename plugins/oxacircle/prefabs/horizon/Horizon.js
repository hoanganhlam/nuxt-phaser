import CONFIG from '../../config/game';

import Ground from './ground/Ground';
import Obstacles from './obstacles/Obstacles';
import Clouds from './clouds/Clouds';
import NightMode from './NightMode';

/**
 * Horizon
 * @class Horizon
 */
class Horizon {
  static CONFIG = {
    OBSTACLES: CONFIG.SCENES.GAME.GAME.OBSTACLES,
    CLOUDS: CONFIG.PREFABS.CLOUD,
  };

  /**
   * Creates an instance of Horizon
   * @param {Phaser.Scene} scene - The Scene to which this Horizon belongs
   */
  constructor(scene) {
    this.scene = scene;
    this.ground = new Ground(scene);
    this.obstacles = new Obstacles(scene);
    this.clouds = new Clouds(scene);
    this.nightMode = new NightMode(scene);
    this.scene.events.on(CONFIG.EVENTS.GAME_RESTART, this.reset, this);
    this.spawnInitialCloud()
  }

  /**
   * Spawn 1st cloud
   */
  spawnInitialCloud() {
    this.clouds.spawnItem()
    this.clouds.spawnItem()
    this.clouds.spawnItem()
  }

  /**
   * Update horizon
   */
  update(time) {
    this.ground.update(time);
    this.obstacles.update(time);
    this.nightMode.update(time);
  }

  /**
   * Reset horizon
   */
  reset() {
    this.ground.reset();
    this.obstacles.reset();
    this.nightMode.reset();
  }
}

export default Horizon;
