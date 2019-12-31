
export default {
  state: {
    loading: false,
    error: null
  },
  //change state
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },

  //dispatch mutations
  actions: {
    clearError({ commit }) {
      commit("clearError");
    }
  },
  //get tabel in our components
  getters: {
    loading(state) {

      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
};
