import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export default {
  parent: 'game',
  title: 'Dino',
  url: 'https://github.com/Autapomorph/dino',
  version: '1.2.1',
  type: Phaser.WEBGL,
  banner: true,
  render: {
    antialias: false,
  },
  backgroundColor: '#dff6f5',
  scale: {
    // mode: Phaser.Scale.,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 500,
    height: 500,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y:0 },
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
  },
  maxAlpha: 0.75
};
