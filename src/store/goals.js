import { defineStore } from "pinia";

export const goalStore = defineStore("goals", {
  state: () => ({
    goals: [
      {
        id: 1,
        title: "Learn Vue3",
        description: "Learn Vue3",
        color: 4,
        plan: {
          specificDays: [true, false, true, true, false, true, false],
        },
      },
      {
        id: 2,
        title: "Learn React",
        description: "Learn React",
        color: 3,
        plan: {
          // check for if specificDays is undefined
          repeats: 3,
        },
      },
    ],
  }),
});
