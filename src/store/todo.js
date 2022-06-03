import { defineStore } from "pinia";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

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
    removeTodoList(id) {
      this.todoLists = this.todoLists.filter((list) => list.id !== id);
    },
    addTodoItem(listId, item) {
      const list = this.todoLists.find((list) => list.id === listId);
      list.items.push(item);
    },
    removeTodoItem(listId, itemId) {
      const list = this.todoLists.find((list) => list.id === listId);
      list.items = list.items.filter((item) => item.id !== itemId);
    },
    // beforeunload:
    saveToFirebase() {
      set(refTodos, this.todoLists);
    },
    // if user is logged in and trying to view their todo lists
    loadFromFirebase() {
      onValue(refTodos, (snapshot) => {
        // debug console logging
        snapshot.val().forEach((list) => {
          console.log(list);
          list.items.forEach((item) => {
            console.log(item);
          });
        });
        this.todoLists = snapshot.val();
      });
    },
  },
  persist: {
    afterRestore: (context) => {
      console.log(`rehydrated ${context.store.todoLists.length} todo lists`);
    },
  },
});
