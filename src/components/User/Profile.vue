<template>
  <v-container>
    <v-layout id="change" row xs12 sm12>
      <!-- profile -->
      <v-flex class="xs12 sm6 ma-2">
        <!-- profile title -->
        <v-card class="success elevation-3">
          <v-card-title class="justify-center" style="color:white">PROFILE</v-card-title>
        </v-card>
        <!-- profile content -->
        <v-flex id="profile" class="mt-2">
          <v-card>
            <v-layout class="row">
              <v-flex xs12 sm6>
                <v-card-text>Gamer Tag:</v-card-text>
                <v-card-text>Console:</v-card-text>
              </v-flex>
              <v-flex class="xs12 sm6">
                <v-card-text>{{user.gamertag}}</v-card-text>
                <v-card-text>Xbox</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-flex>

      <!-- tournaments -->
      <v-flex class="xs12 sm6 ma-2">
        <!-- tournaments title -->
        <v-card class="success elevation-3">
          <v-card-title class="justify-center" style="color:white">REGISTERED TOURNAMENTS</v-card-title>
        </v-card>
        <!-- tournaments -->
        <v-flex id="tournaments" class="mt-2">
          <v-layout column wrap v-for="tournament in tournaments" :key="tournament.id" mb-2>
            <v-flex xs12>
              <v-card class>
                <v-container fluid>
                  <v-layout column>
                    <v-flex xs12>
                      <v-img :src="tournament.imageURL" style="height: 200px"></v-img>
                    </v-flex>
                    <v-flex xs7 sm8 md9>
                      <v-card-title primary-title>
                        <div>
                          <h4 class="white--text" mb-0>{{tournament.title}}</h4>
                          <div>Closing date: {{tournament.cdate | date}}</div>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn flat :to="'/tournaments/' + tournament.id">View Tournament</v-btn>
                      </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>

      <!-- settings -->
      <v-flex class="xs12 sm6 ma-2">
        <!-- settings title -->
        <v-card class="success elevation-3" style="color:white">
          <v-card-title class="justify-center">SETTINGS</v-card-title>
        </v-card>
        <!-- settings -->
        <v-flex id="settings" class="mt-2">
          <v-card>
            <v-card-title>{{user.id}}</v-card-title>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    user() {
      return this.$store.getters.user;
    },
    tournaments() {
      return this.$store.getters.loadedTournaments;
    }
  }
};

window.addEventListener("resize", function() {
  if (window.outerWidth < 700) {
    document.getElementById("change").classList.remove("row");

    document.getElementById("change").classList.add("column");
  }
  if (window.outerWidth > 700) {
    document.getElementById("change").classList.remove("column");

    document.getElementById("change").classList.add("row");
  }
});
let row = document.getElementById("change");
</script>
<style>
</style>


