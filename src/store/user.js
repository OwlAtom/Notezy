import { defineStore } from "pinia";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

import { getAuth } from "firebase/auth";

const auth = getAuth();

// proxy used for testing alternative methods
// not used because it's not working
// var stateProxy = new Proxy(state, {
//   set: function (target, key, value) {
//     console.log(`${key} set to ${value}`);
//     target[key] = value;
//     return true;
//   },
// });

const state = {
  displayName: null,
  photoURL: null,
  uid: null,
  loggedIn: false,
};

const actions = {
  setUser(user) {
    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    this.uid = user.uid;
  },
  clearUser() {
    this.displayName = null;
    this.photoURL = null;
    this.uid = null;
  },
  init() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.setUser(user);
        console.log("user is logged in");
      } else {
        this.loggedIn = false;
        this.clearUser();
        console.log("user is not logged in");
      }
    });
  },
};

// use something to persist the data between sessions
// possible solutions:
// https://github.com/prazdevs/pinia-plugin-persistedstate
// https://seb-l.github.io/pinia-plugin-persist/
// or something else?

// removed persistedstate because its no longer needed
// kept the code here for reference
const persist = {
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
    if (context.store.displayName && context.store.photoURL) {
      context.store.wasRehydrated = true;
    } else {
      context.store.wasRehydrated = false;
    }
  },
  serializer: {
    // called when the store is saved
    serialize: (state) => {
      let a = compressToUTF16(JSON.stringify(state.loggedIn));
      console.log(a);
      return a;
    },
    // called when the store is loaded
    deserialize: (state) => {
      let loggedIn = JSON.parse(decompressFromUTF16(state));
      console.log(loggedIn);
      return { loggedIn };
    },
  },
};

persist;

export const userStore = defineStore("user", {
  state: () => state,
  actions,
});
