import Phaser from 'phaser';
import GAME_CONFIG from '../../config';
import CONFIG from '../../config/game';
import InputManager from './InputManager';
import AnimationManager from './AnimationManager';

let gameOptions = {
  gameGravity: 0.2,
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
      GAME_CONFIG.scale.width / 2, 150,
      'nino-doux',
      0
    );
    this.scene = scene
    this.displayWidth = 48
    this.displayHeight = 48
    this.step = 0.006
    this.inputManager = new InputManager(this);
    this.animationManager = new AnimationManager(this);
    // Init image
    this.setOrigin(0.5, 0.25);
    this.setDepth(1000);
    this.setFriction(0)
    // Set initial state
    this.idle();
    this.animationManager.update();
    scene.add.existing(this)
    this.direction = SIDE_UP;
    this.rotating = false;
  }

  /**
   * Update player
   */
  update(time) {
    if (this.isRunning) {
      this.animationManager.update();
    }
    if (!this.rotating) {
      this.moveClockwise()
      this.checkRotation()
    }
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
      this.step = 0.006
      this.flipX = !this.flipX
    }
  }

  /**
   * Set player dead | Handle gameover
   */
  die() {
    this.setState(Player.CONFIG.STATES.DEAD);
    this.animationManager.update();
  }

  /**
   * Reset player | Handle game restart
   */
  reset() {
    this.setState(Player.CONFIG.STATES.IDLING);
    this.setPosition(Player.CONFIG.POS.INITIAL_X, Player.CONFIG.POS.Y)
    this.setAngle(0)
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
        this.setVelocity(-gameOptions.heroSpeed, this.body.velocity.y);
        break;
      case SIDE_DOWN:
        this.setVelocity(gameOptions.heroSpeed, this.body.velocity.y);
        break;
      case SIDE_LEFT:
        this.setVelocity(this.body.velocity.x, gameOptions.heroSpeed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(this.body.velocity.x, -gameOptions.heroSpeed);
        break;
    }
  }

  moveClockwise(){
    this.setFlipX(false);
    switch(this.direction){
      case SIDE_UP:
        this.setVelocity(gameOptions.heroSpeed, gameOptions.gameGravity);
        break;
      case SIDE_DOWN:
        this.setVelocity(-gameOptions.heroSpeed, -gameOptions.gameGravity);
        break;
      case SIDE_LEFT:
        this.setVelocity(gameOptions.gameGravity, -gameOptions.heroSpeed);
        break;
      case SIDE_RIGHT:
        this.setVelocity(-gameOptions.gameGravity, gameOptions.heroSpeed);
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
    if (this.rotating) return;
    const playerBounds = this.getBounds()
    const wallBounds = this.scene.wall.getBounds()
    const wallPX = this.scene.wall.x
    switch(this.direction) {
      case SIDE_UP:
        if(playerBounds.left > wallBounds.right + wallPX - this.displayWidth / 2){
          this.handleRotation(
            1,
            wallPX + wallBounds.right + this.displayWidth / 2,
            wallPX + wallBounds.top + this.displayHeight / 2
          );
        }
        if(playerBounds.right < wallBounds.left + wallPX - this.displayWidth / 2){
        }
        break;
      case SIDE_RIGHT:
        if(playerBounds.top > wallBounds.bottom + wallPX - this.displayWidth / 2){
          this.handleRotation(
            1,
            wallPX + wallBounds.bottom - this.displayWidth / 2,
            wallPX + wallBounds.right + this.displayHeight / 2
          );
        }
        if(playerBounds.bottom < wallBounds.top + wallPX - this.displayWidth / 2){
        }
        break;
      case SIDE_DOWN:
        if(playerBounds.right < wallBounds.left + wallPX + this.displayWidth / 2){
          this.handleRotation(
            1,
            wallPX + wallBounds.left - this.displayWidth / 2,
            wallPX + wallBounds.bottom - this.displayHeight / 2
          );
        }
        if(playerBounds.left > wallBounds.right + wallPX + this.displayWidth / 2){
        }
        break;
      case SIDE_LEFT:
        if(playerBounds.bottom < wallBounds.top + wallPX + this.displayWidth / 2){
          this.handleRotation(
            1,
            wallPX + wallBounds.top + this.displayWidth / 2,
            wallPX + wallBounds.left - this.displayHeight / 2
          );
        }
        if(playerBounds.top > wallBounds.bottom + wallPX - this.displayWidth / 2){
        }
        break;
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
