import Vue from "vue";

Vue.mixin({
  computed: {
    wallet() {
      return this.$store.state.auth.wallet;
    },
    balance() {
      return this.$store.state.auth.balance;
    }
  },
  methods: {
    timeSince(dateStr, isCountdown = false) {
      const date = new Date(dateStr);
      const compareDate = new Date();
      let seconds = Math.floor((isCountdown ? date - compareDate : compareDate - date) / 1000);
      let isN = true;
      if (seconds < 0) {
        isN = false;
        seconds = 0 - seconds;
      }
      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years " + (isN ? "left" : "ago");
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months " + (isN ? "left" : "ago");
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days " + (isN ? "left" : "ago");
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours " + (isN ? "left" : "ago");
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes " + (isN ? "left" : "ago");
      }
      return Math.floor(seconds) + " seconds " + (isN ? "left" : "ago");
    },
    timeSinceFull(dateStr, isCountdown = false) {
      const date = new Date(dateStr);
      const compareDate = new Date();
      const seconds = Math.floor((isCountdown ? date - compareDate : compareDate - date) / 1000);
      let interval = seconds / 31536000;
      let out = "";
      if (interval > 1) {
        out += `${Math.floor(interval)} years `;
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        out += `${Math.floor(interval)} months `;
      }
      interval = seconds / 86400;
      if (interval > 1) {
        out += `${Math.floor(interval)} days `;
      }
      interval = seconds / 3600;
      if (interval > 1) {
        out += `${Math.floor(interval)} hours `;
      }
      interval = seconds / 60;
      if (interval > 1) {
        out += `${Math.floor(interval)} minutes `;
      }
      out += `${Math.floor(seconds)} seconds `;
      return out
    },
    normalizeAdd(add) {
      if (add) {
        return `${add.substr(0, 5)}...${add.substr(35, 42)}`
      }
      return "0x000...0000"
    },
    nFormatter(num, digits) {
      const lookup = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "k"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "G"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"}
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      const item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    },
    pFormatter(num) {
      if (num < 0.001) {
        return `${num.toExponential(3)}`
      } else {
        return new Intl.NumberFormat(
          'en-US',
          {style: 'currency', currency: 'USD', maximumSignificantDigits: 4 }
        ).format(num)
      }
    }
  }
});
