<template>
  <v-container>
    <h1>{{ tournament.title }} GROUPS</h1>
    <div>
      <v-card flat tile>
        <v-window v-model="onboarding" reverse>
          <v-window-item v-for="n in length" :key="`card-${n}`">
            <v-card color="grey" height="200">
              <v-row class="fill-height" align="center" justify="center" tag="v-card-text">
                <h1 style="font-size: 5rem;" class="white--text">Slide {{ n }}</h1>
              </v-row>
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
      <b-table striped bordered outlined small hover dark fixed :items="items" :fields="fields"></b-table>
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
          text: "Group Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Played", value: "played" },
        { text: "Won", value: "won" },
        { text: "Draw", value: "draw" },
        { text: "Lost", value: "lost" },
        { text: "Points", value: "points" }
      ],
      groups: [
        {
          title: "group 1",
          played: "0",
          won: "0",
          drawn: "0",
          lost: "0",
          points: "0"
        }
      ]
    };
  },
  props: ["id"],
  computed: {
    tournament() {
      return this.$store.getters.loadedTournament(this.id);
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
