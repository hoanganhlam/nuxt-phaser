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
        frames: [1, 2, 3, 4],
      }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'kick',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [3, 6],
      }),
      frameRate: 4,
      repeat: 1
    });

    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [18, 19, 20, 21, 22, 23, 34, 25],
      }),
      frameRate: 8,
      repeat: -1
    });

    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [4, 5, 6],
      }),
      frameRate: 2,
      repeat: 0
    });

    scene.anims.create({
      key: 'die',
      frames: scene.anims.generateFrameNumbers('nino-doux', {
        frames: [15, 16],
      }),
      frameRate: 2,
      repeat: 0
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
        player.anims.play('die', true);
        break;
      case STATES.JUMPING:
        player.anims.play('jump', true);
        break;
      case STATES.KICK:
        player.anims.play('kick', true);
        break;
      default:
        player.anims.stop();
        player.setFrame(FRAMES.JUMPING);
        break;
    }
  }
}

export default AnimationManager;
