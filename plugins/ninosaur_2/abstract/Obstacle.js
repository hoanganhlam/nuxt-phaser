import Phaser from 'phaser';
import GAME_CONFIG from "@/plugins/ninosaur_2/config";


class Obstacle extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, frame, options) {
    super(scene.matter.world, x, y, 'nino-obstacles', frame, {label: 'obstacle'});
    this.time_start = options.time_start;
    this.time_end = options.time_end;
    this.displayWidth = options.width;
    this.displayHeight = options.height;
    this.setAngle(options.radian * 90);
    this.setOrigin(0.5, 0.5);
    this.setAlpha(0).setStatic(true);
    this.setCollisionCategory(0);
    this.isStarted = false;
    this.isDying = false;
    scene.add.existing(this);
    const duration = this.time_start - new Date().getTime();
    if (duration > 500) {
      scene.tweens.add({
        targets: this,
        alpha: {value: 1, duration: duration, ease: 'Power1'},
      });
    } else if (duration < 0) {
      this.alpha = 1;
    }
  }

  update(time) {
    const now = new Date().getTime();
    if (now > this.time_start && !this.isStarted) {
      this.isStarted = true;
      this.alpha = 1;
    }
    if (now > this.time_end && !this.isDying) {
      this.out()
    }
  }

  hit() {
    this.isDying = true;
    this.setVelocityY(2);
    setTimeout(() => {
      this.out()
    }, 1000)
  }

  out() {
    this.isDying = true;
    this.alpha = GAME_CONFIG.maxAlpha;
    this.scene.tweens.add({
      targets: this,
      alpha: {value: 0, duration: 2000, ease: 'Power2'},
    });
    const _this = this;
    setTimeout(function () {
      _this.die();
    }, 2000);
  }

  freeze() {
  }

  die() {
    this.freeze()
    this.destroy();
  }

  reset() {
    this.die();
  }
}

export default Obstacle;
