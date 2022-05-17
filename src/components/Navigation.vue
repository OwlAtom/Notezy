<template>
  <nav>
    <span v-if="loggedIn">
      <!-- <span> -->
      <router-link :to="{ name: 'Home' }"
        ><img :src="homeIcon" />Dashboard</router-link
      >
      <router-link :to="{ name: 'Todo' }"
        ><img :src="todoIcon" />Todo</router-link
      >
      <router-link :to="{ name: 'Folders' }"
        ><img :src="noteIcon" />Notes</router-link
      >
      <router-link :to="{ name: 'Goals' }"
        ><img :src="goalIcon" />Goals</router-link
      >
    </span>
    <span v-else>
      <router-link :to="{ name: 'Landing' }">Landing</router-link>
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
      goalIcon,
    };
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
    if (this.user.wasRehydrated) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    // each time the user store changes, update the loggedIn variable
    this.user.$onAction(({ args }) => {
      // set loggedIn to true if user has an email
      // should we also check if the user is logged in with google?
      if (args[0]?.email) {
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
  padding: 0.8em 0;
  width: 100%;
  box-shadow: 0 -3px 6px 0px rgb(0 0 0 / 16%);
  border-radius: 1em 1em 0 0;
  position: fixed;
  bottom: 0;
  text-align: center;

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
    width: 25%;

    img {
      height: 2.2em;
      margin-bottom: 0.4em;
    }

    // this class is created with the vue router
    &.router-link-exact-active {
      color: var(--main-blue);

      img {
        filter: invert(44%) sepia(22%) saturate(7152%) hue-rotate(220deg)
          brightness(93%) contrast(86%); // ? saturating by 7152% is too much. maybe just change the color of the icon?
      }
    }
  }
}
</style>
