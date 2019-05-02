import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweets: [],
  },
  mutations: {
    ['PUSH-TWET'](state, twet) {
      // mutate state
      state.tweets = twet;
    },
  },
  actions: {

  },
  getters: {
    getTwet: (state) => {
      return state.tweets;
    },
  },
});
