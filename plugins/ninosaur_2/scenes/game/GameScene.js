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
    const map = this.make.tilemap({key: 'ninosaur'});
    const tileWorld = map.addTilesetImage('nino-tileset');
    this.world = map.createLayer("world", tileWorld);
    this.world.setPosition(0, 0)
    this.world.displayWidth = MAIN_CONFIG.scale.width;
    this.world.displayHeight = MAIN_CONFIG.scale.height;
    this.world.setCollisionByProperty({type: 'grass'});
    this.matter.world.convertTilemapLayer(this.world);

    this.userGroup = this.matter.world.nextGroup(true);
    this.obstacleCat = this.matter.world.nextCategory()
    this.playerCat = this.matter.world.nextCategory()

    this.obstacles = new Obstacles(this);
    this.player = new Player(this);
  }

  update(time, delta) {
    this.player.update(0)
    this.obstacles.update(0)
  }
}

export default GameScene;
