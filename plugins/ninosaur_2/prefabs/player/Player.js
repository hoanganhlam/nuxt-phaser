import Phaser from 'phaser';
import GAME_CONFIG from '../../config';
import CONFIG from '../../config/game';
import AnimationManager from './AnimationManager';

let gameOptions = {
  gameGravity: 0.5,
  heroSpeed: 1.2
}

const SIDE_UP = 0;
const SIDE_RIGHT = 1;
const SIDE_DOWN = 2;
const SIDE_LEFT = 3;


class Player extends Phaser.Physics.Matter.Sprite {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  constructor(scene, x = Player.CONFIG.POS.INITIAL_X, y = Player.CONFIG.POS.Y) {
    super(
      scene.matter.world,
      x, y,
      'nino-doux',
      1,
      {label: 'player'}
    );

    this.animationManager = new AnimationManager(this);
    this.scene = scene;
    this.displayWidth = 40;
    this.displayHeight = 40;
    this.setOrigin(0.5, 0.25).setDepth(1000).setFriction(0);
    this.setCollisionGroup(this.scene.userGroup);

    this.destroying = false;
    this.isReady = false;
    this.score = window.playerScore || 0;
    this.totalScore = window.totalPlayerScore || 0;
    this.direction = SIDE_UP;
    this.rotating = false;
    this.isReverse = false;
    this.speed = gameOptions.heroSpeed;

    this.scene.tweens.add({
      targets: this,
      alpha: {value: 1, duration: 2000, ease: 'Power1'},
    });

    this.setState(Player.CONFIG.STATES.IDLING);
    this.setAlpha(0);
    scene.add.existing(this);
    scene.input.keyboard.on('keydown-R', function (event) {
      if (this.isDead) {
        this.reset()
      } else if (this.state === Player.CONFIG.STATES.RUNNING) {
        this.flip()
      } else if (this.state === Player.CONFIG.STATES.IDLING) {
        this.setState(Player.CONFIG.STATES.RUNNING);
      }
    }.bind(this));
    scene.input.keyboard.on('keydown-SPACE', function (event) {
      this.kick()
    }.bind(this));
  }

  /**
   * Update player
   */
  update(time) {
    this.animationManager.update();
    if (this.state !== Player.CONFIG.STATES.RUNNING) {
      this.setVelocity(0, 0);
      this.checkOverlap();
      return;
    }
    if (this.speed < 1.8) this.speed = this.speed + 0.0006;
    if (!this.isReady) this.isReady = true;
    if (!this.rotating) {
      if (this.isReverse) {
        this.moveCounterClockwise();
      } else {
        this.moveClockwise();
      }
      this.checkRotation();
    }
    this.checkOverlap();
  }

  flip() {
    this.isReverse = !this.isReverse;
    this.speed = gameOptions.heroSpeed;
  }

  kick() {
    this.setState(Player.CONFIG.STATES.KICK);
    setTimeout(() => {
      this.setState(Player.CONFIG.STATES.RUNNING);
    }, 1000);
  }

  /**
   * Set player idling
   */
  idle() {
    this.setState(Player.CONFIG.STATES.IDLING);
  }

  /**
   * Set player running
   */
  run() {
    this.setState(Player.CONFIG.STATES.RUNNING);
  }

  /**
   * Set player ducking
   */
  duck() {
    this.setState(Player.CONFIG.STATES.DUCKING);
  }

  /**
   * Set player dead | Handle gameover
   */
  die() {
    this.totalScore = this.totalScore + this.score;
    window.totalPlayerScore = this.totalScore;
    this.setState(Player.CONFIG.STATES.DEAD);
    switch (this.direction) {
      case SIDE_UP:
        this.setVelocityX(0)
        break;
      case SIDE_RIGHT:
        this.setVelocityY(0)
        break;
      case SIDE_DOWN:
        this.setVelocityX(0)
        break;
      case SIDE_LEFT:
        this.setVelocityY(0)
        break;
    }
  }

