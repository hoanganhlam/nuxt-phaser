export default {
  namespaced: true,
  state: () => ({
    response: {
      results: [],
      count: 0
    },
  }),
  mutations: {
    ['SET_RESPONSE'](state, r) {
      state.response = r;
    },
    ['APPEND'](state, res) {
      const check = res && state.response.results.map(x => x.id).includes(res.id);
      if (!check && res) {
        state.response.results.push(res);
      }
    },
  },
}
