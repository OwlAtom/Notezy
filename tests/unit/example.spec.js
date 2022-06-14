// a basic first test example
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("basic test", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
  it("has text that says 'Hello Notezy'", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).toMatch("Hello Notezy");
  });
});
