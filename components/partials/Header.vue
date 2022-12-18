<template>
  <header class="h-14">
    <div class="max-w-lg mx-auto flex h-14 items-center justify-center space-x-8 px-4 font-bold">
      <div class="flex space-x-8 items-center justify-center">
        <nuxt-link class="site-title uppercase font-sans" to="/">
          <h1 class="text-3xl leading-none uppercase font-extrabold">
            <span class="text-green-700">W</span>
          </h1>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Search from "@/components/partials/Search";

export default {
  name: "PHeader",
  components: {Search},
  methods: {
    ...mapActions('auth', [
      'login',
      'logout'
    ])
  },
  computed: {
    ...mapGetters('auth', [
      'getUserName',
      'loggedIn'
    ])
  }
}
</script>
