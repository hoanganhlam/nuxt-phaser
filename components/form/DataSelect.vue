<template>
  <div class="data-select" :class="{active: active}">
    <div @click="handleFocus">
      <input v-if="!hasDefaultSlot" :value="search" :placeholder="placeholder" :disabled="disabled">
      <slot v-else/>
    </div>
    <div v-if="!disabled" class="wrap" :class="{active: active, ...wrapClass}">
      <input class="fake" ref="clone" v-model="search" :placeholder="placeholder" @input="fetch">
      <div class="border border-t-0 p-3 py-1.5 rounded-bl rounded-br">
        <div v-if="multiple && temp.length" class="-mx-1 mt-1 flex flex-wrap">
          <div class="p-1" v-for="item in display" :key="item.id">
            <div class="flex text-xs bg-green-50 space-x-2 border px-2 py-1">
              <span>{{ getName(item) }}</span>
              <icon name="close" class="sm cursor-pointer" @click="select(item)"></icon>
            </div>
          </div>
        </div>
        <h4 v-if="!search" class="text-gray-500 my-2">
          <span v-if="response.results.length">Select an option bellow:</span>
          <span v-else>Please give me a keyword!</span>
        </h4>
        <div
          class="item" v-for="(item, i) in response.results" :key="i"
          :class="{'active': ![false, -1].includes(isActive(item))}"
          @click="select(item)"
        >
          <span>{{ getName(item) }}</span>
        </div>
        <div v-if="search && !static"
             class="inline-flex space-x-2 cursor-pointer text-sm items-center"
             @click="add()
      ">
          <span class="text-gray-500">Add</span>
          <blockquote>{{ search }}</blockquote>
        </div>
        <div class="absolute bg-red-500 rounded-full p-0.5 -top-2 -right-2 cursor-pointer" @click="deActive">
          <icon name="close" class="sm" fill="#FFF"></icon>
        </div>
      </div>
    </div>
    <div v-if="multiple && temp.length && !hasDefaultSlot" class="-mx-1 flex flex-wrap">
      <div class="p-1" v-for="item in display" :key="item.id">
        <div class="flex text-xs bg-green-50 space-x-2 border px-2 py-1">
          <span>{{ getName(item) }}</span>
          <icon name="close" class="sm cursor-pointer" @click="select(item)"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce, cloneDeep} from "lodash";

const dataSchema = require("~/plugins/data_schema").default;

export default {
  name: "DataSelect",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, Object],
      default: null
    },
    module: {
      default: 'term',
      type: String
    },
    query: {
      type: Object,
      default: () => null
    },
    placeholder: {
      default: "Enter a keyword..."
    },
    static: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    wrapClass: {
      type: Object,
      default: null
    }
  },
  data() {
    let temp = this.value;
    if (this.multiple && !temp) {
      temp = []
    }
    return {
      temp: cloneDeep(temp),
      active: false,
      search: null,
      response: {
        results: [],
        count: 0
      }
    }
  },
  methods: {
    deActive() {
      this.active = false;
      if (this.multiple) {
        this.search = null;
      }
    },
    select(item) {
      const check = this.isActive(item);
      if (this.multiple) {
        if (check >= 0) {
          this.temp.splice(check, 1);
        } else {
          this.temp.push(item);
        }
      } else {
        if (check) {
          this.temp = null;
          this.search = null;
        } else {
          this.temp = item;
          this.search = this.temp.name || this.temp.title;
        }
        this.deActive();
      }
      this.$emit('select', item);
      this.$emit('input', cloneDeep(this.temp));
    },
    isActive(item) {
      if (this.multiple) {
        return this.temp.map(x => x.id).indexOf(item.id);
      } else {
        return Boolean(this.temp && (this.temp.id === item.id));
      }
    },
    fetch: debounce(async function () {
      if (!this.static) {
        this.response = await this.$api[this.module].list({
          ...this.query,
          search: this.search,
          page_size: 5,
          page: 1
        })
      }
    }, 800),
    handleFocus() {
      this.active = true;
      setTimeout(() => {
        this.$refs.clone.focus()
      }, 10);
    },
    add() {
      if (this.static && dataSchema[this.module]) {
        if ( dataSchema[this.module].handleAdd) {
          const data = dataSchema[this.module].handleAdd(this.search);
          if (data) {
            this.$store.commit('dataSelect/APPEND', data);
          }
        }
      } else if (this.wallet) {
        this.$api[this.module].create({
          ...this.query,
          name: this.search,
          title: this.search
        }).then(() => {
          this.fetch()
        })
      }
    },
    getName(obj) {
      if (obj.address) {
        return this.normalizeAdd(obj.address)
      } else if (obj.title) {
        return obj.title
      }
      return obj.name
    },
    navigate(isNext) {
      if (!this.multiple && this.temp) {
        const check = this.response.results.map(x => x.id).indexOf(this.temp.id);
        let temp;
        if (isNext) {
          if (check === this.response.results.length - 1) {
            temp = this.response.results[0]
          } else {
            temp = this.response.results[check + 1]
          }
        } else {
          if (check === 0) {
            temp = this.response.results[this.response.results.length - 1]
          } else {
            temp = this.response.results[check - 1]
          }
        }
        this.select(temp);
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        let term = this.value;
        if (this.multiple && !term) {
          term = []
        }
        if (!this.multiple && !term) {
          this.search = null;
        }
        this.temp = cloneDeep(term);
      }
    }
  },
  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    display() {
      if (this.multiple) {
        const keys = Object.keys(this.query)
        if (keys.length) {
          return this.temp.filter(x => {
            for (let key of keys) {
              if (typeof x[key] === 'object') {
                return x[key].id === this.query[key]
              }
              if (x[key] !== this.query[key]) {
                return false;
              }
            }
            return true;
          })
        }

      }
      return this.temp
    }
  },
  created() {
    if (this.static && dataSchema[this.module]) {
      this.response = {
        results: dataSchema[this.module].default,
        count: dataSchema[this.module].default.length
      }
      if (this.value) {
        const index = dataSchema[this.module].default.map(x => x.id).indexOf(this.value.id)
        if (index >=0) {
          this.temp = dataSchema[this.module].default[index]
          this.search = this.temp.title;
        }
      }
    } else {
      this.fetch();
    }
  }
}
</script>

<style>
@keyframes move-up {
  from {
    transform: translateY(1rem)
  }
  to {
    transform: translateY(0)
  }
}
</style>
