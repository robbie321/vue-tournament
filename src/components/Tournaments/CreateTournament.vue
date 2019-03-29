<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new tournament</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="OnCreateTournament">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageURL"
                label="Image URL"
                id="image-url"
                v-model="imageURL"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageURL" height="200">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Registration End Date</h4>
            </v-flex>
          </v-layout>
          <v-layout row mb-2>
            <v-flex xs12 sm6 offset-sm3>
              <datepicker v-model="cdate"></datepicker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Tournament Start Date</h4>
            </v-flex>
          </v-layout>
          <v-layout row mb-2>
            <v-flex xs12 sm6 offset-sm3>
              <datepicker v-model="sdate"></datepicker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Tournament End Date</h4>
            </v-flex>
          </v-layout>
          <v-layout row mb-2>
            <v-flex xs12 sm6 offset-sm3>
              <datepicker v-model="edate"></datepicker>
            </v-flex>
          </v-layout>
          <!-- <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"
                            ></v-time-picker>
                            <p>{{time}}</p>
                        </v-flex>
          </v-layout>-->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Tournament</v-btn>
              <!-- {{submittableDateTime}} -->
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container>
            <!-- ADMIN ACTIONS -->
            <form
              @submit.prevent="makeUserAdmin"
              class="center-align admin-actions"
              style="margin: 40px auto; max-width: 300px;"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Mail"
                    id="admin-email"
                    placeholder="User email"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex class="xs12 sm6 offset-sm3">
                  <v-btn color="warning" type="submit" :loading="loading" :disabled="loading">
                    Make Admin
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
              <!-- <button class="btn-small yellow darken-2 z-depth-0">Make admin</button> -->
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import moment from 'moment'
import datepicker from "vue-date";
export default {
  data() {
    return {
      email: "",
      title: "",
      imageURL: "",
      description: "",
      sdate: new Date().toDateString(),
      edate: new Date().toDateString(),
      cdate: new Date().toDateString()
      // time: new Date()
    };
  },
  components: {
    datepicker
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" && this.description !== "" && this.imageURL !== ""
      );
    },
    startDate() {
      const sdate = new Date(this.sdate).toDateString();

      return sdate;
    },
    endDate() {
      const edate = new Date(this.edate).toDateString();
      return edate;
    },
    registerEndDate() {
      const cdate = new Date(this.cdate).toDateString();
      return cdate;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    OnCreateTournament() {
      if (!this.formIsValid) {
        return;
      }
      const tournamentData = {
        title: this.title,
        description: this.description,
        imageURL: this.imageURL,
        sdate: this.startDate,
        edate: this.endDate,
        cdate: this.cdate
      };
      this.$store.dispatch("createTournament", tournamentData);
      this.$router.push("/tournaments");
    },
    makeUserAdmin() {
      this.$store.dispatch("makeUserAdmin", {
        email: this.email
      });
    }
  }
};
</script>
