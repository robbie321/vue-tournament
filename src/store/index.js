import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import { stat } from "fs";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedTournaments: [
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmbkHic4R31bSOrXSuNAYA0sU8FsNK2gr31bbEn2c0BJqUqQZ",
        id: "1",
        title: "Kilkenny FIFA Tournament",
        description: "",
        sdate: new Date().toDateString(),
        edate: new Date().toDateString(),
        cdate: new Date().toDateString()
      },
      {
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmbkHic4R31bSOrXSuNAYA0sU8FsNK2gr31bbEn2c0BJqUqQZ",
        id: "2",
        title: "Dublin FIFA Tournament",
        description: "",
        sdate: new Date().toDateString(),
        edate: new Date().toDateString(),
        cdate: new Date().toDateString()
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  //change state
  mutations: {
    registerUserForTournament(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredTournaments.findIndex(
          tournament => tournament.id === id
        ) >= 0
      ) {
        return;
      }
      state.user.registeredTournaments.push(id);
      state.user.fbKey[id] = payload.fbKey;
    },
    unregisterUserFromTournament(state, payload) {
      const registeredTournaments = state.user.registeredTournaments;
      registeredTournaments.splice(
        registeredTournaments.findIndex(
          tournament => tournament.id === payload
        ),
        1
      );
      Reflect.deleteProperty(state.user.fbKey, payload);
    },

    setLoadedTournaments(state, payload) {
      state.loadedTournaments = payload;
    },
    createTournament(state, payload) {
      state.loadedTournaments.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setAdmin(state, payload) {
      state.isAdmin = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  //dispatch mutations
  actions: {
    // registerUserForTournament({ commit, getters }, payload) {
    //   commit("setLoading", true);
    //   const user = getters.user;
    //   firebase
    //     .database()
    //     .ref("/users/" + user.id)
    //     .child("/registration/")
    //     .push(payload)
    //     .then(data => {
    //       commit("setLoading", false);
    //       commit("registerUserForTournament", { id: payload, fbKey: data.key });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       commit("setLoading", false);
    //     });
    // },
    registerUserForTournament({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("tournaments/" + payload)
        .child("/users/")
        .push(user.id)
        .then(data => {
          commit("setLoading", false);
          commit("registerUserForTournament", { id: payload, fbKey: data.key });
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },

    unregisterUserFromTournament({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKey) {
        return;
      }
      const fbKey = user.fbKey[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registration/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserFromTournament", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    MakeGroups(commit, payload) {
      // const user = getters.user;
      //tournament id
      const id = payload.id;
      const title = payload.title;
      const players = [];
      // const tournament = getters.loadedTournament(id);
      console.log(
        players +
          "\n" +
          "Groups have been formed for group " +
          title +
          " with id " +
          id
      );

      firebase
        .database()
        .ref("tournaments/" + id)
        .child("/users/")
        .once("value", data => {
          // let key = data.key;
          // let childKey = data.child("/users").key;
          console.log(data.val());
          data.forEach(function(snapshot) {
            // let key = snapshot.key;
            let childData = snapshot.val();
            players.push(childData);
            console.log(players);
          });
        });

      /**
       * TODO
       * when all players are put into 'players' array
       * seperate into new group table
       *
       * a group will have a group number and an even amount of
       * players (derived from dividing the players array by number
       * of players per group)
       *
       *  */
    },
    loadTournaments({ commit }) {
      firebase
        .database()
        .ref("tournaments")
        .once("value")
        .then(data => {
          const tournaments = [];
          const obj = data.val();
          for (let key in obj) {
            tournaments.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageURL: obj[key].imageURL,
              sdate: obj[key].setLoading,
              edate: obj[key].edate,
              cdate: obj[key].cdate
            });
          }
          commit("setLoadedTournaments", tournaments);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createTournament({ commit }, payload) {
      const tournament = {
        title: payload.title,
        description: payload.description,
        imageURL: payload.imageURL,
        sdate: payload.sdate,
        edate: payload.edate,
        cdate: payload.cdate
      };
      firebase
        .database()
        .ref("tournaments")
        .push(tournament)
        .then(data => {
          const key = data.key;
          commit("createTournament", { ...tournament, id: key });
        })
        .catch(error => {
          console.log(error);
        });
      //reach to fire base to store it
      // commit('createTournament', tournament)
    },
    //make admin

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            gamertag: "skimpy",
            registeredTournaments: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            gamertag: payload.gamertag
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredTournaments: []
        // gamertag: user.gamertag
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  //get tabel in our components
  getters: {
    loadedTournaments(state) {
      //returns new array
      return state.loadedTournaments.sort((tourA, tourB) => {
        return tourA.date > tourB.date;
      });
    },
    registeredTournament() {
      return state.user.registeredTournaments;
    },
    featuredTournaments(state, getters) {
      return getters.loadedTournaments.slice(0, 3);
    },
    //single Tournament
    loadedTournament(state) {
      return tournamentID => {
        return state.loadedTournaments.find(tournament => {
          return tournament.id == tournamentID;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      state.loading;
    },
    error(state) {
      return state.error;
    },
    admin(state) {
      return state.isAdmin;
    }
  },
  setters: {}
});
