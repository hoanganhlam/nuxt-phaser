import Phaser from 'phaser';

import CONFIG from '../../config/game';

/**
 * Player animation manager
 * @class AnimationManager
 */
class AnimationManager {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  /**
   * Creates an instance of AnimationManager
   * @param {Player} player - The Player to which this AnimationManager belongs
   */
  constructor(player) {
    this.player = player;

    this.initAnimations();
  }

  /**
   * Init animations
   */
  initAnimations() {
    const {scene} = this.player;

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [18, 19, 20, 21, 22, 23, 34, 25],
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  /**
   * Set animation based on player state
   */
  update() {
    const {STATES, FRAMES} = AnimationManager.CONFIG;
    const {player} = this;

    switch (player.state) {
      case STATES.IDLING:
        player.anims.play('idle', true);
        break;
      case STATES.RUNNING:
        player.anims.play('run', true);
        break;
      case STATES.DUCKING:
        player.anims.play('duck', true);
        break;
      case STATES.DEAD:
        player.anims.stop();
        player.setFrame(FRAMES.DEAD);
        break;
      case STATES.JUMPING:
      default:
        player.anims.stop();
        player.setFrame(FRAMES.JUMPING);
        break;
    }
  }
}

export default AnimationManager;
