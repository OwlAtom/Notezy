<template>
  <div>
    <button @click="googleSignOut">log out</button>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

import { mapActions } from "pinia";
import { userStore } from "../store/user";

export default {
  name: "logoutButton",
  methods: {
    googleSignOut() {
      signOut(auth)
        .then(() => {
          // clear user info
          this.clearUser();
          // router redirect to landing
          this.$router.push({ name: "Landing" });
        })
        .catch((error) => {
          // An error happened.
          console.error(error);
        });
    },
    ...mapActions(userStore, ["clearUser"]),
  },
};
</script>
