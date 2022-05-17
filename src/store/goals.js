import { defineStore } from "pinia";

export const goalStore = defineStore("goals", {
  state: () => ({
    goals: [
      {
        id: 1,
        title: "Learn Vue3",
        description: "Learn Vue3",
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
      {
        id: 3,
        title: "Learn Angular",
        description: "Learn Angular",
        color: 3,
        plan: {
          specificDays: [true, false, false, true, false, true, true],
        },
      },
      {
        id: 4,
        title: "Learn Node",
        description: "Learn Node",
        color: 4,
        plan: {
          repeats: 3,
        },
      },
    ],
  }),
});
