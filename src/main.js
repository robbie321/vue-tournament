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
import VueSweetAlert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
 
//boostrap
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import RegisterDialog from "./components/Tournaments/Registration/RegisterDialog";

Vue.use(Vuetify);
Vue.use(VueSweetAlert)
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
      apiKey: "AIzaSyCBfI6GRvngZUjL4tMly6pPlzd92RygbEI",
      authDomain: "tournament-6a60e.firebaseapp.com",
      databaseURL: "https://tournament-6a60e.firebaseio.com",
      projectId: "tournament-6a60e",
      storageBucket: "tournament-6a60e.appspot.com",
      messagingSenderId: "781246159626",
      appId: "1:781246159626:web:13292a59e218c6e56a78f3"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        //#cut fetchuserdata because it will work only if there's something in store.user
        //check autoSignIn
      }
    });
    this.$store.dispatch("loadTournaments");
  }
}).$mount("#app");