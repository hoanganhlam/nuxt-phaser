import Obstacle from '../Obstacle';

/**
 * Cactus obstacle
 * @class Cactus
 * @extends {Obstacle}
 */
class Cactus extends Obstacle {
  /**
   * Update cactus
   * @param {number} delta - Current game speed
   */
  update(delta) {
    this.timeout = this.timeout - 1
    if (this.alpha >= 0.9) {
      this.setCollisionCategory(this.scene.playerCategory)
    } else {
      this.setCollisionCategory(this.parentCat)
    }
    if (this.timeout <= 0 && !this.dying) {
      this.dying = true
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 1000,
        ease: 'Power2'
      }, this);
      const _this = this
      setTimeout(function () {
        _this.die()
      }, 1000)
    }
  }
}

export default Cactus;
