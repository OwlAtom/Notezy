<template>
  <nav>
    <router-link :to="{ name: 'Landing' }">Landing</router-link>
    <span v-if="loggedIn">
      | <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Todo' }">Todo</router-link> |
      <router-link :to="{ name: 'Todo' }">Notes</router-link> |
      <router-link :to="{ name: 'Todo' }">Goals</router-link>
    </span>
  </nav>
</template>

<script>
import { userStore } from "../store/user";

export default {
  name: "NavigationBar",
  data() {
    return {
      loggedIn: null,
    };
  },
  computed: {
    user() {
      return userStore();
    },
  },
  mounted() {
    // each time the user store changes, update the loggedIn variable
    this.user.$subscribe(() => {
      // set loggedIn to true if user has an email
      // should we also check if the user is logged in with google?
      if (this.user?.email) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
};
</script>
<style lang="less">
nav {
  padding: 30px;

  a {
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
