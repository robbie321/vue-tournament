import * as firebase from "firebase";
import {
  stat
} from "fs";

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
    registerUserForTournament({
      commit,
      getters
    }, payload) {
      commit("setLoading", true);
      const user = getters.user;

      //# using multipath update rather than two explicit firebase queries

      var gamertag = user.gamertag
      var DB = firebase.database()
      var multipath = {}
      var regKey = DB.ref().push().key
      multipath["/users/" + user.id + "/registrations/" + DB.ref().push().key] = payload
      //# not pushing gamertag (Two users can have the same ) pushing there uid instead for keying purpose 
      //# Check MakeGroup()
      multipath["tournaments/" + payload + "/players/" + DB.ref().push().key] = gamertag
      
      firebase.database().ref().update(multipath).then(res => {
        commit("setLoading", false);
        commit("registerUserForTournament", {
          id: payload,
          fbKey: regKey
        });
      }).catch(err => {
        console.log(err)
      })

      //#commented 

      // firebase
      //   .database()
      //   .ref("/users/" + user.id)
      //   .child("/registrations/")
      //   .push(payload)
      //   .then(data => {
      //     commit("setLoading", false);
      //     commit("registerUserForTournament", {
      //       id: payload,
      //       fbKey: data.key
      //     });
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     commit("setLoading", false);
      //   });
      // //add players gamertag to tournament
      // firebase
      //   .database()
      //   .ref("tournaments/" + payload)
      //   .child("/players/")
      //   .push(user.gamertag)
      //   .then(() => {
      //     // let playerKey = data.key;
      //     commit("setLoading", false);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     commit("setLoading", false);
      //   });

    },
    unregisterUserFromTournament({
      commit,
      getters
    }, payload) {
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

      firebase
        .database()
        .ref("tournaments/" + payload)
        .child("/players/")
        .once("value")
        .then(snapshot => {
          snapshot.forEach(data => {
            let childKey = data.key;
            let childData = data.val();
            if (childData === user.gamertag) {
              firebase
                .database()
                .ref("tournaments/" + payload)
                .child("/players/")
                .child(childKey)
                .remove();
              console.log("Removed from tournament");
            }
            // console.log("key: " + childKey + "\nValue: " + childData + "\n\n");
          });
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    signUserUp({
      commit
    }, payload) {
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
              //# added "role == user" BY DEFAULT (only for admin it can be changed in database)
              const newUser = {
                id: user.user.uid,
                gamertag: user.user.displayName,
                registeredTournaments: [],
                fbKeys: {},
                email: payload.email,
                //#
                role: 'user'
              };

              firebase.database().ref('users/' + user.user.uid).set(newUser).then((res) => {
                commit("setUser", newUser);
                commit("setLoading", false);

                console.log("gamertag: " + newUser.gamertag);
              }).catch(err => {
                console.log('error pushing data to database after sign up :', err)
              })
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({
      commit,
      getters
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          //#fetching data on sign in from users/ node
          firebase.database().ref('users/' + user.uid).once('value', snap => {

            // const newUser = {
            //   id: user.uid,
            //   gamertag: user.displayName,
            //   registeredTournaments: [],
            //   fbKeys: {}
            // };
            //   console.log("Signed user in " + gamertag);
            commit("setUser", snap.val());
            commit("setLoading", false);
          })

        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    // autoSignIn({
    //   commit,
    //   getters,
    //   dispatch
    // }, payload) {

    //   commit("setUser", {
    //     id: payload.uid,
    //     gamertag: payload.displayName,
    //     registeredTournaments: [],
    //     fbKeys: {}
    //   });

    //   dispatch("fetchUserData");

    //   //   console.log("Signed user in " + getters.user.gamertag);
    // },
    autoSignIn({
      commit,
      getters
    }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("users/" + payload.uid)
        .once("value")
        .then(data => {
          const dataPairs = data.val().registrations;
          //properties: fbKey, value: tournament ID
          let registeredTournaments = [];
          //swap data pairs object so that properties: tournamentID and value: fbKey
          let swappedPairs = [];
          for (let key in dataPairs) {
            registeredTournaments.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }

          const updatedUser = data.val()
          updatedUser.registeredTournaments = registeredTournaments
          updatedUser.fbKeys = swappedPairs

          commit("setUser", updatedUser);
          commit("setLoading", false);
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
    logout({
      commit
    }) {
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