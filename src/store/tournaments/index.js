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
              isStarted: obj[key].isStarted,
              playerGroups: obj[key].playerGroups,
              fixtures: obj[key].fixtures
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
        key: firebase.database().ref().push().key
      };
      firebase
        .database()
        .ref("tournaments/" + tournament.key)
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
    MakeGroups(state, payload) {
      firebase.database().ref('tournaments/' + payload).once('value', snap => {
        var allData = snap.val()
        var players = allData.players
        var maxGroups = allData.groups
        var maxPlayersInAGroup = allData.number_of_players / maxGroups
        var groupsArray = []
        var fixtures = []

        for (var i = 0; i < maxGroups; i++) {
          var tempArr = []
          for (var j = 0; j < maxPlayersInAGroup; j++) {
            var t = {
              group: i + 1,
              title: players[Object.keys(players)[j]],
              played: 0,
              won: 0,
              drawn: 0,
              lost: 0,
              points: 0
            }
            groupsArray.push(t)
            tempArr.push(t)
          }
          fixtures.push(createFixtures(tempArr))

          //#slicing from object
          players = Object.keys(players).slice(maxPlayersInAGroup).reduce((result, key) => {
            result[key] = players[key];
            return result;
          }, {});

        }

        function createFixtures(gf) {
          var teams = gf
          teams = teams.map(id => ({
            id
          }));
          teams.forEach(team => team.enemies = teams.filter(enemy => enemy !== team));

          const matches = [];

          while (teams.some(team => team.enemies.length)) {
            const playing = [];
            for (const team of teams) {
              if (playing.includes(team)) continue;
              const enemy = team.enemies.find(enemy => !playing.includes(enemy));
              if (!enemy) continue;
              team.enemies.splice(team.enemies.indexOf(enemy), 1);
              enemy.enemies.splice(enemy.enemies.indexOf(team), 1);
              playing.push(team, enemy);
            }
            if (playing.length) matches.push(playing.map(t => t.id))
          }

          //# Matches will provide a squence of each round 
          //### you can change the way how the data will be stored in DB (below) 
          //# then also you have to do a little bit changes in viewGroup.vue file 
          var fixtures = []
          for (var m in matches) {
            var t = matches[m]
            var tt = []
            var i = 0
            while (i < t.length) {
              var obj = {}
              obj['player1'] = t[i]
              obj['player2'] = t[i + 1]
              i = i + 2
              tt.push(obj)
            }
            fixtures.push(tt)
          }
          return fixtures


        }
        var multipath = {}
        multipath['tournaments/' + payload + '/playerGroups'] = groupsArray
        multipath['tournaments/' + payload + '/fixtures'] = fixtures
        firebase.database().ref().update(multipath).then(res => {
        }).catch(err => {
          console.log(err)
        })
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