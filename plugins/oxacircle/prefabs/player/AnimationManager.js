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
    const { scene } = this.player;

    const idleFrames = scene.anims.generateFrameNames('dino', {
      frames: AnimationManager.CONFIG.FRAMES.IDLING,
    });
    scene.anims.create({key: 'idle', frames: idleFrames, frameRate: 1, repeat: -1,});

    const runFrames = scene.anims.generateFrameNames('dino', {
      frames: AnimationManager.CONFIG.FRAMES.RUNNING,
    });
    scene.anims.create({ key: 'run', frames: runFrames, frameRate: 10, repeat: -1 });

    const duckFrames = scene.anims.generateFrameNames('dino', {
      frames: AnimationManager.CONFIG.FRAMES.DUCKING,
    });
    scene.anims.create({ key: 'duck', frames: duckFrames, frameRate: 10, repeat: -1 });
  }

  /**
   * Set animation based on player state
   */
  update() {
    const { STATES, FRAMES } = AnimationManager.CONFIG;
    const { player } = this;

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
