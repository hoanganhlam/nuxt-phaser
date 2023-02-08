import Phaser from 'phaser';
import CONFIG from '../../config/game';

const chunkSize = 40;
const tileSize = 16;
const mapName = 'map5';
const tileName = 'tiles'
const maps = [
  {layer: 1, x: 5, y: 0},
  {layer: 2, x: 1, y: 0},
  {layer: 3, x: 2, y: 0},
  {layer: 4, x: 3, y: 0},
  {layer: 5, x: 4, y: 0},
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
      const x = map.x * chunkSize * tileSize
      const y = map.y * chunkSize * tileSize
      const radius = window.devicePixelRatio * CONFIG.GAME.WIDTH;
      const spawned = Boolean(this.maps[`${map.x}_${map.y}`]);
      const distance = Phaser.Math.Distance.BetweenPoints(player, {
        x: x + chunkSize * tileSize / 2,
        y: y + chunkSize * tileSize / 2
      });
      if (distance < radius && !spawned) {
        const displayMap = this.make.tilemap({
          key: mapName,
          tileWidth: tileSize,
          tileHeight: tileSize,
          width: chunkSize,
          height: chunkSize
        });
        const tiles = displayMap.addTilesetImage(
          tileName,
          tileName, tileSize, tileSize, 0, 0
        );
        const layer = displayMap.createLayer(map.layer, tiles);
        layer.setPosition(x, y);
        layer.setDepth(-1);
        this.maps[`${map.x}_${map.y}`] = displayMap;
      } else if (spawned && distance >= radius) {
        this.maps[`${map.x}_${map.y}`]?.destroy();
        delete this.maps[`${map.x}_${map.y}`];
      }
    })
  }

  create() {
    this.graphics = this.add.graphics();

    this.maps = {}
    this.player = this.matter.add.sprite(0, 0, 'boat');
    this.player.setMass(50);
    this.player.setFriction(0.5);
    this.player.setFixedRotation();
    this.player.setOrigin(0.5);
    this.playerCircle = new Phaser.Geom.Circle(0, 0, 120);


    // const postFxPlugin = this.plugins.get('rexDropShadowPipeline');
    // postFxPlugin
    //   .add(this.player, {
    //     blur: 3,
    //     distance: 0,
    //     shadowColor: 0xff0000,
    //     alpha: 0.3
    //   });

    this.cameras.main.startFollow(this.player, true);

    this.add.existing(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'snooze',
      frames: [
        {key: 'boat_frame_1'},
        {key: 'boat_frame_2'},
        {key: 'boat_frame_3'},
        {key: 'boat_frame_4'}
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
      this.player.setAngularVelocity(-velor * 6);
    }
    if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(velor * 6);
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
