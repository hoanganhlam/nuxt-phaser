import Phaser from 'phaser';
import CONFIG from '../../config/game';
import Player from '../../prefabs/player/Player';
import Ship from '../../prefabs/ship/Ship';
const chunkSize = 40;
const tileSize = 16;
const mapName = 'map';
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
    // this.mainPlayer = new Player(this);
    this.mainPlayer = new Ship(this);
    this.maps = {}
    this.add.circle(0, 0, 2, 0xff0000)
    this.cameras.main.startFollow(this.mainPlayer, true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, xxx) {
    this.spawnMap(this.mainPlayer);
    const velor = 0.001
    if (this.cursors.left.isDown) {
      this.mainPlayer.setAngularVelocity(-velor * 5);
    }
    if (this.cursors.right.isDown) {
      this.mainPlayer.setAngularVelocity(velor * 5);
    }
    if (this.cursors.up.isDown) {
      this.mainPlayer.thrust(velor * 2);
    } else {
      this.mainPlayer.thrust(velor);
    }
    if (this.cursors.down.isDown) {
      this.mainPlayer.thrustBack(velor / 2);
    }
    this.mainPlayer.update();
    // this.ship.thrust(velor / 1.5)
    // this.ship.rotation = Phaser.Math.Angle.BetweenPoints(this.ship, this.mainPlayer);
  }
}

export default GameScene;
