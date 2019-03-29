<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{userIsRegistered ? 'Registered' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Regsitered for Tournament</v-card-title>
            <v-card-title v-else>Regsiter for Tournament</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
           <v-card-text>Click the pay now button to register to this tournament</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
           <v-card-actions>
               <v-btn class="red--text darken-1" flat
               @click="registerDialog = false">Cancel</v-btn>
               <v-btn
               class="green--text darken-1" flat
               @click="onAgree">Confirm</v-btn>
           </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
      props:['tournamentId'],
      data(){
          return{
              registerDialog: false
          }
      },
      computed: {
          userIsRegistered(){
              return this.$store.getters.user.registeredTournaments.findIndex(tournamentId =>{
                return tournamentId === this.tournamentId
              }) >= 0
          }
      },
      methods:{
          onAgree(){
            if(this.userIsRegistered){
              this.$store.dispatch('unregisterUserFromTournament', this.tournamentId)
            }else{
              this.$store.dispatch('registerUserForTournament',this.tournamentId)
            }
          }
      }
  }
</script>