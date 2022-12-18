<template>
  <div class="text-center">
    <div class="my-4 space-y-2">
      <p>You are voting for {{instance.name}} with</p>
      <div class="text-6xl font-bold">0</div>
      <p>powers</p>
    </div>
    <div>
      <div class="btn pri" @click="sendVote({instance, nft})">Sign and Vote</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ModalValidate",
  props: {
    instance: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      NFTs: [],
      nft: null
    }
  },
  methods: {
    ...mapActions('project', [
      'sendVote',
    ])
  }
}
</script>

<style scoped>

</style>
