import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  mutations: {
    fetchData(state, data) {
      state.data = data;
    },
  },
  actions: {
    async fetchDataAsync(ctx) {
      const response = await fetch(
        "http://contest.elecard.ru/frontend_data/catalog.json"
      );
      const json = await response.json();
      ctx.commit("fetchData", json);
    },
  },
  modules: {},
  getters: {
    getData: (state) => state.data,
  },
});
