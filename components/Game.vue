<template>
  <div>
    <div class="h-screen w-screen flex justify-center" id="game"/>
  </div>
</template>

<script>
import Game from '@/plugins/fishing/Game';
import config from "@/plugins/fishing/config";

export default {
  name: "Game",
  data() {
    return {
      scores: []
    }
  },
  mounted() {
    window.API_DOMAIN = this.$config.API_DOMAIN;
    window.game = new Game(config);
    window.game.events.on('hidden', function () {

    }, this);

    window.game.events.on('visible', function () {

    }, this);

    window.focus();
    // window.intervalx = setInterval(() => {
    //   this.scores = Object.keys(window.game.scene.scenes[1].players).map(key => ({
    //     key,
    //     score: window.game.scene.scenes[1].players[key].score,
    //     totalScore: window.game.scene.scenes[1].players[key].totalScore
    //   })).sort((x, y) => y.score - x.score)
    // }, 500)
  },
  beforeDestroy() {
    if (window.intervalx) {
      clearInterval(window.intervalx)
    }
  }
}
</script>

<style>
#game canvas {
  margin: 0 auto !important;
}
</style>
