// mounts an entire view with pinia as a plugin to test the view with all subcomponents and data
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";

import TodoOverview from "@/views/TodoOverview.vue";

describe("todoOverview tests", () => {
  const wrapper = mount(TodoOverview, {
    global: {
      plugins: [createPinia()], // createPinia() is a function that returns a Pinia instance so we can just test on the entire view instead of the individual components
    },
  });
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("renders the default lists with text containing 'Press and hold'", () => {
    expect(wrapper.find(".todo-list").text()).toContain("Press and hold");
    // press and hold is a taks from our store
  });
});
