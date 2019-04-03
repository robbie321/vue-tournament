<template>
  <v-container>
    <h1>{{tournament.title}} GROUPS</h1>
    <v-data-table
      :headers="headers"
      :items="groups"
      :pagination.sync="pagination"
      :total-items="totalDesserts"
      class="elevation-5"
    >
      <!-- <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.played }}</td>
        <td class="text-xs-right">{{ props.item.won }}</td>
        <td class="text-xs-right">{{ props.item.draw }}</td>
        <td class="text-xs-right">{{ props.item.lost }}</td>
        <td class="text-xs-right">{{ props.item.points }}</td>
      </template>-->
    </v-data-table>
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
      return [tournament.players];
    }
  }
};
</script>
<style scoped>
</style>


