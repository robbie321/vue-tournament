
<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ tournament.title }}</h3>
          </v-card-title>
          <v-img :src="tournament.imageURL" height="400px"></v-img>
          <v-card-text>
            <div
              class="info--text"
            >Start Date: {{ tournament.sdate | date}} - End Date: {{tournament.edate | date}}</div>
            <div>{{tournament.description}}</div>
          </v-card-text>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register :tournamentId="tournament.id" v-if="userIsAuthenticated"></app-register>
            <v-btn
              id="change"
              v-if="isAdmin"
              v-on:click="makeGroups"
              class="warning"
            >Make Groups</v-btn>
            <!-- <v-btn
              :to="'/tournaments/' + tournament.id +'/group'"
              v-on:click="viewTournament"
              v-if="isStarted"
              class="success"
            >View Tournament</v-btn>-->
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
    return {};
  },
  computed: {
    isAdmin() {
      return this.$store.getters.user.role == "admin" ? true : false;
    },
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
      this.$store.dispatch("MakeGroups", this.id);
      this.$store.dispatch("setStarting", this.id);
    }
  }
};
</script>