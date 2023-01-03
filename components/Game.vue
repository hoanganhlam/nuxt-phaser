<template>
  <div class="w-full flex justify-center" id="game"/>
</template>

<script>
import Game from '@/plugins/ninosaur/Game';
import config from "@/plugins/ninosaur/config";

export default {
  name: "Game",
  mounted() {
    window.game = new Game(config);
    window.focus()
  }
}
</script>

<style scoped>

</style>
