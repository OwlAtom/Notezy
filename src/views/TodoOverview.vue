<template>
  <main class="todo">
    <h1 class="big-title">todo-lists</h1>
    <div class="todo-lists">
      <SimplifiedTodoListVue
        v-for="(list, index) in todoStore.todoLists"
        :key="index"
        :list="list"
      />
      <AddTodoButton />
    </div>
  </main>
</template>

<script>
import { todoStore } from "../store/todo";
import SimplifiedTodoListVue from "@/components/SimplifiedTodoList.vue";
import AddTodoButton from "@/components/AddTodoButton.vue";

export default {
  name: "TodoOverview",
  components: {
    SimplifiedTodoListVue,
    AddTodoButton,
  },
  computed: {
    todoStore() {
      return todoStore();
    },
  },
  mounted() {
    // when page is hidden, save to firebase
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.todoStore.saveToFirebase();
      }
    });
    // https://caniuse.com/?search=visibilitychange
    // 😡🍎
    // https://caniuse.com/?search=pagehide
    window.addEventListener("pagehide", () => {
      debugger;
      this.todoStore.saveToFirebase();
    });
  },
};
</script>

<style lang="less" scoped>
.todo-lists {
  // todo: masonry layout
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
}
</style>
