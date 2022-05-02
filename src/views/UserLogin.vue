<template>
  <div>
    <button @click="googleSignIn">Sign In with Google</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

const auth = getAuth();
import { mapActions } from "pinia";
import { userStore } from "../store/user";

export default {
  name: "SignUp",
  mounted() {
    // only check redirect result _tokenResponse is not null
    // if _tokenResponse is null, it means user is not redirected from google sign in
    getRedirectResult(auth)
      .then((result) => {
        // if the user is visiting this page, without being redirected from google sign in
        // the result object will not contain any valid token
        if (!result?._tokenResponse) {
          return;
        }
        // The signed-in user info.
        const user = result.user;
        // write to store
        this.setUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
        // redirect to home
        this.$router.push({ name: "Home" });
      })
      .catch((error) => {
        // Handle Errors here.
        console.warn(error);
      });
  },
  methods: {
    googleSignIn: function () {
      signInWithRedirect(auth, provider);
    },
    ...mapActions(userStore, ["setUser"]),
  },
};
</script>

<style></style>
