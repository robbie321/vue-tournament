<template>
  <v-app>
    <v-navigation-drawer fixed temporary app v-model="sideNav" style="width: 250px">
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
    <v-toolbar class="justify-center" app>
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">FIFA Tournaments</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
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
export default {
  // name: 'App',

  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "lock", title: "sign in", link: "/signin" },
        { icon: "lock", title: "sign up", link: "/signup" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "home", title: "how it works", link: "/" },
          { icon: "shop", title: "tournaments", link: "/tournaments" },
          { icon: "shop", title: "create", link: "/tournament/new" },
          { icon: "home", title: "Profile", link: "/profile" }
        ];
      } else if (this.userIsAuthenticated && this.userIsAdmin) {
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
      return this.$store.getters.userRight;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      console.log(this.$store.getters.userRight);
    }
  }
};
</script>
<style>
</style>
