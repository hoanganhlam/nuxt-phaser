import Phaser from 'phaser';
import CONFIG from '../../config/game';

const layers = require("../../map3.json").layers.map(x => x.data);

const maps = [
  {layer: 0, x: 2000, y: 0},
  {layer: 0, x: 480, y: 0},
  {layer: 0, x: 480, y: 480},
  {layer: 0, x: 0, y: 480},
  {layer: 0, x: 0, y: -480},
  {layer: 0, x: -480, y: -480},
  {layer: 0, x: -480, y: 0}
]

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

  spawnMap(player) {
    maps.forEach((map, i) => {
      const radius = window.devicePixelRatio * CONFIG.GAME.WIDTH;
      const spawned = Boolean(this.maps[`${map.x}_${map.y}`]);
      const distance = Phaser.Math.Distance.BetweenPoints(player, {
        x: map.x + 480 / 2,
        y: map.y + 480 / 2
      });
      if (distance < radius && !spawned) {
        const l = [];
        const chunkSize = 30;
        for (let i = 0; i < layers[map.layer].length; i += chunkSize) {
          const chunk = layers[map.layer].slice(i, i + chunkSize);
          l.push(chunk.map(x => x - 1))
        }
        const displayMap = this.make.tilemap({
          data: l,
          tileWidth: 16,
          tileHeight: 16
        });
        const tiles = displayMap.addTilesetImage(
          'tilex',
          'tilex', 16, 16, 0, 0
        );
        const layer = displayMap.createLayer(0, tiles);
        layer.setPosition(map.x, map.y);
        layer.setDepth(-1);
        this.maps[`${map.x}_${map.y}`] = displayMap;
      } else if (spawned && distance >= radius) {
        this.maps[`${map.x}_${map.y}`]?.destroy();
        delete this.maps[`${map.x}_${map.y}`];
      }
    })
  }

  create() {
    this.maps = {}
    this.graphics = this.add.graphics();

    this.player = this.matter.add.sprite(0, 0, 'ship');
    this.player.setMass(20);
    this.player.setFriction(0.5);
    this.player.setFixedRotation();
    this.player.setOrigin(0.5);
    this.player.setSize(32 * window.devicePixelRatio, 32 * window.devicePixelRatio)

    this.playerCircle = new Phaser.Geom.Circle(0, 0, 120);

    // this.cameras.main.startFollow(this.player);

    this.add.existing(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'snooze',
      frames: [
        { key: 'boat_frame_1' },
        { key: 'boat_frame_2' },
        { key: 'boat_frame_3' },
        { key: 'boat_frame_4'}
      ],
      frameRate: 4,
      repeat: -1
    });

    // this.player.anims.play('snooze')

    // const particles = this.add.particles('blue');
    // const emitter = particles.createEmitter({
    //   speed: {
    //     onEmit: function (particle, key, t, value) {
    //       return this.player.body.speed * 10;
    //     }.bind(this)
    //   },
    //   lifespan: {
    //     onEmit: function (particle, key, t, value) {
    //       return Phaser.Math.Percent(this.player.body.speed, 0, 300) * 40000;
    //     }.bind(this)
    //   },
    //   alpha: {
    //     onEmit: function (particle, key, t, value) {
    //       return Phaser.Math.Percent(this.player.body.speed, 0, 300) * 1000;
    //     }.bind(this)
    //   },
    //   scale: {start: 1.0, end: 0},
    //   blendMode: 'ADD'
    // });

    // emitter.startFollow(this.player);
  }

  update(time, xxx) {
    this.spawnMap(this.player);
    const velor = 0.001 * window.devicePixelRatio
    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-velor * 5);
    }
    if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(velor * 5);
    }
    if (this.cursors.up.isDown) {
      this.player.thrustLeft(velor);
    }
    if (this.cursors.down.isDown) {
      this.player.thrustRight(velor);
    }

    this.graphics.clear();
    this.playerCircle.x = this.player.x
    this.playerCircle.y = this.player.y
    this.graphics
      .fillStyle(0x001100, 0.05)
      .fillCircleShape(this.playerCircle);
  }
}

export default GameScene;
