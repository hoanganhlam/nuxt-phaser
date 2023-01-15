<template>
  <div class="w-full flex justify-center" id="phaser-example"/>
</template>

<script>
import Phaser from 'phaser';

export default {
  name: "Test",
  mounted() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#2d2d2d',
      parent: 'phaser-example',
      physics: {
        default: 'matter',
        matter: {
          gravity: { x: 0, y:0 },
          debug: true,
        },
      },
      scene: {
        create: create,
        update: update,
        preload:function () {
          this.load.spritesheet('nino-obstacles', '/ninosaur_2/characters_packed.png', {frameWidth: 24, frameHeight: 24});
        }
      }
    };

    var path;
    var curve;
    var graphics;

    function create () {
      this.sp = this.matter.add.sprite(100, 100, 'nino-obstacles', 25)
      path = { t: 0, vec: new Phaser.Math.Vector2() };
      curve = new Phaser.Curves.Line(new Phaser.Math.Vector2(100, 100), new Phaser.Math.Vector2(100, 150));

      this.tweens.add({
        targets: path,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 2000,
        yoyo: true,
        repeat: -1
      });
    }

    function update () {
      curve.getPoint(path.t, path.vec);
      this.sp.setPosition(path.vec.x, path.vec.y)
    }

    window.game = new Phaser.Game(config)
    window.focus()
  }
}
</script>

<style>
#game canvas {
  margin: 0 auto!important;
}
</style>
