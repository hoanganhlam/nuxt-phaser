import Phaser from 'phaser';

import MAIN_CONFIG from '../../config';
import CONFIG from '../../config/game';
import InputManager from './InputManager';
import SoundManager from './SoundManager';
import Player from '../../prefabs/player/Player';
import Obstacles from '../../prefabs/obstacles';

/**
 * Main game scene
 * @class GameScene
 * @extends {Phaser.Scene}
 */
class GameScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.GAME;

  constructor() {
    super(GameScene.CONFIG.NAME);
    this.layer = null
  }

  init() {
    this.isPlaying = false;
    this.soundManager = new SoundManager(this);
    this.inputManager = new InputManager(this);
  }

  create() {
    const map = this.make.tilemap({ key: 'ninosaur' });
    const tiles = map.addTilesetImage('cavesofgallet_tiles');
    this.wall = map.createLayer("Tile Layer 1", tiles);
    this.wall.setPosition(MAIN_CONFIG.scale.width / 4, MAIN_CONFIG.scale.height / 4)
    this.wall.displayWidth = MAIN_CONFIG.scale.width / 2;
    this.wall.displayHeight = MAIN_CONFIG.scale.height / 2;
    this.wall.setCollisionByProperty({ type: 'grass' });
    this.matter.world.convertTilemapLayer(this.wall);

    this.playerCategory = this.matter.world.nextCategory();
    this.player = new Player(this);
    this.obstacles = new Obstacles(this)

    this.anims.create({
      key: 'mushroom_eat',
      frames: [
        {key: 'mushroom_1'},
        {key: 'mushroom_2'},
        {key: 'mushroom_3'},
        {key: 'mushroom_4'}
      ],
      frameRate: 16,
      repeat: -1
    });

    // const x = this.matter.add.sprite(200 , 40, 'mushroom_1')
    // x.setBounce(0.96)
  }

  update(time, delta) {
    this.player.update(0)
  }
}

export default GameScene;
