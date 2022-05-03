<template>
  <nav>
    <!-- <router-link :to="{ name: 'Landing' }">Landing</router-link> -->
    <!-- <span v-if="loggedIn"> -->
    <span>
      <router-link :to="{ name: 'Home' }"><img :src="homeIcon" />Home</router-link>
      <router-link :to="{ name: 'Todo' }"><img :src="todoIcon" />Todo</router-link>
      <router-link :to="{ name: 'Todo' }"><img :src="noteIcon" />Notes</router-link>
      <router-link :to="{ name: 'Todo' }"><img :src="goalIcon" />Goals</router-link>
    </span>
  </nav>
</template>

<script>
import { userStore } from "../store/user";
import homeIcon from "../assets/icons/dashboard_black_24dp.svg";
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";
import noteIcon from "../assets/icons/description_black_24dp.svg";
import goalIcon from "../assets/icons/poll_black_24dp.svg";

export default {
  name: "NavigationBar",
  setup() {
    return {
      homeIcon,
      todoIcon,
      noteIcon,
      goalIcon
    }
  },
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
  padding: .8em 0;
  width: 100%;
  box-shadow: 0 -3px 6px 0px rgb(0 0 0 / 16%);
  border-radius: 1em 1em 0 0;
  position: fixed;
  bottom: 0;

  span {
    display: flex;
    justify-content: space-around;
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 14px;
    
    img {
      height: 2.2em;
      margin-bottom: .4em;
      filter: invert(65%) sepia(12%) saturate(181%) hue-rotate(287deg) brightness(87%) contrast(88%);
    }

    // this class is created with the vue router
    &.router-link-exact-active {
      color: #42b983;

      img {
        filter: invert(62%) sepia(10%) saturate(2272%) hue-rotate(100deg) brightness(99%) contrast(84%);
      }
    }
  }
}
</style>
