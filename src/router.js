import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";
//tournaments
import CreateTournament from "./components/Tournaments/CreateTournament";
import Tournaments from "./components/Tournaments/Tournaments";
import Tournament from "./components/Tournaments/Tournament";
import Group from "./components/Tournaments/Groups/viewGroups";
//User
import Profile from "./components/User/Profile";
import Signin from "./components/User/Signin";
import Signup from "./components/User/Signup";
//store
import {
  store
} from './store/'
//aut
import AuthGuard from "./auth-guard";
Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/tournaments",
      name: "Tournaments",
      component: Tournaments,
      beforeEnter: AuthGuard
    },
    {
      path: "/tournament/new",
      name: "CreateTournament",
      component: CreateTournament,
      beforeEnter: (to, from, next) => {
        if (store.getters.user && store.getters.user.role == 'admin') {
          next()
        } else {
          
          next('/')
        }
      },
    },
    {
      path: "/tournaments/:id",
      name: "Tournament",
      props: true,
      component: Tournament,
     // beforeEnter: AuthGuard
    },
    {
      path: "/tournaments/:id/group",
      props: true,
      component: Group,
      beforeEnter: AuthGuard
    },
    {
      path: "/profile",
      props: true,
      name: "profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      beforeEnter: (to, from, next) => {
        if (store.getters.user == null) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
      beforeEnter: (to, from, next) => {
        if (store.getters.user == null) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
});