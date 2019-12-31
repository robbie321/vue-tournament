import * as firebase from "firebase";
import {
  stat
} from "fs";

export default {

  //HARD CODED TOURNAMENTS
  state: {
    loadedTournaments: [{
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmbkHic4R31bSOrXSuNAYA0sU8FsNK2gr31bbEn2c0BJqUqQZ",
        id: "1",
        title: "Kilkenny FIFA Tournament",
        description: "",
        sdate: new Date().toDateString(),
        edate: new Date().toDateString(),
        cdate: new Date().toDateString()
      },
      {
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmbkHic4R31bSOrXSuNAYA0sU8FsNK2gr31bbEn2c0BJqUqQZ",
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
    loadTournaments({
      commit
    }) {
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
              number_of_players: obj[key].number_of_players,
              groups: obj[key].groups,
              players: obj[key].players,
              sdate: obj[key].setLoading,
              edate: obj[key].edate,
              cdate: obj[key].cdate,
              isStarted: obj[key].isStarted
            });
          }
          commit("setLoadedTournaments", tournaments);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createTournament({
      commit
    }, payload) {
      const tournament = {
        title: payload.title,
        description: payload.description,
        imageURL: payload.imageURL,
        players: [], //this is the array for storing all the players information
        number_of_players: payload.number_of_players,
        groups: payload.groups,
        sdate: payload.sdate,
        edate: payload.edate,
        cdate: payload.cdate,
        isStarted: false,
        //# creating a unique key to store it in .this node also
        key:firebase.database().ref().push().key
      };
      firebase
        .database()
        .ref("tournaments/"+tournament.key)
        .set(tournament)
        .then(data => {
          const key = data.key;
          commit("createTournament", {
            ...tournament,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    //CREATE GROUPS
    MakeGroups(state,payload) {
      console.log('pay : ',payload)
      firebase.database().ref('users').once('value',snap=> {
        var allData = snap.val()
        for(var data in allData) {
          
        }
      })
    },

    setStarting({
      commit,
      getters
    }, payload) {
      firebase
        .database()
        .ref("tournaments/" + payload)
        .update({
          isStarted: true
        });
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