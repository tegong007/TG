import { createStore } from "vuex";

export default createStore({
  state: (): any => {
    return {
      theme: "dark",
    };
  },
  getters: {
    getTheme: (state) => state.theme,
  },
  mutations: {
    changeTheme(state, newTheme: string) {
      state.theme = newTheme;
    },
  },
  actions: {},
  modules: {},
});
