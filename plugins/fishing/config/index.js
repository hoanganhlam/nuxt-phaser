import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import DropShadowPipelinePlugin from 'phaser3-rex-plugins/plugins/dropshadowpipeline-plugin.js';

export default {
  parent: 'game',
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  banner: true,
  render: {
    antialias: false,
  },
  backgroundColor: '#b6e8dc',
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
    ],
    global: [{
      key: 'rexDropShadowPipeline',
      plugin: DropShadowPipelinePlugin,
      start: true
    }]
  }
};
