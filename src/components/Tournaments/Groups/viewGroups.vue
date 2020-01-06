<template>
  <v-container>
    <div>
      <h1 style="text-align:center">{{tournament.title}}</h1>
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
          <v-flex xs12 md6 v-for="(fixture, i) in fixtures" :key="i">
            <v-card v-for="(item,key, j) in fixture" :key="j" class="ma-2">
              <h4 class="text-xs-center pa-4">{{key}}</h4>
              <hr />
              <v-card-text v-for="(round, k) in item" :key="k" class="text-xs-center">
                <span v-for="(players , x) in round" :key="x">
                  <span v-for="(p, y) in players" :key="y">
                    <span
                      v-if="iiiii != 'player1'"
                      class="headline"
                      style="color:red"
                    >&nbsp;VS&nbsp;</span>
                    <span class="title">&nbsp;{{p.title}} &nbsp;</span>
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
