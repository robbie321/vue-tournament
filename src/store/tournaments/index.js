import * as firebase from "firebase";
import { stat } from "fs";

export default {
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
    ]
  },
  //change state
  mutations: {
    setLoadedTournaments(state, payload) {
      state.loadedTournaments = payload;
    },
    createTournament(state, payload) {
      state.loadedTournaments.push(payload);
    }
  },

  //dispatch mutations
  actions: {
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
              players: obj[key].players,
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
        players: [],
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
    }
  }
};
