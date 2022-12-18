import Vue from "vue";

import Icon from "./helpers/Icon/Icon";

Vue.component('icon', Icon);

Vue.mixin({
  methods: {
    pathMedia(src) {
      return `${process.env.API_DOMAIN}${src}`
    }
  }
})
