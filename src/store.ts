import Vue from 'vue';
import Vuex from 'vuex';
import { format } from "date-fns";

Vue.use(Vuex);

interface ITweets {
  [key: string]: any[];
}

interface IState {
  tweets: ITweets;
  until: string;
  type: string;
  lang: string;
}

const state: IState = {
  tweets: {},
  until: format(Date.now(), "YYYY-MM-DD"),
  type: "mixed",
  lang: "en",
};

export default new Vuex.Store({
  state,
  mutations: {
    ['PUSH-TWET'](state, tweets) {
      // mutate state
      state.tweets[tweets.keyword] = tweets.statuses;
    },
    ['FLUSH-TWET'](state) {
      state.tweets = {};
    },
    ['PUSH-DATE'](state, date) {
      // mutate state
      state.until = date;
    },
    ['PUSH-TYPE'](state, type) {
      // mutate state
      state.type = type;
    },
    ['PUSH-LANG'](state, lang) {
      // mutate state
      state.lang = lang;
    },

  },
  actions: {

  },
  getters: {
    getTwet: (state) => {
      return state.tweets;
    },
    getQueries: (state) => {
      return [state.lang, state.until, state.type];
    }
  },
});
