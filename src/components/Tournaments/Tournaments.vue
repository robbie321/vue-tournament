<template>
  <v-container>
    <v-layout row wrap v-for="tournament in tournaments" :key="tournament.id" mb-2>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="elevation-5">
          <v-container fluid>
            <v-layout column>
              <v-flex xs5 sm4 md3>
                <v-img :src="tournament.imageURL"></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h4 class="black--text" mb-0>{{tournament.title}}</h4>
                    <div>Closing date: {{tournament.cdate | date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/tournaments/' + tournament.id">
                    View Tournament
                    <v-icon left light>arrow_forward</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    tournaments() {
      return this.$store.getters.loadedTournaments;
    }
  }
};
</script>
