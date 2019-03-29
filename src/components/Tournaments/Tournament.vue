
<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ tournament.title }}</h3>
          </v-card-title>
          <v-card-media :src="tournament.imageURL" height="400px"></v-card-media>
          <v-card-text>
            <div
              class="info--text"
            >Start Date: {{ tournament.sdate | date}} - End Date: {{tournament.edate | date}}</div>
            <div>{{tournament.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register v-if="isAdmin" :tournamentId="tournament.id"></app-register>
            <v-btn v-on:click="makeGroups" v-else class="warning">Make Groups</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      test: {},
      isAdmin: false
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    tournament() {
      return this.$store.getters.loadedTournament(this.id);
    }
  },
  methods: {
    makeGroups() {
      // alert("hello");
      console.log("HERE ");
      // return this.tournament;
      this.$store.dispatch("MakeGroups", this.tournament);
    }
  }
};
</script>