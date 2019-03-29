<template>
  <v-container>
    <v-layout row wrap mb-2>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center text-sm-right text-md-center">
        <v-btn large router to="/tournaments" class="info">My Tournaments</v-btn>

        <v-btn large router to="/tournaments" class="info">View Tournaments</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor:pointer">
          <v-carousel-item
            v-for="tournament in tournaments"
            :src="tournament.imageURL"
            :key="tournament.id"
            @click="onLoadTournament(tournament.id)"
          >
            <div class="title">{{tournament.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-2>
      <v-flex xs12 class="text-xs-center">
        <p>Register for this Tournament</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  //use for vuex getters
  computed: {
    tournaments() {
      return this.$store.getters.featuredTournaments;
    }
  },
  methods: {
    onLoadTournament(id) {
      this.$router.push("/tournaments/" + id);
    }
  }
};
</script>
<style>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2m;
  padding: 10px;
}
</style>

