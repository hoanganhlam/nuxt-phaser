import Phaser from 'phaser';

import CONFIG from '../../../config/game';
import HorizonItems from '../HorizonItems';
import Cloud from './Cloud';

/**
 * Clouds group
 * @class Clouds
 * @extends {HorizonItems}
 */
class Clouds extends HorizonItems {
  static CONFIG = CONFIG.PREFABS.CLOUD;

  /**
   * Spawn cloud
   * @override
   */
  spawnItem() {
    const radians = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
    const x = 400 + 370 * Math.cos(radians);
    const y = 400 + 370 * Math.sin(radians);
    const newObstacle = new Cloud(this.scene, x, y);
    this.add(newObstacle);
  }

  update(speed, isMobile) {
    super.update(speed, isMobile);
  }
}

export default Clouds;
