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
      player.flip()
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
    if (this.cursors.space.isDown) {

    }
  }
}

export default InputManager;
