<template>
  <div class="w-full flex justify-center" id="game"/>
</template>

<script>
import Game from '@/plugins/oxacircle/Game';
import config from "@/plugins/oxacircle/config";

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
