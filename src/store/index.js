import Vue from "vue";
import Vuex from "vuex";

import tournament from "./tournaments";
import user from "./user";
import shared from "./Shared";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    tournament: tournament,
    user: user,
    shared: shared
  }
});
