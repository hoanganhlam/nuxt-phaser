/**
 * Tree animation manager
 * @class AnimationManager
 */
class AnimationManager {
  /**
   * Creates an instance of AnimationManager
   * @param {Bird} bird - The Bird to which this AnimationManager belongs
   */
  constructor(bird) {
    this.bird = bird;
    const {scene} = this.bird;
    scene.anims.create({
      key: 'bird_idle',
      frames: scene.anims.generateFrameNumbers('nino-obstacles', {
        frames: [6, 7, 8],
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  update() {
    this.bird.anims.play('bird_idle', true);
  }

  stop() {
    this.bird.anims.stop();
  }
}

export default AnimationManager;
