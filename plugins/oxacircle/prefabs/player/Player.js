import Phaser from 'phaser';

import CONFIG from '../../config/game';
import InputManager from './InputManager';
import AnimationManager from './AnimationManager';

/**
 * Player
 * @class Player
 * @extends {Phaser.Physics.Arcade.Sprite}
 */
class Player extends Phaser.Physics.Matter.Sprite {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  constructor(scene, x = Player.CONFIG.POS.INITIAL_X, y = Player.CONFIG.POS.Y) {
    super(scene.matter.world, x, y, 'dino', Player.CONFIG.FRAMES.INITIAL);
    this.displayWidth = 60
    this.displayHeight = 60
    this.step = 0.006
    // Init managers
    this.inputManager = new InputManager(this);
    this.animationManager = new AnimationManager(this);

    // Init image
    this.setOrigin(0.5, 0.5);
    this.setDepth(1000);

    // Register event handlers
    this.scene.events.on(CONFIG.EVENTS.GAME_INTRO_START, this.onIntroStart, this);
    this.scene.events.on(CONFIG.EVENTS.GAME_START, this.run, this);
    this.scene.events.on(CONFIG.EVENTS.GAME_RESTART, this.reset, this);
    this.scene.events.on(CONFIG.EVENTS.GAME_OVER, this.die, this);

    // Set initial state
    this.idle();
    this.animationManager.update();
    scene.add.existing(this)
  }

  /**
   * Update player
   */
  update(time) {
    if (this.isRunning) {
      this.animationManager.update();
      Phaser.Actions.RotateAroundDistance(
        [this],
        {x: 400, y: 400},
        this.flipX ? -this.step : this.step,
        265
      )
      const angleDeg = Math.atan2(this.y - 400, this.x - 400) * 180 / Math.PI;
      this.setAngle(angleDeg + 90)
      this.updateDisplayOrigin()
      this.step += 0.00003
    }
  }

  /**
   * Handle game intro start
   */
  onIntroStart() {
    this.scene.tweens.add({
      targets: this,
      duration: CONFIG.SCENES.GAME.INTRO.DURATION,
      x: Player.CONFIG.POS.X,
      onComplete: () => {
        this.scene.intro.complete();
      },
    });
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
}

export default Player;
