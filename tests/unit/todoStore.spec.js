// test for only the pinia store, no vue components here.
// read more about unit testing pinia here: https://pinia.vuejs.org/cookbook/testing.html#unit-testing-a-store
import { setActivePinia, createPinia } from "pinia";
import { todoStore } from "@/store/todo";

describe("todostore tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("removes a todo list by ID", () => {
    const store = todoStore();
    store.removeTodoList("1");
    store.removeTodoList("2");
    expect(store.todoLists).toStrictEqual([
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
    ]);
  });
});
