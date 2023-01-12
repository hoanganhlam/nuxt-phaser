<template>
  <div class="py-16 font-sans space-y-4">
    <div class="mx-auto max-w-lg space-y-4">
      <div class="flex gap-6 justify-between">
        <div class="flex gap-3">
          <div
            v-for="(value, key) in modes"
            :key="key"
            class="p-1.5 cursor-pointer border"
            :class="{'border-transparent': mode !== value}"
            @click="mode = value"
          >
            <icon :name="key"></icon>
          </div>
          <div class="p-1 px-2 border flex gap-2">
            <input
              v-model="size.c" class="outline-none w-12" type="number" placeholder="Width"
              @input="onChange"
            >
            <input
              v-model="size.r" class="outline-none w-12" type="number" placeholder="Height"
              @input="onChange"
            >
          </div>
        </div>
        <div
          class="bg-green-500 px-6 py-1 font-semibold text-white cursor-pointer"
          @click="copy"
        >Copy
        </div>
      </div>
      <div class="flex w-full">
        <div v-for="(x, i) in palette" class="flex-1 cursor-pointer" @click="pointer = i">
          <div class="cell" :style="{backgroundColor: x}"></div>
        </div>
      </div>
    </div>
    <div
      class="mx-auto max-w-lg"
      @mouseup="isHolding = false"
      @mousedown="isHolding = true"
      @mouseleave="isHolding = false"
    >
      <div v-for="(x, i) in data" class="flex w-full">
        <div
          v-for="(y, j) in x" class="flex-1"
          @click="setColor(i, j)"
          @mouseover="onMouseover(i, j)"
        >
          <div
            class="cell"
            :style="{backgroundColor: y === '.' ? '#EEE': palette[y]}"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const debounce = require("lodash.debounce")

export default {
  name: "editor",
  data() {
    return {
      modes: {
        draw: 0,
        remove: 1
      },
      size: {
        r: 16,
        c: 16
      },
      data: [],
      palette: [
        '#000000',
        '#9D9D9D',
        '#FFFFFF',
        '#BE2633',
        '#E06F8B',
        '#493C2B',
        '#A46422',
        '#EB8931',
        '#F7E26B',
        '#2F484E',
        '#44891A',
        '#A3CE27',
        '#1B2632',
        '#005784',
        '#31A2F2',
        '#B2DCEF'
      ],
      pointer: '#000000',
      isHolding: false,
      mode: 0
    }
  },
  methods: {
    setSize() {
      const mt = []
      for (let i = 0; i < this.size.r; i++) {
        const temp = []
        for (let j = 0; j < this.size.c; j++) {
          temp.push('.')
        }
        mt.push(temp)
      }
      this.data = mt
    },
    setColor(x, y) {
      if (this.mode === this.modes.draw) {
        this.$set(this.data[x], y, this.pointer)
      } else if (this.mode === this.modes.remove) {
        this.$set(this.data[x], y, '.')
      }
    },
    onMouseover(x, y) {
      if (this.isHolding) {
        this.setColor(x, y)
      }
    },
    copy() {
      const x = []
      this.data.forEach(row => {
        let str = ''
        row.forEach(item => {
          if (item !== '.') {
            str = str + (item).toString(16).toUpperCase()
          } else {
            str = str + '.'
          }
        })
        x.push(str)
      })
      navigator.clipboard.writeText(JSON.stringify(x));
    },
    onChange: debounce(function () {
      this.setSize()
    }, 800)
  },
  created() {
    this.setSize()
  }
}
</script>

<style>
.cell {
  @apply flex-1;
  padding-top: 100%;
}
</style>
