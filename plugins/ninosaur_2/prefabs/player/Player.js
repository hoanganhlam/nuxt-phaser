import Phaser from 'phaser';
import GAME_CONFIG from '../../config';
import CONFIG from '../../config/game';
import InputManager from './InputManager';
import AnimationManager from './AnimationManager';

let gameOptions = {
  gameGravity: 0.5,
  heroSpeed: 1.5,
}

const SIDE_UP = 0;
const SIDE_RIGHT = 1;
const SIDE_DOWN = 2;
const SIDE_LEFT = 3;

/**
 * Player
 * @class Player
 * @extends {Phaser.Physics.Arcade.Sprite}
 */
class Player extends Phaser.Physics.Matter.Sprite {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  constructor(scene, x = Player.CONFIG.POS.INITIAL_X, y = Player.CONFIG.POS.Y) {
    super(
      scene.matter.world,
      50, 50,
      'nino-doux',
      0
    );
    this.inputManager = new InputManager(this);
    this.animationManager = new AnimationManager(this);

    this.scene = scene
    this.displayWidth = 40
    this.displayHeight = 40
    this.direction = SIDE_UP;
    this.rotating = false;
    this.isReverse = false;
    this.score = 0
    this.speed = gameOptions.heroSpeed
    // Init frame
    this.setOrigin(0.5, 0.25);
    this.setDepth(1000);
    this.setFriction(0)
    // Set initial state
    this.idle();
    this.setCollisionCategory(scene.playerCategory)
    this.setOnCollide((x) => {
      if (x.bodyB.collisionFilter.category === scene.playerCategory && x.bodyA.collisionFilter.category === scene.playerCategory) {
        this.die()
      }
    })
    this.setAlpha(0)
    this.scene.tweens.add({
      targets: this,
      alpha: { value: 1, duration: 2000, ease: 'Power1' },
    });
    scene.add.existing(this)
  }

  /**
   * Update player
   */
  update(time) {
    if (this.isDead) return;
    if (this.speed < 1.5) {
      this.speed = this.speed + 0.0006
    } else {
      this.run()
    }
    this.animationManager.update();
    if (!this.rotating) {
      if (this.isReverse) {
        this.moveCounterClockwise()
      } else {
        this.moveClockwise()
      }
      this.checkRotation()
    }

    if (this.alpha >= 0.9) {
      this.setCollisionCategory(this.scene.playerCategory)
    } else {
      this.setCollisionCategory(-1)
    }
  }

  flip() {
    this.isReverse = !this.isReverse
    this.speed = gameOptions.heroSpeed
    this.idle()
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
   * Set player jumping
   */
  jump() {
    if (this.inputManager.isJumpKeyPressed) {
      this.flipX = !this.flipX
    }
  }

  /**
   * Set player dead | Handle gameover
   */
  die() {
    this.setCollisionCategory(0);
    this.setState(Player.CONFIG.STATES.DEAD);
    this.animationManager.update();
    this.setVelocity(0, 0)
  }

  /**
   * Reset player | Handle game restart
   */
  reset() {
    this.setCollisionCategory(this.scene.playerCategory);
    this.setState(Player.CONFIG.STATES.IDLING);
    this.setAlpha(0)
    this.scene.tweens.add({
      targets: this,
      alpha: { value: 1, duration: 2000, ease: 'Power1' },
    });
    this.animationManager.update();
  }

  /**
   * Check if player is idling
   * @readonly
   * @returns {boolean}
   */
  get isIdling() {
    return this.state === Player.CONFIG.STATES.IDLING;
  }

  /**
   * Check if player is running
   * @readonly
   * @returns {boolean}
   */
  get isRunning() {
    return this.state === Player.CONFIG.STATES.RUNNING;
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

  moveCounterClockwise(){
    this.setFlipX(true);
    switch(this.direction){
      case SIDE_UP:
        this.setVelocity(-this.speed, gameOptions.gameGravity);
        break;
      case SIDE_DOWN:
        this.setVelocity(this.speed, -gameOptions.gameGravity);
        break;
      case SIDE_LEFT:
        this.setVelocity(gameOptions.gameGravity, this.speed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(-gameOptions.gameGravity,- this.speed);
        break;
    }
  }

  moveClockwise(){
    this.setFlipX(false);
    switch(this.direction){
      case SIDE_UP:
        this.setVelocity(this.speed, gameOptions.gameGravity);
        break;
      case SIDE_DOWN:
        this.setVelocity(-this.speed, -gameOptions.gameGravity);
        break;
      case SIDE_LEFT:
        this.setVelocity(gameOptions.gameGravity, -this.speed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(-gameOptions.gameGravity, this.speed);
        break;
    }
  }

  stopMoving(){
    switch(this.direction){
      case SIDE_UP:
        this.setVelocity(0, this.body.velocity.y);
        break;
      case SIDE_DOWN:
        this.setVelocity(0, this.body.velocity.y);
        break;
      case SIDE_LEFT:
        this.setVelocity(this.body.velocity.x, 0);
        break;
      case SIDE_RIGHT:
        this.setVelocity(this.body.velocity.x, 0);
        break;
    }
  }

  checkRotation(){
    if (this.rotating || this.isDead) return;
    const playerBounds = this.getBounds()
    const minDistance = GAME_CONFIG.scale.width * 3 / 20
    const maxDistance = GAME_CONFIG.scale.width * 17 / 20
    if (this.isReverse) {
      switch(this.direction) {
        case SIDE_UP:
          if (playerBounds.right < minDistance + this.displayWidth / 2){
            this.handleRotation(
              -1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_RIGHT:
          if(playerBounds.bottom < minDistance + this.displayWidth / 2){
            this.handleRotation(
              -1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_DOWN:
          if(playerBounds.left > maxDistance - this.displayWidth / 2){
            this.handleRotation(
              -1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_LEFT:
          if(playerBounds.top > maxDistance - this.displayHeight / 2){
            this.handleRotation(
              -1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
      }
    } else {
      switch(this.direction) {
        case SIDE_UP:
          if(playerBounds.left > maxDistance - this.displayWidth / 2){
            this.handleRotation(
              1,
              playerBounds.centerX + this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_RIGHT:
          if(playerBounds.top > maxDistance - this.displayWidth / 2){
            this.handleRotation(
              1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY + this.displayWidth / 2
            );
          }
          break;
        case SIDE_DOWN:
          if(playerBounds.right < minDistance + this.displayWidth / 2){
            this.handleRotation(
              1,
              playerBounds.centerX - this.displayWidth / 2,
              playerBounds.centerY - this.displayWidth / 2
            );
          }
          break;
        case SIDE_LEFT:
          if(playerBounds.bottom < minDistance + this.displayWidth / 2){
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

  handleRotation(delta, targetX, targetY){
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
