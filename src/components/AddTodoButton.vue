<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <span class="close" @click="closeTodoModal">&times;</span>
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
  <!-- this has to be a button for aria purposes -->
  <button class="add-todo" @click="openTodoModal">
    <span><img :src="addIcon" /></span> New Todo List
  </button>
</template>

<script>
import { todoStore } from "../store/todo";
import { v4 as uuid } from "uuid";
import addIcon from "../assets/icons/add_circle.svg";

export default {
  name: "AddTodoButton",
  setup() {
    return {
      addIcon,
    };
  },
  data() {
    return {
      modalActive: false,
    };
  },
  computed: {
    todoStore() {
      return todoStore();
    },
  },
  methods: {
    openTodoModal() {
      this.modalActive = true;
      // focus on the input after the modal is opened
      this.$nextTick(() => {
        this.$refs.todoListName.focus();
      });
    },
    closeTodoModal() {
      this.modalActive = false;
    },
    addTodoList() {
      const todoList = {
        name: this.$refs.todoListName.value,
        id: uuid(),
        items: [],
      };
      this.todoStore.addTodoList(todoList);
      this.modalActive = false;
      this.$router.push({ name: "TodoList", params: { id: todoList.id } });
    },
  },
};
</script>

<style lang="less" scoped>
.add-todo {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5em;
  background-color: var(--main-white);
  color: var(--faded-dark);
  cursor: pointer;
  border: 2px dashed #ccc;
  width: 100%;

  img {
    width: 4em;
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
    border-radius: 1em;
    width: 100%;
    padding: 1.5em;
    margin: 1.5em;
    background-color: #fff;
    h2 {
      text-align: center;
    }
    button {
      align-self: center;
    }
    .close {
      color: #aaaaaa;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
