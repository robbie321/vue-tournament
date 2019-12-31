<template>
  <v-container>
    <h1>{{ groups.title }} GROUPS</h1>
    <div>
      <v-card flat tile>
        <v-window v-model="onboarding" reverse>
          <v-window-item v-for="n in length" :key="`card-${n}`">
            <v-card color="grey" height="200">
              <div class="fill-height" align="center" justify="center" tag="v-card-text">
                <h1 style="font-size: 5rem;" class="white--text">Slide {{ n }}</h1>
              </div>
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
      <div>
        <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
          </template>
        </v-data-table>
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
      // headers: [
      //   {
      //     text: "Group Name",
      //     align: "left",
      //     sortable: false,
      //     value: "title"
      //   },
      //   { text: "Played", value: "played" },
      //   { text: "Won", value: "won" },
      //   { text: "Draw", value: "draw" },
      //   { text: "Lost", value: "lost" },
      //   { text: "Points", value: "points" }
      // ],
      groups: [
        {
          title: "group 1",
          played: "0",
          won: "0",
          drawn: "0",
          lost: "0",
          points: "0"
        }
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
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