  /**
   * Reset player | Handle game restart
   */
  reset() {
    this.isReady = false;
    this.speed = gameOptions.heroSpeed;
    this.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      alpha: {value: 1, duration: 2000, ease: 'Power1'},
    });
    this.setState(Player.CONFIG.STATES.RUNNING);
    this.animationManager.update();
  }

  checkOverlap() {
    const now = new Date().getTime()
    const boundsA = this.getBounds();
    const obstacles = this.scene.obstacles.getChildren()
    for (const index in obstacles) {
      const item = obstacles[index];
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(boundsA, item.getBounds()) &&
        this.isReady &&
        this.alpha > GAME_CONFIG.maxAlpha &&
        item.time_start < now && now < item.time_end &&
        this.state === Player.CONFIG.STATES.KICK && !item.isDying
      ) {
        this.score = this.score + 1;
        window.playerScore = this.score;
        item.hit()
      }
    }
  }

  /**
   * Check if player is dead
   * @readonly
   * @returns {boolean}
   */
  get isDead() {
    return this.state === Player.CONFIG.STATES.DEAD;
  }

  /**
   * Set player state
   * @param state string
   * @returns {Player}
   * @throws Will throw an error if state argument is invalid
   */
  setState(state) {
    if (Object.hasOwnProperty.call(Player.CONFIG.STATES, state)) {
      this.state = state;
      return this;
    }
    throw new Error(`Invalid Player State: ${state}`);
  }

  moveCounterClockwise() {
    this.setFlipX(true);
    let gravity = gameOptions.gameGravity;
    switch (this.direction) {
      case SIDE_UP:
        this.setVelocity(-this.speed, gravity);
        break;
      case SIDE_DOWN:
        this.setVelocity(this.speed, -gravity);
        break;
      case SIDE_LEFT:
        this.setVelocity(gravity, this.speed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(-gravity, -this.speed);
        break;
    }
  }

  moveClockwise() {
    this.setFlipX(false);
    let gravity = gameOptions.gameGravity;
    switch (this.direction) {
      case SIDE_UP:
        this.setVelocity(this.speed, gravity);
        break;
      case SIDE_DOWN:
        this.setVelocity(-this.speed, -gravity);
        break;
      case SIDE_LEFT:
        this.setVelocity(gravity, -this.speed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(-gravity, this.speed);
        break;
    }
  }

  checkRotation() {
    if (this.rotating || this.isDead) return;
    const playerBounds = this.getBounds()
    const minDistance = GAME_CONFIG.scale.width * 3 / 20
    const maxDistance = GAME_CONFIG.scale.width * 17 / 20
    if (this.isReverse) {
      switch (this.direction) {
        case SIDE_UP:
          if (playerBounds.right < minDistance + this.displayWidth / 2) {
            this.handleRotation(
              -1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_RIGHT:
          if (playerBounds.bottom < minDistance + this.displayWidth / 2) {
            this.handleRotation(
              -1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_DOWN:
          if (playerBounds.left > maxDistance - this.displayWidth / 2) {
            this.handleRotation(
              -1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_LEFT:
          if (playerBounds.top > maxDistance - this.displayHeight / 2) {
            this.handleRotation(
              -1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
      }
    } else {
      switch (this.direction) {
        case SIDE_UP:
          if (playerBounds.left > maxDistance - this.displayWidth / 2) {
            this.handleRotation(
              1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_RIGHT:
          if (playerBounds.top > maxDistance - this.displayWidth / 2) {
            this.handleRotation(
              1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_DOWN:
          if (playerBounds.right < minDistance + this.displayWidth / 2) {
            this.handleRotation(
              1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_LEFT:
          if (playerBounds.bottom < minDistance + this.displayWidth / 2) {
            this.handleRotation(
              1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
      }
    }
  }

  handleRotation(delta, targetX, targetY) {
    this.rotating = true;
    this.scene.tweens.add({
      targets: [this],
      angle: this.angle + 90 * delta,
      x: targetX,
      y: targetY,
      duration: 200,
      callbackScope: this,
      onComplete: () => {
        this.direction = Phaser.Math.Wrap(this.direction + delta, 0, 4);
        this.rotating = false;
      }
    });
  }
}

export default Player;
