<template>
  <v-container>
    <!-- <h1>{{ groups.title }} GROUPS</h1> -->
    <div>
      <v-card flat tile>
        <v-window v-model="onboarding" reverse>
          <v-window-item v-for="n in length" :key="`card-${n}`">
            <v-card color="grey" height="200">
              <div class="fill-height" align="center" justify="center" tag="v-card-text">
                <h1 style="font-size: 5rem;" class="white--text">Slide {{ n }}</h1>
              </div>
            </v-card>
          </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
          <v-btn text @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-item-group v-model="onboarding" class="text-center" mandatory>
            <v-item v-for="n in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
              <v-btn :input-value="active" icon @click="toggle">
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
          <v-btn text @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <div>
        <v-data-table :headers="headers" :items="players" hide-actions item-key="title">
          <template v-slot:items="props">
            <tr v-if="props.item.showGroupTitle" colspan="5">
              <td class="headline">Group {{props.item.group}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.played }}</td>
              <td>{{ props.item.won }}</td>
              <td>{{ props.item.drawn }}</td>
              <td>{{ props.item.lost }}</td>
              <td>{{ props.item.points }}</td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <div>
        <h1 class="text-xs-center ma-5">Fixtures</h1>
        <v-layout row wrap>
          <v-flex md4 v-for="(fixture, i) in fixtures" :key="i">
            <v-card v-for="(item,key, ii) in fixture" :key="ii" class="ma-2">
              <h4 class="text-xs-center pa-4">{{key}}</h4>
              <hr />
              <v-card-text v-for="(round, iii) in item" :key="iii" class="text-xs-center">
                <span v-for="(players , iiii) in round" :key="iiii">
                  <span v-for="(p, iiiii) in players" :key="iiiii">
                    <span v-if="iiiii != 'player1'"  class="headline" style="color:red">&nbsp;&nbsp;VS&nbsp;&nbsp;</span>
                    <span class="title">{{p.title}}</span>
                  </span>
                </span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <!-- <b-table striped bordered outlined small hover dark fixed :items="items" :fields="fields"></b-table> -->
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      length: 3,
      onboarding: 0,
      totalPlayers: 0,
      items: [
        {
          Gamertag: "skimpyfrag",
          played: "10",
          won: "10",
          draw: "0",
          lost: "0",
          points: "30"
        }
      ],
      fields: ["Gamertag", "played", "won", "draw", "lost", "points"],
      loading: true,
      pagination: {},
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Played", value: "played" },
        { text: "Won", value: "won" },
        { text: "Draw", value: "draw" },
        { text: "Lost", value: "lost" },
        { text: "Points", value: "points" }
      ]
      // groups: [
      //   {
      //     title: "group 1",
      //     played: 0,
      //     won: 0,
      //     drawn: 0,
      //     lost:0,
      //     points: 0
      //   }
      // ],
    };
  },
  props: ["id"],
  computed: {
    tournament() {
      return this.$store.getters.loadedTournament(this.id);
    },
    players() {
      var playerGroups = this.tournament.playerGroups;
      var arr = [];
      var p = 1;
      for (var group in playerGroups) {
        if (playerGroups[group].group == p) {
          playerGroups[group].showGroupTitle = true;
          p++;
        } else {
          playerGroups[group].showGroupTitle = false;
        }
        arr.push(playerGroups[group]);
      }
      return playerGroups;
    },
    fixtures() {
      var fixtures = this.tournament.fixtures;
      var arr = [];
      for (var fixture in fixtures) {
        var temp = {};
        var p = parseInt(fixture) + 1;
        temp["Group " + p] = fixtures[fixture];
        arr.push(temp);
      }
      return arr;
    }
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    getPlayers() {
      items[
        {
          Gamertag: "skimpyfrag",
          played: "10",
          won: "10",
          draw: "0",
          lost: "0",
          points: "30"
        }
      ];
      //TODO
      //PUT PLAYERS INTO GROUPS
      // players = [tournament().players];
      // for (i = 0; i < players.length; i++) {
      //   group[i] = {
      //     title: players[i].title,
      //     played: players[i].played,
      //     won: players[i].won,
      //     draw: players[i].drawn,
      //     lost: players[i].lost,
      //     points: players[i].points
      //   };
      // }
      print(tournament.players.title);
      // return [tournament.players];
      return items;
    }
  }
};
</script>
<style scoped></style>
