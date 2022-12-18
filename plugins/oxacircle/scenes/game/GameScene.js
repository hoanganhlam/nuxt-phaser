import Phaser from 'phaser';

import CONFIG from '../../config/game';
import InputManager from './InputManager';
import SoundManager from './SoundManager';
import ResizeManager from './ResizeManager';
import LocalScoreManager from './score/LocalScoreManager';
import UI from './UI';
import Intro from './Intro';
import Player from '../../prefabs/player/Player';
import Horizon from '../../prefabs/horizon/Horizon';

/**
 * Main game scene
 * @class GameScene
 * @extends {Phaser.Scene}
 */
class GameScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.GAME;

  constructor() {
    super(GameScene.CONFIG.NAME);
  }

  init() {
    // Init game state vars
    this.isPlaying = false;
    this.readyToRestart = false;
    // Init scoring vars
    this.distance = 0;
    this.highScore = 0;
    // Init managers
    this.soundManager = new SoundManager(this);
    this.inputManager = new InputManager(this);
    this.resizeManager = new ResizeManager(this, {
      canvas: this.onResizeCanvas.bind(this),
      camera: this.onResizeCamera.bind(this),
      gameSpeed: this.onResizeGameSpeed.bind(this),
      gameObjects: this.onResizeGameObjects.bind(this),
    });
    this.scoreManager = new LocalScoreManager(this.events)
    // Register event handlers
    this.events.on(CONFIG.EVENTS.GAME_START, this.onGameStart, this);
    this.events.on(CONFIG.EVENTS.GAME_INTRO_START, this.onIntroStart, this);
    this.events.on(CONFIG.EVENTS.GAME_INTRO_COMPLETE, this.onIntroComplete, this);
    this.events.on(CONFIG.EVENTS.GAME_RESTART, this.onGameRestart, this);
    this.events.on(CONFIG.EVENTS.GAME_OVER, this.onGameOver, this);
    this.events.on(CONFIG.EVENTS.HIGH_SCORE_UPDATE, this.onHighScoreUpdate, this);
  }

  create() {
    this.matter.world.disableGravity();
    this.ui = new UI(this);
    this.intro = new Intro(this.events);
    this.playerCategory = this.matter.world.nextCategory();
    this.player = new Player(this);
    this.horizon = new Horizon(this);
    this.ground = this.horizon.ground;
    this.obstacles = this.horizon.obstacles;
    this.nightMode = this.horizon.nightMode;
    this.resizeManager.resize(this.scale.gameSize, this.scale.parentSize);
    this.player.setCollidesWith(this.playerCategory)
    this.player.setOnCollide((x) => {
      if (x.bodyB.collisionFilter.category === this.playerCategory && x.bodyB.gameObject.alpha >= 0.9) {
        this.onPlayerHitObstacle()
      }
    })
    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      console.log(bodyA);
      console.log(bodyB);
    });
  }

  update(time, delta) {
    const { gameSize } = this.scale;
    this.inputManager.update();
    if (this.isPlaying) {
      this.distance += this.player.step
    }
    this.horizon.clouds.update()
    this.ui.update(this.isPlaying, gameSize, this.score);
    if (this.isPlaying) {
      this.player.update();
      const {NIGHT_MODE} = GameScene.CONFIG;
      if (this.shouldNightModeStart) {
        this.nightMode.enable();
        this.time.delayedCall(NIGHT_MODE.DURATION, () => {
          if (this.isPlaying && this.nightMode.isEnabled) {
            this.nightMode.disable();
          }
        });
      }
      this.horizon.update(time);
    }
  }

  /**
   * Handle player collision with obstacle
   */
  onPlayerHitObstacle() {
    this.events.emit(CONFIG.EVENTS.GAME_OVER, this.score, this.highScore);
  }

  /**
   * Handle game intro start
   */
  onIntroStart() {

  }

  /**
   * Handle game intro complete
   */
  onIntroComplete() {}

  /**
   * Handle game start
   */
  onGameStart() {
    this.isPlaying = true;
  }

  /**
   * Handle game restart
   */
  onGameRestart() {
    this.readyToRestart = false;
    this.distance = 0;
    this.horizon.reset()
    this.scoreManager
      .getHighScore()
      .then(highScore => {
        this.highScore = highScore;
      })
      .catch(() => {
      });
  }

  /**
   * Handle gameover
   */
  onGameOver() {
    this.isPlaying = false;
    this.readyToRestart = true;
    if (this.game.device.features.vibration) {
      navigator.vibrate(GameScene.CONFIG.GAME_OVER.VIBRATION);
    }
    if (this.score > this.highScore) {
      this.events.emit(CONFIG.EVENTS.HIGH_SCORE_UPDATE, this.score);
    }
  }

  /**
   * Handle high score update
   * @param {number} highScore - Updated high score
   */
  onHighScoreUpdate(highScore) {
    this.scoreManager
      .saveHighScore(highScore)
      .then(() => {
        this.highScore = highScore;
      })
      .catch(() => {
      });
  }

  /**
   * Get current score
   * @readonly
   * @returns {number} - Current score
   */
  get score() {
    return Math.ceil(this.distance * GameScene.CONFIG.GAME.SCORE.COEFFICIENT);
  }

  /**
   * Check if night mode should start
   * @readonly
   */
  get shouldNightModeStart() {
    const {score, nightMode} = this;
    const {DISTANCE} = GameScene.CONFIG.NIGHT_MODE;
    return score > 0 && score % DISTANCE === 0 && !nightMode.isEnabled;
  }

  /**
   * Handle canvas resize
   * @param {Phaser.Structs.Size} gameSize - Current game size
   */
  onResizeCanvas(gameSize) {}

  /**
   * Handle game speed resize
   * @param {Phaser.Structs.Size} gameSize - Current game size
   */
  onResizeGameSpeed(gameSize) {}

  /**
   * Handle camera resize
   * @param {Phaser.Structs.Size} gameSize - Current game size
   */
  onResizeCamera(gameSize) {}

  /**
   * Handle gameobjects resize
   * @param {Phaser.Structs.Size} gameSize - Current game size
   */
  onResizeGameObjects(gameSize) {}
}

export default GameScene;
