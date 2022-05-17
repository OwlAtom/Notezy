import { defineStore } from "pinia";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

// use something to persist the data between sessions
// possible solutions:
// https://github.com/prazdevs/pinia-plugin-persistedstate
// https://seb-l.github.io/pinia-plugin-persist/
// or something else?
export const userStore = defineStore("user", {
  state: () => ({
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
    wasRehydrated: false, // was the user store rehydrated? (i.e. was the user logged in?)
  }),
  actions: {
    setUser(user) {
      this.email = user.email;
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      this.uid = user.uid;
      this.wasRehydrated = false;
    },
    clearUser() {
      this.email = null;
      this.displayName = null;
      this.photoURL = null;
      this.uid = null;
    },
  },
  persist: {
    // might be a lot to restore?
    // we can get the user details from firebase if the user is logged in
    // should we force a user logout they have no data to restore?
    // local storage can typically store up to 5MB of data
    // it is stored as a UTF-16 DOMString (2 bytes per character)
    // lz-string can compress the data to save space
    // https://github.com/pieroxy/lz-string
    // but for now we will just store the user data in local storage without any bells and whistles
    afterRestore: (context) => {
      // if user has email, displayName and photoURL set,
      // then we can assume that the user is logged in
      if (
        context.store.email &&
        context.store.displayName &&
        context.store.photoURL
      ) {
        context.store.wasRehydrated = true;
      } else {
        context.store.wasRehydrated = false;
      }
    },
    serializer: {
      // called when the store is saved
      serialize: (state) => {
        return compressToUTF16(JSON.stringify(state));
      },
      // called when the store is loaded
      deserialize: (state) => {
        return JSON.parse(decompressFromUTF16(state));
      },
    },
  },
});
