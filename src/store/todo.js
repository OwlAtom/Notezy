import { defineStore } from "pinia";

export const todoStore = defineStore("todo", {
  state: () => ({
    todoLists: [
      {
        name: "Today",
        id: 1,
        items: [
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: true,
          },
          {
            name: "Task",
            completed: true,
          },
        ],
      },
      {
        name: "Work",
        id: 2,
        items: [
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: true,
          },
        ],
      },
      {
        name: "Cleaning",
        id: 3,
        items: [
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: false,
          },
          {
            name: "Task",
            completed: true,
          },
        ],
      },
    ],
  }),
  actions: {
    addTodoList(list) {
      this.todoLists.push(list);
    },
    removeTodoList(id) {
      this.todoLists = this.todoLists.filter((list) => list.id !== id);
    },
  },
  persist: {
    afterRestore: (context) => {
      console.log(`rehydrated ${context.store.todoLists.length} todo lists`);
    },
  },
});
