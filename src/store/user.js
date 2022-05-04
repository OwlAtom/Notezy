import { defineStore } from "pinia";

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
  }),
  actions: {
    setUser(user) {
      this.email = user.email;
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      this.uid = user.uid;
    },
    clearUser() {
      this.email = null;
      this.displayName = null;
      this.photoURL = null;
      this.uid = null;
    },
  },
});
