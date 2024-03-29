import { defineStore } from "pinia";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { cyrb53 } from "./cyrb53";

const db = getDatabase();
const auth = getAuth();
let refTodos = null;
auth.onAuthStateChanged((user) => {
  if (user) {
    refTodos = ref(db, "users/" + user.uid + "/todo");
  }
});

export const todoStore = defineStore("todo", {
  state: () => ({
    lastHash: null,
    todoLists: [
      {
        name: "Today",
        id: "1",
        items: [
          {
            name: "Click me!",
            completed: false,
            id: "1_1",
          },
          {
            name: "Press and hold",
            completed: false,
            id: "1_2",
            subtasks: [
              {
                name: "To open subtasks",
                completed: false,
                id: "1_2_1",
              },
              {
                name: "Subtask 2",
                completed: false,
                id: "1_2_2",
              },
            ],
          },
          {
            name: "Task 3",
            completed: true,
            id: "1_3",
          },
          {
            name: "Task 4",
            completed: true,
            id: "1_4",
          },
        ],
      },
      {
        name: "Work",
        id: "2",
        items: [
          {
            name: "Task",
            completed: false,
            id: "2_1",
          },
          {
            name: "Task",
            completed: false,
            id: "2_2",
          },
          {
            name: "Task",
            completed: true,
            id: "2_3",
          },
        ],
      },
      {
        name: "Cleaning",
        id: "3",
        items: [
          {
            name: "Task",
            completed: false,
            id: "3_1",
          },
          {
            name: "Task",
            completed: false,
            id: "3_2",
          },
          {
            name: "Task",
            completed: true,
            id: "3_3",
          },
        ],
      },
    ],
  }),
  actions: {
    addTodoList(list) {
      this.todoLists.push(list);
      // save to firebase
    },
    removeTodoList(listId) {
      this.todoLists = this.todoLists.filter((list) => list.id !== listId);
    },
    addTodoItem(listId, item) {
      const list = this.todoLists.find((list) => list.id === listId);
      list.items.push(item);
    },
    removeTodoItem(listId, itemId) {
      const list = this.todoLists.find((list) => list.id === listId);
      list.items = list.items.filter((item) => item.id !== itemId);
    },
    saveToFirebase() {
      console.log("trying to save to firebase");
      // to prevent users from wasting all our quota, save a hash of the last state and compare it to a hash of the current state to see if anything changed
      const stateHash = cyrb53(JSON.stringify(this.todoLists));
      console.log(stateHash);
      if (stateHash === this.lastHash) {
        console.log("nothing changed, not saving");
        return;
      }
      this.lastHash = stateHash;
      // ? should we also time limit this, eg save only if 15 seconds have passed since last save?
      // save to firebase
      console.log("saving to firebase");
      set(refTodos, this.todoLists);
    },
    // todo: if user is logged in and trying to view their todo lists, run this
    async loadFromFirebase() {
      const HoursBetweenLoads = 4;
      if (
        this.lastLoad &&
        Date.now() - this.lastLoad < HoursBetweenLoads * 60 * 60 * 1000
      ) {
        return;
      }
      this.lastLoad = Date.now();
      if (!refTodos) {
        await new Promise((resolve) => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              refTodos = ref(db, "users/" + user.uid + "/todo");
              resolve();
            }
          });
        });
      }
      onValue(refTodos, (snapshot) => {
        // set the state to the value of the snapshot
        this.todoLists = snapshot.val();
      });
    },
  },
  persist: {
    afterRestore: (context) => {
      console.log(`rehydrated ${context.store.todoLists.length} todo lists`);
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
