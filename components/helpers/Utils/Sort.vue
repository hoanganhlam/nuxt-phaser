<template>
  <div>
    <div class="data-select" :class="{active: active}">
      <div class="cursor-pointer" @focus="handleFocus()" @click="active = !active">
        <icon :name="icon" :fill="temp === 0 ? '#DDD' : '#bcfb41'"></icon>
      </div>
      <div class="wrap w-64 text-left" :class="{active: active}">
        <div class="absolute bg-red-500 rounded-full p-0.5 -top-2 -left-2 cursor-pointer" @click="deActive">
          <icon name="close" class="sm" fill="#FFF"></icon>
        </div>
        <div class="p-2 shadow">
          <div
            v-for="item in values" :key="item.value"
            class="p-1 border cursor-pointer"
            :class="{'border-transparent': item.value !== temp, 'bg-green-50': item.value === temp}"
            @click="temp = item.value">
            <div class="flex text-xs space-x-2 py-1">
              <icon name="sort" class="cursor-pointer"></icon>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: {
    value: {
      default: 0,
      type: Number,
    },
    icon: {
      default: 'sort',
      type: String
    }
  },
  data() {
    return {
      active: false,
      temp: this.value,
      values: [
        {value: 0, title: "Clear order"},
        {value: 1, title: "Ascending"},
        {value: -1, title: "Descending"}
      ]
    }
  },
  computed: {},
  watch: {
    temp() {
      this.$emit('input', this.temp)
    }
  },
  methods: {
    deActive() {
      this.active = false;
    },
    select(item) {

    },
    handleFocus() {
      this.active = true;
    },
  }
}
</script>

<style scoped>

</style>
