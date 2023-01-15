<template>
  <div class="w-full flex justify-center" id="game"/>
</template>

<script>
import Game from '@/plugins/ninosaur_2/Game';
import config from "@/plugins/ninosaur_2/config";

export default {
  name: "Game",
  mounted() {
    window.game = new Game(config);
    window.focus()
  }
}
</script>

<style>
#game canvas {
  margin: 0 auto!important;
}
</style>
