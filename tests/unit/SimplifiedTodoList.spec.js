// shows how a single component is tested
// check https://v1.test-utils.vuejs.org/api/wrapper/#vm for instructions on how to test methods on a component

import { mount } from "@vue/test-utils";
import SimplifiedTodoList from "@/components/SimplifiedTodoList.vue";

describe("todolist tests", () => {
  const todoObj = {
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
  };
  const wrapper = mount(SimplifiedTodoList, {
    propsData: { list: todoObj },
  });

  it("renders a todolist", () => {
    expect(wrapper.find(".todo-list").exists()).toBe(true);
  });
  it("renders a todolist with items", () => {
    expect(wrapper.findAll(".todo-item").length).toBe(6);
  });
  it("renders a todolist with items and subtasks", () => {
    expect(wrapper.findAll(".todo-item-subtask").length).toBe(2);
  });
  it("renders a todolist with checked tasks and subtasks crossed out", () => {
    expect(wrapper.findAll(".completed").length).toBe(2);
  });
  it("mounts props correctly", () => {
    expect(wrapper.props().list).toBe(todoObj);
  });
  it("renders an empty page when no props are passed", () => {
    const wrapper = mount(SimplifiedTodoList);
    expect(wrapper.props().list).toStrictEqual({ name: "", id: "", items: [] });
  });
});
