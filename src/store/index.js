import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    // loading: false
  },
  mutations: {
    fetchData(state, data) {
      state.data = data;
    },
    loader(state, data) {
      state.loading = data
    }
  },
  actions: {
    async fetchDataAsync(ctx) {
      // ctx.commit('loader', true)
      const response = await fetch(
        "http://contest.elecard.ru/frontend_data/catalog.json"
      );
      const json = await response.json();
      ctx.commit("fetchData", json);
      // ctx.commit('loader', false)
    },
  },
  modules: {},
  getters: {
    getData: (state) => state.data,
    // getLoading: (state) => state.loading
  },
});
