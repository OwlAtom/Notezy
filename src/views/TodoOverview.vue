<template>
  <div class="todo">
    <h1>todo-lists</h1>
    <div class="todo-lists">
      <div
        class="todo-list"
        v-for="(list, index) in todoStore.todoLists"
        :key="index"
        @click="openTodoList(list.id)"
      >
        <h2>{{ list.name }}</h2>
        <div
          class="todo-items"
          v-for="(item, index) in list.items"
          :key="index"
        >
          <div class="todo-item">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <!-- this has to be a button for aria purposes -->
      <button class="add-todo" @click="addTodoList">
        <span>+</span> New Todo List
      </button>
    </div>
  </div>
</template>

<script>
import { todoStore } from "../store/todo";
export default {
  name: "TodoOverview",
  computed: {
    todoStore() {
      return todoStore();
    },
  },
  mounted() {
    console.log("was mounted");
    // this.todoLists = this.todoLists;
  },
  methods: {
    addTodoList() {
      const todoList = {
        name: "New List",
        id: Date.now(),
        items: [
          {
            name: "Task",
            completed: false,
          },
        ],
      };
      this.todoStore.addTodoList(todoList);
    },
    openTodoList(id) {
      console.log("open todo list");
      console.log(id);
      //remove it from the store
      this.todoStore.removeTodoList(id);

      this.$router.push({
        name: "TodoList",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
h1 {
  text-transform: uppercase;
  margin-top: 1.5em;
}
.todo-lists {
  // todo: masonry layout
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  margin-top: 1em;
}
.todo-list {
  width: 9em;
  margin: 0.5em;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 -3px 6px 0px rgb(0 0 0 / 16%);
  background-color: #fafafa;
  height: min-content;
}
h1 {
  font-size: 1.5em;
  text-align: center;
}
.add-todo {
  margin: 0.5em;
  padding: 1em;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
  border-radius: 0.5em;
  background-color: #fafafa;
  box-shadow: 0 -3px 6px 0px rgb(0 0 0 / 16%);
  font-size: 1em;
  padding: 0.5em;
  cursor: pointer;
  border: 1px dashed #ccc;

  > span {
    // this is a fake temporary button
    // please change to a svg when styling rest of page
    font-size: 3.5em;
    border-radius: 100%;
    width: 0.5em;
    height: 0.5em;
    line-height: 0.5em;
    text-align: center;
    padding: 0.2em;
    color: rgb(111, 111, 111);
    border: 4px solid rgb(111, 111, 111);
  }
}
</style>
