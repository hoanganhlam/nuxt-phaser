import CONFIG from '../../config/game';

/**
 * Resize manager
 * @class ResizeManager
 */
class ResizeManager {
  static CONFIG = CONFIG.SCENES.GAME;

  /**
   * Creates an instance of ResizeManager
   * @param {Phaser.Scene} scene - The Scene to which this ResizeManager belongs
   * @param {*} resizeCallbacks - Callback to be called
   */
  constructor(scene, { canvas, camera, gameSpeed, gameObjects }) {
    this.game = scene.game;
    this.canvas = scene.game.canvas;
    this.scale = scene.scale;

    this.callbacks = {
      canvas,
      camera,
      gameSpeed,
      gameObjects,
    };

    this.gameWidth = this.scale.gameSize.width;

    // Register event handlers
    this.scale.on('resize', () => this.resize(this.scale.gameSize, this.scale.parentSize));
  }

  /**
   * Resize scene
   * @param {Phaser.Structs.Size} gameSize - Current game size
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resize(gameSize, parentSize) {
    // this.resizeCanvas(gameSize, parentSize);
    // this.resizeGameSpeed(gameSize, parentSize);
    // this.resizeCamera(gameSize, parentSize);
    // this.resizeGameObjects(gameSize, parentSize);
  }

  /**
   * Resize canvas
   * @param {Phaser.Structs.Size} gameSize - Current game size
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resizeCanvas(gameSize, parentSize) {

  }

  /**
   * Resize game speed
   * @param {Phaser.Structs.Size} gameSize - Current game size
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resizeGameSpeed(gameSize, parentSize) {

  }

  /**
   * Resize camera
   * @param {Phaser.Structs.Size} gameSize - Current game size
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resizeCamera(gameSize, parentSize) {

  }

  /**
   * Resize gameobjects
   * @param {Phaser.Structs.Size} gameSize - Current game size
   * @param {Phaser.Structs.Size} parentSize - Current parent size
   */
  resizeGameObjects(gameSize, parentSize) {

  }
}

export default ResizeManager;
