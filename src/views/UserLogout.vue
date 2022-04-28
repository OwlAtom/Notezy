<template>
  <div>
    <button @click="googleSignOut">Sign out</button>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
export default {
  name: "SignOut",
  methods: {
    googleSignOut: () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("sign out successful!");
        })
        .catch((error) => {
          // An error happened.
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
