import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    sidebarVisible: true,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
  },
  getters: {
    sidebarVisible: state => state.sidebarVisible,
  },
};
