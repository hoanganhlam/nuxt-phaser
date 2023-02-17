<template>
  <div>
    <div class="flex justify-center" id="game"/>
    <div class="fixed">
      <div class="flex gap-4">
        <div>{{ scores.current.toFixed(0) }}</div>
        <div>{{ scores.total.toFixed(0) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '@/plugins/ninosaur_2/Game';
import config from "@/plugins/ninosaur_2/config";

export default {
  name: "Game",
  data() {
    return {
      scores: {
        current: window.playerScore || 0,
        total: window.totalPlayerScore || 0
      }
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
    window.itv = setInterval(() => this.sync(), 1000)
  },
  beforeDestroy() {
    if (window.itv) {
      clearInterval(window.itv)
    }
  },
  methods: {
    sync() {
      this.scores.total = window.totalPlayerScore || 0;
      this.scores.current = window.playerScore || 0;
    }
  }
}
</script>

<style>
#game canvas {
  margin: 0 auto !important;
}
</style>
