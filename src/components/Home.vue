<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card-text class="header" style="text-align: center">
          <h1>GAME TOURNAMENTS IRELAND</h1>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-layout row wrap mb-2>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center text-sm-right text-md-center">
        <v-btn large router to="/tournaments" class="homeButton">My Tournaments</v-btn>

        <v-btn large router to="/tournaments" class="homeButton">View Tournaments</v-btn>
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
        <p style="color:grey">Register for this Tournament</p>
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
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Righteous");
h1 {
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 4rem;
  font-weight: 600;
  font-family: "Righteous", cursive;
  text-decoration: none;
  text-align: center;
  color: white;
  display: block;
  background-size: 120% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -ms-background-clip: text;
  -ms-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  background-image: linear-gradient(45deg, #7794ff, #44107a, #ff1361, #fff800);
  animation: 0.8s shake infinite alternate;
  animation-delay: 1s;
}

@keyframes shake {
  0% {
    transform: skewX(-15deg);
  }
  5% {
    transform: skewX(15deg);
  }
  10% {
    transform: skewX(-15deg);
  }
  15% {
    transform: skewX(15deg);
  }
  20% {
    transform: skewX(0deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2m;
  padding: 10px;
}

/* 
.homeButton {
  background-image: linear-gradient(
    to bottom,
    #e1dee1,
    #e6e1e6,
    #eae4ea,
    #efe8ef,
    #f3ebf4
  );
}

.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  font-size: 4rem;
  font-weight: 600;
  font-style: unset;
  word-spacing: 0.6rem;
  display: block;
  width: 100%;
  text-align: center;
} */
</style>

