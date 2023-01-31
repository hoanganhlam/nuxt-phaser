import Phaser from 'phaser';
import CONFIG from '../../config/game';
import MAIN_CONFIG from "@/plugins/ninosaur_2/config";

class Chunk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.tiles = this.scene.add.group();
    this.isLoaded = false;
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true);

      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      for (let x = 0; x < this.scene.chunkSize; x++) {
        for (let y = 0; y < this.scene.chunkSize; y++) {
          const tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
          const tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);
          const perlinValue = Phaser.Math.RND.pick([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2])

          let key = "";
          if (perlinValue === 1) {
            key = "sprWater";
          } else if (perlinValue === 2) {
            key = "sprSand";
          } else if (perlinValue === 3) {
            key = "sprGrass";
          }
          const tile = new Tile(this.scene, tileX, tileY, key);
          tile.setDepth(0)
          this.tiles.add(tile);
        }
      }

      this.isLoaded = true;
    }
  }
}

class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }
}

/**
 * Main game scene
 * @class GameScene
 * @extends {Phaser.Scene}
 */
class GameScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.GAME;

  constructor() {
    super(GameScene.CONFIG.NAME);
    this.moveCam = false;
  }

  create() {
    this.chunkSize = 16;
    this.tileSize = 16;

    const map = this.make.tilemap({key: 'fishing_map'});
    const tileWorld = map.addTilesetImage('fishing_tiles');
    this.world = map.createLayer("l1", tileWorld);
    this.world.setPosition(0, 0)
    this.world.displayWidth = MAIN_CONFIG.scale.width;
    this.world.displayHeight = MAIN_CONFIG.scale.height;
    this.matter.world.convertTilemapLayer(this.world);

    this.chunks = [];
    // this.cameras.main.setBounds(-500, -500, 500 * 2, 500 * 2);
    // this.matter.world.setBounds(-500, -500, 500 * 2, 500 * 2);
    this.player = this.matter.add.sprite(50, 50, 'sprGrass');
    this.cameras.main.startFollow(this.player, true);
    this.player.setDepth(1);
    this.add.existing(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  getChunk(x, y) {
    let chunk = null;
    for (let i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x === x && this.chunks[i].y === y) {
        chunk = this.chunks[i];
      }
    }
    return chunk;
  }

  updates(time, xxx) {
    let snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.player.x / (this.chunkSize * this.tileSize));
    let snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.player.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        const existingChunk = this.getChunk(x, y);
        if (existingChunk == null) {
          const newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
        }
      }
    }

    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i];
      if (Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.x,
        chunk.y
      ) < 3) {
        if (chunk) {
          chunk.load();
        }
      } else {
        if (chunk) {
          chunk.unload();
        }
      }
    }

    this.player.setVelocity(0);

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-5);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(5);
    }

    if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-5);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.setVelocityY(5);
    }
  }
}

export default GameScene;
