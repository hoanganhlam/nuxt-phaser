import Phaser from 'phaser';

import CONFIG from '../../config/game';
import GameScene from "@/plugins/bak/oxacircle/scenes/game/GameScene";

// import GameScene from '../game/GameScene';

/**
 * Boot game scene
 * @class BootScene
 * @extends {Phaser.Scene}
 */
class BootScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.BOOT;

  /**
   * Creates an instance of BootScene
   */
  constructor() {
    super(BootScene.CONFIG.NAME);
  }

  preload() {
    this.load.tilemapTiledJSON('ninosaur', '/ninosaur/map.json');
    this.load.image('cavesofgallet_tiles', '/ninosaur/cavesofgallet_tiles.png');
    this.load.spritesheet('nino-doux', '/ninosaur/sprite/doux.png', {frameWidth: 24, frameHeight: 24});

    this.load.audio('player-action', '/dino/sounds/player-action.mp3');
    this.load.audio('achievement', '/dino/sounds/achievement.mp3');
    this.load.audio('gameover', '/dino/sounds/gameover.mp3');

    for (let i = 1; i <= 4; i++) {
      this.load.image(`ball_${i}`, `/ninosaur/sprite/ball/ball${i}.png`);
    }

    for (let i = 1; i <= 4; i++) {
      this.load.image(`mushroom_${i}`, `/ninosaur/sprite/mushroom/mushroom${i}.png`);
    }

    for (let i = 1; i <= 4; i++) {
      this.load.image(`piranha_${i}`, `/ninosaur/sprite/piranha/piranha-plant-shoot${i}.png`);
    }

    this.load.image('tree_palm', '/ninosaur/sprite/tree/palm.png');
    this.load.image('tree_pine', '/ninosaur/sprite/tree/pine.png');
    this.load.image('tree_tree', '/ninosaur/sprite/tree/tree.png');

    this.textures.generate('chick', {
      data: ["000.......00000.........", "0A000...000AAB0.........", "0AAA00..0AAAAB00000.....", "0AABA0.0AAAAABBBBB0.....", "0AAAA0.0AA0AAAAAAB00....", "00AAA0.0AAAAAAA0ABB0....", ".0AAA0.0AAAAAAAABB00....", ".00AA000AAA0AAABB00.....", "..00000AAAAAAAAB00......", ".....00AAAAAAAAB0.......", "....00AAAAAAAABB0.......", "....0AAAA0AAABB00.......", "....0AAAAAAAAB00........", "....0AAAAAAAAB0.........", "....0AA0AAAAAB0.........", "....0AAAAAAA0B0.........", "....00AAAAAAAB0.........", ".....00AAAAAAB0.........", "......00AAAAAA00........", "......00AA0AAAA0........", ".......00AAAAAA0........", "........00AAAAA0........", ".........00AAAA0........", "..........000000........"],
      pixelWidth: 1,
    });

    this.textures.generate('rock', {
      data: ["................", "................", "................", "................", "................", "................", "................", "......0000......", "..0000011000....", "..0111111110000.", ".001011111111100", ".011111111111110", "0011111111111110", "0111111111111110", "0111111111111100", "000000000000000."],
      pixelWidth: 1,
    });
  }

  create() {
    this.scene.start(GameScene.CONFIG.NAME);
  }
}

export default BootScene;
