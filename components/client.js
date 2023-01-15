import Vue from "vue";
import Game from "@/components/Game";
import Test from "@/components/Test";

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;

    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        return callback.call(vm, event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});
Vue.component('game', Game)
Vue.component('test', Test)
