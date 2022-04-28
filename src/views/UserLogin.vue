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
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log(user, token);
    // pinia = {
    //   email: user.email,
    //   name: user.displayName,
    //   photo: user.photoURL,
    //   token: token,
    // };
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
export default {
  name: "SignUp",
  methods: {
    googleSignIn: function () {
      // We'll create functionality here

      signInWithRedirect(auth, provider);
    },
  },
};
</script>

<style></style>
