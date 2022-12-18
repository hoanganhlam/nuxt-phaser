export default {
  namespaced: true,
  state: () => ({
    loggedIn: false,
    forceLogin: false,
    connector: null,
    wallet: null,
    balance: {
      khv: 0,
      khh: 0,
      kht: 0
    }
  }),
  mutations: {
    ['SET_WALLET'](state, wallet) {
      state.wallet = wallet;
    },
    ['FORCE_LOGIN'](state) {
      state.forceLogin = !state.forceLogin;
    },
    ['SET_BALANCE'](state, balance) {
      state.balance = balance;
    },
  },
  actions: {
    login(context) {
      context.commit('config/SET_MODAL', {type: "auth"}, {root: true})
    },
    logout(context) {
      context.commit('SET_WALLET', null);
    },
    setWallet(context, wallet) {
      context.commit('SET_WALLET', wallet)
    }
  },
  getters: {
    getUserName: state => {
      return state.wallet ? `${state.wallet.substr(0, 4)}...${state.wallet.substr(38, 42)}` : 'Anonymous';
    },
    loggedIn: state => {
      return !!Boolean(state.wallet)
    }
  }
}
