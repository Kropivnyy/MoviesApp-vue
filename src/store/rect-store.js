import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    actorsRect: {},
  },
  mutations: {
    setActorsRectFromLS(state, actorsRect) {
      state.actorsRect = actorsRect;
    },
    removeActorsRectFromLS(state) {
      state.actorsRect = [];
    },

    addNewRect(state, { actorUrl, rectProps }) {
      if (state.actorsRect[actorUrl]) {
        state.actorsRect[actorUrl] = [...state.actorsRect[actorUrl], rectProps];
      } else {
        state.actorsRect[actorUrl] = [rectProps];
      }
    },
  },
  getters: {
    actorsRect: state => state.actorsRect,
  },
};
