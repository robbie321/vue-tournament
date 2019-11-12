<template>
  <v-container>
    <h1>{{ tournament.title }} GROUPS</h1>
    <div>
      <b-table
        striped
        bordered
        outlined
        small
        hover
        dark
        fixed
        :items="getPlayers"
        :fields="fields"
      ></b-table>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      totalPlayers: 0,
      players: [
        {
          title: "skimpyfrag",
          played: "10",
          won: "10",
          draw: "0",
          lost: "0",
          points: "30"
        }
      ],
      fields: ["title", "played", "won", "draw", "lost", "points"],
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
    getPlayers() {
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
      return [tournament.players];
    }
  }
};
</script>
<style scoped></style>
