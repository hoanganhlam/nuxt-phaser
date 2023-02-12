import Phaser from 'phaser';
import GAME_CONFIG from '../../config';
import CONFIG from '../../config/game';

// import AnimationManager from './AnimationManager';


class Player extends Phaser.Physics.Matter.Sprite {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  constructor(scene, raw, x = Player.CONFIG.POS.INITIAL_X, y = Player.CONFIG.POS.Y) {
    super(scene.matter.world, x, y, 'boat', {label: 'player'});
    // this.animationManager = new AnimationManager(this);
    this.scene = scene;
    this.graphics = scene.graphics;
    this.setMass(30);
    this.setFriction(0.5);
    this.setFixedRotation();
    this.setOrigin(0.5);
    this.playerCircle = new Phaser.Geom.Circle(0, 0, 120);
    this.xPath = scene.add.path();
    const particles = scene.add.particles('tween');
    particles.setDepth(-1)
    const emitter = particles.createEmitter({
      speed: {
        onEmit: function (particle, key, t, value) {
          return this.body.speed * 10;
        }.bind(this)
      },
      lifespan: {
        onEmit: function (particle, key, t, value) {
          return Phaser.Math.Percent(this.body.speed, 0, 300) * 40000;
        }.bind(this)
      },
      alpha: {
        onEmit: function (particle, key, t, value) {
          return Phaser.Math.Percent(this.body.speed, 0, 300) * 1000;
        }.bind(this)
      },
      scale: {start: 1.0, end: 0},
      blendMode: 'ADD'
    });

    emitter.startFollow(this);
    scene.add.existing(this);
    scene.input.keyboard.on('keydown-SPACE', function (event) {

    }.bind(this));

    scene.input.on('pointerdown', (pointer) => {
      // this.xPath.curves.length = 0;
      // this.xPath.cacheLengths.length = 0;
      // const x = scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
      // this.xPath.add(new Phaser.Curves.Line([this.x, this.y, x.x, x.y]))
    });
  }

  /**
   * Update player
   */
  update(time) {
    this.graphics.clear();
    this.playerCircle.x = this.x;
    this.playerCircle.y = this.y;
    this.graphics.fillStyle(0x001100, 0.05).fillCircleShape(this.playerCircle);
    // this.graphics.lineStyle(1, 0xffffff, 1);
    // this.xPath.draw(this.graphics);
  }

  checkOverlap() {
    const now = new Date().getTime()
    const boundsA = this.getBounds();
    const obstacles = this.scene.islands.getChildren()
    for (const index in obstacles) {
      const item = obstacles[index]
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(boundsA, item.getBounds()) &&
        this.isReady && this.isSelf &&
        this.alpha > GAME_CONFIG.maxAlpha &&
        item.time_start < now && now < item.time_end
      ) {

      }
    }
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
