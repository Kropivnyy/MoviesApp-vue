import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './sidebar-store';
import movies from './movies-store';
import rect from './rect-store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUserFromLS(state, user) {
      if (user) {
        state.user = user;
      }
    },

    loginUser(state, payload) {
      state.user = payload;
    },

    logoutUser(state) {
      state.user = null;
    },
  },
  actions: {},
  getters: {
    user: state => state.user,
  },

  modules: {
    sidebar,
    movies,
    rect,
  },
});
