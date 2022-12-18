/**
 * Player input manager
 * @class InputManager
 */
class InputManager {
  /**
   * Creates an instance of InputManager
   * @param {Player} player - The Player to which this InputManager belongs
   */
  constructor(player) {
    this.player = player;
    this.scene = player.scene;
    this.cursors = player.scene.input.keyboard.createCursorKeys();
    player.scene.input.keyboard.on('keydown-SPACE', function (event) {
      player.jump();
    });
  }

  /**
   * Update inputManager
   */
  update() {
    const { player } = this;
    if (player.isDead) {
      return;
    }

    if (player.isOnFloor) {
      if (this.isDuckKeyPressed) {
        player.duck();
      } else if (this.isJumpKeyPressed) {
        console.log("A");

      } else {
        player.run();
      }
    }
  }

  /**
   * Check if duck key is pressed
   * @readonly
   * @returns {boolean}
   */
  get isDuckKeyPressed() {
    return this.cursors.down.isDown;
  }

  /**
   * Check if jump key is pressed
   * @readonly
   * @returns {boolean}
   */
  get isJumpKeyPressed() {
    const { activePointer } = this.scene.input;
    return (
      this.cursors.up.isDown ||
      this.cursors.space.isDown ||
      (activePointer.isDown && activePointer.wasTouch)
    );
  }
}

export default InputManager;
