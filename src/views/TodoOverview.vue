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
  <main class="todo">
    <h1 class="big-title">todo-lists</h1>
    <div class="todo-lists">
      <div
        class="todo-list"
        v-for="(list, index) in todoStore.todoLists"
        :key="index"
        @click="openTodoList(list.id)"
      >
        <h2 class="small-title">{{ list.name }}</h2>
        <div
          class="todo-items"
          v-for="(item, index) in list.items"
          :key="index"
        >
          <div class="todo-item">
            <p :class="{ completed: item.completed }">{{ item.name }}</p>
          </div>
          <!-- ? evt fjerne subtasks fra overview? -->
          <template v-for="(subtask, index) in item.subtasks" :key="index">
            <div class="todo-item todo-item-subtask">
              <p :class="{ completed: subtask.completed }">
                {{ subtask.name }}
              </p>
            </div>
          </template>
        </div>
      </div>
      <!-- this has to be a button for aria purposes -->
      <button class="add-todo" @click="openTodoModal">
        <span>+</span> New Todo List
      </button>
    </div>
  </main>
</template>

<script>
import { todoStore } from "../store/todo";
import { v4 as uuid } from "uuid";

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
    },
    openTodoList(id) {
      //remove it from the store
      //this.todoStore.removeTodoList(id);

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
.completed {
  text-decoration: line-through;
}

.todo-lists {
  // todo: masonry layout
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
}
.todo-list {
  padding: 0 1em 1em;
  border-radius: 0.5em;
  box-shadow: 0 3px 10px 0px #3b252c33; // todo: Skifte farve ved merge med goals
  background-color: var(--secondary-bg);
  height: min-content;
  cursor: pointer;

  p {
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.add-todo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5em;
  background-color: var(--main-white);
  font-size: 1em;
  cursor: pointer;
  border: 2px dashed #ccc;

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
