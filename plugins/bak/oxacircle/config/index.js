import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

import { isProd } from '../utils';

export default {
  parent: 'game',
  title: 'Dino',
  url: 'https://github.com/Autapomorph/dino',
  version: '1.2.1',
  type: Phaser.WEBGL,
  backgroundColor: '#FFFFFF',
  banner: true,
  render: {
    antialias: false,
  },
  scale: {
    width: 800,
    height: 800,
    mode: Phaser.Scale.ScaleModes.NONE,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  }
};
