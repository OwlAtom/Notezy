<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <h2>New Todo List:</h2>
      <input
        type="text"
        placeholder="Name your list"
        ref="todoListName"
        @keypress.enter="addTodoList"
      />
      <button class="btn" @click="addTodoList">Create new list</button>
    </div>
  </div>
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
      <button class="add-todo" @click="openTodoModal">
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
  data() {
    return {
      modalActive: false,
    };
  },
  mounted() {
    console.log("was mounted");
    // this.todoLists = this.todoLists;
  },
  methods: {
    openTodoModal() {
      this.modalActive = true;
      // focus on the input after the modal is opened
      this.$nextTick(() => {
        this.$refs.todoListName.focus();
      });
    },
    addTodoList() {
      const todoList = {
        name: this.$refs.todoListName.value,
        id: Date.now(),
        items: [],
      };
      this.todoStore.addTodoList(todoList);
      this.modalActive = false;
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

// stolen directly from the Vue fireblogs tutorial
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    h2 {
      text-align: center;
    }
    button {
      align-self: center;
    }
  }
}
</style>
