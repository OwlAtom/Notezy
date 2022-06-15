import { defineStore } from "pinia";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { v4 as uuidv4 } from "uuid";

export const goalStore = defineStore("goals", {
  state: () => ({
    goals: [
      {
        id: 1,
        title: "Learn Vue 3",
        description: "Learn Vue 3",
        color: 1,
        plan: {
          specificDays: [true, false, true, true, false, true, false],
        },
      },
      {
        id: 2,
        title: "Learn React",
        description: "Learn React",
        color: 2,
        plan: {
          // check for if specificDays is undefined
          repeats: 3,
        },
      },
    ],
  }),
  actions: {
    addGoal(goal) {
      goal.id = uuidv4();
      this.goals.push(goal);
    },
    removeGoal(id) {
      this.goals = this.goals.filter((goal) => goal.id !== id);
    },
  },
  persist: {
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
