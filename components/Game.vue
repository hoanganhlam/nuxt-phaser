<template>
  <div>
    <div class="flex justify-center" id="game"/>
  </div>
</template>

<script>
import Game from '@/plugins/ninosaur_2/Game';
import config from "@/plugins/ninosaur_2/config";

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
    window.game.events.on('hidden', function () {}, this);
    window.game.events.on('visible', function () {}, this);
    window.focus();
  },
}
</script>

<style>
#game canvas {
  margin: 0 auto !important;
}
</style>
