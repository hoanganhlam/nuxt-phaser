<template>
  <div class="modal" v-if="modal">
    <div class="modal-wrap">
      <div class="mask" @click="closeModal"></div>
      <div class="body">
        <div>
          <div class="close" @click="closeModal">
            <icon name="close" class="medium"></icon>
            <span>close</span>
          </div>
        </div>
        <div class="p-4 flex-1 relative">
          <div class="absolute top-0 left-0 right-0 bottom-0 overflow-auto">
            <div class="bg-white p-4">
              <modal-validate v-if="modal.type === 'validate'" :instance="modal.data"/>
              <div v-else-if="modal.type === 'auth'" class="py-8">
                <img class="w-1/4 cursor-pointer mx-auto" src="/metamask.svg" alt="" @click="$web3.connect()">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalValidate from "./ModalValidate";

export default {
  name: "Adapter",
  components: {ModalValidate},
  computed: {
    modal() {
      return this.$store.state.config.modal
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('config/SET_MODAL', null)
    }
  }
}
</script>

<style>
.modal {
  @apply fixed top-0 left-0 right-0 bottom-0 z-30;
}

.modal .mask {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-green-800 opacity-40;
}

.modal .modal-wrap {
  @apply fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col items-center justify-center;
}

.modal .body {
  width: calc(100% - 32px);
  @apply md:w-1/2 lg:w-1/3 mx-auto relative z-20 flex flex-col;
  max-width: 450px;
  height: 85%;
}

.modal .close {
  @apply cursor-pointer px-4 py-3 bg-white inline-flex text-xs inline-flex space-x-2 items-center font-bold uppercase rounded-tl rounded-tr border-b;
}
</style>
