export default {
  namespaced: true,
  state: () => ({
    meta: {
      title: "W.s"
    },
    modal: null,
  }),
  mutations: {
    ['SET_META'](state, data) {
      state.meta = data;
    },
    ["SET_MODAL"](state, payload) {
      state.modal = payload;
    },
  },
  getters: {
    getMeta: state => {
      return state.meta;
    },
  }
}
