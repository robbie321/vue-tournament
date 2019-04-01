import * as firebase from "firebase";
import { stat } from "fs";

export default {
  state: {
    user: null
  },
  //change state
  mutations: {
    registerUserForTournament(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredTournaments.findIndex(
          meetup => meetup.id === id
        ) >= 0
      ) {
        return;
      }
      state.user.registeredTournaments.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserFromTournament(state, payload) {
      const registeredTournaments = state.user.registeredTournaments;
      registeredTournaments.splice(
        registeredTournaments.findIndex(meetup => meetup.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  //dispatch mutations
  actions: {
    registerUserForTournament({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registrations/")
        .push(payload)
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
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registrations/")
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
    // registerUserForTournament({ commit, getters }, payload) {
    //   commit("setLoading", true);
    //   const user = getters.user;
    //   firebase
    //     .database()
    //     .ref("tournaments/" + payload)
    //     .child("/players/")
    //     .push(user.id)
    //     .then(data => {
    //       commit("setLoading", false);
    //       commit("registerUserForTournament", { id: payload, fbKey: data.key });
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       commit("setLoading", false);
    //     });
    // },

    // unregisterUserFromTournament({ commit, getters }, payload) {
    //   commit("setLoading", true);
    //   const user = getters.user;
    //   if (!user.fbKey) {
    //     return;
    //   }
    //   console.log(payload);
    //   console.log(user.id);
    //   const fbKey = user.fbKey[payload];
    //   firebase
    //     .database()
    //     .ref("tournaments/" + payload + "/players/" + user.id)
    //     .child(fbKey)
    //     .remove()
    //     .then(() => {
    //       commit("setLoading", false);
    //       commit("unregisterUserFromTournament", payload);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       commit("setLoading", false);
    //     });
    // },
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
        .child("/players/")
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
      // let groups = [...new Array(players.length / 6)];
      // for (i = 0; i < groups.length; i++) {
      //   for (j = 0; j < players.length; j++) {
      //       groups[i] = players[j];
      //   }
      // }
      // firebase
      //   .database()
      //   .ref("tournaments/" + id)
      //   .child("/groups/")
      //   .set(players);
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          user.user
            .updateProfile({
              displayName: payload.gamertag
            })
            .then(() => {
              commit("setLoading", false);
              const newUser = {
                id: user.user.uid,
                gamertag: user.user.displayName,
                registeredTournaments: [],
                fbKeys: {}
              };
              commit("setUser", newUser);

              console.log("gamertag: " + newUser.gamertag);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            gamertag: user.displayName,
            registeredTournaments: [],
            fbKeys: {}
          };
          //   console.log("Signed user in " + gamertag);

          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({ commit, getters }, payload) {
      commit("setUser", {
        id: payload.uid,
        gamertag: payload.displayName,
        registeredTournaments: [],
        fbKeys: {}
      });
      //   console.log("Signed user in " + getters.user.gamertag);
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id + "/registrations/")
        .once("value")
        .then(data => {
          const dataPairs = data.val();
          //properties: fbKey, value: tournament ID
          let registeredTournaments = [];
          //swap data pairs object so that properties: tournamentID and value: fbKey
          let swappedPairs = [];
          for (let key in dataPairs) {
            registeredTournaments.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            gamertag: getters.user.gamertag,
            registeredTournaments: registeredTournaments,
            fbKeys: swappedPairs
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    // fecthGamertag({ commit, getters }) {
    //   commit("setLoading", true);
    //   firebase
    //     .database()
    //     .ref("/users/" + getters.user.id + "/gamertag/")
    //     .once("value");
    // },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  //get tabel in our components
  getters: {
    user(state) {
      return state.user;
    },
    registeredTournaments() {
      return state.user.registeredTournaments;
    }
  }
};
