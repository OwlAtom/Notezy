import { defineStore } from "pinia";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";

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
