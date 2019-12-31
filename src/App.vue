<template>
  <v-app
    v-if="!$store.getters.loading"
    style="background-image: linear-gradient(to right bottom, #cee7f9, #d0e3fe, #d7deff, #e3d7ff, #f2d0f8);"
  >
    <v-navigation-drawer
      fixed
      temporary
      app
      v-model="sideNav"
      style="background-image: linear-gradient(to right bottom, #c2f2f2, #caede5, #d2e7db, #d8e1d6, #dadcd5); width: 250px"
    >
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      class="justify-center"
      style="background-image: linear-gradient(to bottom, #e1dee1, #e6e1e6, #eae4ea, #efe8ef, #f3ebf4);"
      app
    >
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">FIFA Tournaments</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link" style>
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn to="/" flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'App',

  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(["loading"]),
    menuItems() {
      let menuItems = [
        { icon: "lock", title: "sign in", link: "/signin" },
        { icon: "lock", title: "sign up", link: "/signup" }
      ];
      //also add && !this.userIsAdmin so 'admin' must be false
      if (this.userIsAuthenticated && this.userIsAdmin) {
        menuItems = [
          { icon: "home", title: "how it works", link: "/" },
          { icon: "shop", title: "tournaments", link: "/tournaments" },
          { icon: "shop", title: "create", link: "/tournament/new" },
          { icon: "home", title: "Profile", link: "/profile" }
        ];
        console.log("hi", this.userIsAdmin);
      } else if (this.userIsAuthenticated && !this.userIsAdmin) {
        menuItems = [
          { icon: "home", title: "how it works", link: "/" },
          { icon: "shop", title: "tournaments", link: "/tournaments" },
          { icon: "home", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsAdmin() {
      console.log("user role :", this.$store.getters.user);
      return this.$store.getters.user.role == "admin" ? true : false;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    loading(val) {
      if (val == true) {
        this.$swal.showLoading();
      } else {
        this.$swal.close();
      }
    }
  }
};
</script>
<style>
.light-gradient {
  background-image: linear-gradient(
    to right bottom,
    #cee7f9,
    #dae7fa,
    #e5e8f9,
    #ede9f6,
    #f3ebf4
  );
}
</style>
