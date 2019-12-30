import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./router";
import {
  store
} from "./store";
import DateFilter from "./filter/date";
import Vuetify from "vuetify";
import AlertCmp from "./components/Shared/Alert.vue";

//boostrap
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import RegisterDialog from "./components/Tournaments/Registration/RegisterDialog";

Vue.use(Vuetify);
// Vue.use(BootstrapVue)
Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-register", RegisterDialog);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //initialise firebase
    firebase.initializeApp({
      apiKey: "AIzaSyC3tVP-fuqR9f4xDBrPiINFxMHqq5kYup4",
      authDomain: "tournament-website.firebaseapp.com",
      databaseURL: "https://tournament-website.firebaseio.com",
      projectId: "tournament-website",
      storageBucket: ""
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadTournaments");
  }
}).$mount("#app");