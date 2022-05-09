<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <input
        type="text"
        placeholder="Task name goes here.."
        :value="shownItem?.name"
        ref="modalTodoItemName"
      />
      <h3>Subtasks:</h3>
      <div
        class="subtasks"
        v-for="(subtask, index) in shownItem.subtasks"
        :key="index"
      >
        <input
          type="text"
          placeholder="Subtask name goes here.."
          :value="subtask.name"
          ref="modalSubtaskName"
          :id="subtask.id"
        />
      </div>
      <div class="new-subtask">
        <input type="text" placeholder="Add a subtask" ref="newSubtaskName" />
        <button class="btn" @click="addSubtask">Add Subtask</button>
      </div>
      <button class="btn" @click="saveItemEdits">
        Save Changes and close modal
      </button>
    </div>
  </div>

  <router-link :to="{ name: 'Todo' }">&lt; Back</router-link>
  <div class="todo-list">
    <h2>{{ list.name }}</h2>
    <div class="new-todo">
      <input
        class="task-name"
        type="text"
        placeholder="Name your task"
        ref="todoItemName"
        @keypress.enter="addTodoItem"
      />
      <button class="add-todo" @click="addTodoItem">+</button>
    </div>
    <div class="todo-items">
      <div v-for="(item, index) in uncheckedItems" :key="index">
        <div class="todo-item">
          <input type="checkbox" :name="item.name" v-model="item.completed" />
          <p
            @mousedown="startHolding(item)"
            @touchstart="startHolding(item)"
            @mouseup="stopHolding"
            @touchend="stopHolding"
            @mouseleave="stopHolding"
            @touchcancel="stopHolding"
          >
            {{ item.name }}
          </p>
          <button @click="removeTodoItem(item)">x</button>
        </div>
        <div class="subtasks" v-if="item?.subtasks?.length > 0">
          <div
            class="subtask"
            v-for="(subtask, index) in item.subtasks"
            :key="index"
          >
            <input
              type="checkbox"
              :name="subtask.name"
              v-model="subtask.completed"
            />
            <p>{{ subtask.name }}</p>

            <button @click="removeSubtask(item, subtask)">x</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Done</h2>
    <div class="todo-items done">
      <div class="todo-item" v-for="(item, index) in checkedItems" :key="index">
        <input
          type="checkbox"
          :name="item.name"
          v-model="item.completed"
          checked
        />
        <p
          @mousedown="startHolding(item)"
          @touchstart="startHolding(item)"
          @mouseup="stopHolding"
          @touchend="stopHolding"
          @mouseleave="stopHolding"
          @touchcancel="stopHolding"
        >
          {{ item.name }}
        </p>
        <button @click="removeTodoItem(item)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
import { todoStore } from "../store/todo";
import { v4 as uuid } from "uuid";

export default {
  name: "TodoListView",
  computed: {
    todoStore() {
      return todoStore();
    },
    list() {
      // find the list in todoStore.todoLists from the params.listID
      return this.todoStore.todoLists.find(
        (list) => list.id === this.$route.params.id
      );
    },
    checkedItems() {
      return this.list.items.filter((item) => item.completed);
    },
    uncheckedItems() {
      return this.list.items.filter((item) => !item.completed);
    },
  },
  mounted() {
    // set "list" to the list passed in
  },
  data() {
    return {
      modalActive: false,
      holdTimer: null,
      heldItemID: null,
      shownItem: { name: "test" },
    };
  },
  methods: {
    addTodoItem() {
      const todoItem = {
        name: this.$refs.todoItemName.value,
        id: uuid(),
        subtasks: [],
      };
      this.todoStore.addTodoItem(this.list.id, todoItem);
      this.$refs.todoItemName.value = "";
    },
    removeTodoItem(item) {
      this.todoStore.removeTodoItem(this.list.id, item.id);
    },
    startHolding(item) {
      // probably change to just set ID and get a reference to the item
      this.heldItemID = item.id;
      // set a timeout for 1 second
      this.holdTimer = setTimeout(() => {
        // if the item is not completed, remove it
        this.showEditModal();
      }, 500);
    },
    stopHolding() {
      this.heldItemID = null;
      // clear the timeout
      clearTimeout(this.holdTimer);
    },
    showEditModal() {
      // get as a reference to the store item
      this.shownItem = this.list.items.find(
        (item) => item.id === this.heldItemID
      );

      this.modalActive = true;
    },
    saveItemEdits() {
      this.modalActive = false;
      // find shownItem reference in store
      const item = this.list.items.find(
        (item) => item.id === this.shownItem.id
      );
      // set the name to ref subtaskName if its different
      if (item.name !== this.$refs.modalTodoItemName.value) {
        item.name = this.$refs.modalTodoItemName.value;
      }
      // loop ref modalSubtaskName
      for (let i = 0; i < this.$refs.modalSubtaskName.length; i++) {
        const subtask = this.$refs.modalSubtaskName[i];
        // check if subtask element text is different from the store item
        if (subtask.value !== item.subtasks[i].name) {
          // set the subtask name to the new value
          item.subtasks[i].name = subtask.value;
        }
      }
    },
    addSubtask() {
      const subtask = {
        name: this.$refs.newSubtaskName.value,
        id: uuid(),
      };
      this.shownItem.subtasks.push(subtask);
      this.$refs.newSubtaskName.value = "";
    },
    removeSubtask(item, subtask) {
      const index = item.subtasks.indexOf(subtask);
      item.subtasks.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.todo-list {
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
    input[type="checkbox"] {
      margin-right: 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
      // if checkbox is checked, its moved to the done list so we dont need to style it differently
      // &:checked + p {
      //   text-decoration: line-through;
      // }
    }
    p {
      margin: 0;
      width: 100%;
      padding: 0.5rem;
    }
    button {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1.5rem;
      color: rgb(255, 0, 0);
    }
  }
  .new-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
    .task-name {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid rgb(143, 143, 143);
      border-radius: 0.5rem;
      padding-top: 0.6em;
    }
    .add-todo {
      border: none;
      background: blue;
      border-radius: 0.2em;
      margin-left: 0.5rem;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
      font-size: 1.5rem;
      color: rgb(255, 255, 255);
    }
  }
  .todo-items.done > .todo-item > p {
    text-decoration: line-through;
  }
  .subtasks {
    padding: 0.5rem;
    border: 1px solid #ccc;
    width: 80%;
    margin: 0 auto;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    // background gradient based on number of tasks done?
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.837),
      rgba(107, 255, 97, 0.906)
    );
    .subtask {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
      input[type="checkbox"] {
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
        &:checked + p {
          text-decoration: line-through;
        }
      }
      p {
        margin: 0;
        width: 100%;
        padding: 0.5rem;
      }
      button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: rgb(255, 0, 0);
      }
    }
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
    padding: 10px 30px;
    background-color: #fff;
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid rgb(143, 143, 143);
      border-radius: 0.5rem;
      padding-top: 0.6em;
    }
    button {
      margin: 0.5rem;
      align-self: center;
    }
    .new-subtask {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      margin: 1rem 0 0;
      border-bottom: 1px solid #ccc;
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid rgb(143, 143, 143);
        border-radius: 0.5rem;
        padding-top: 0.6em;
      }
      button {
        margin: 0.5rem;
        align-self: center;
      }
    }
  }
}
</style>