<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <span class="close" @click="closeTodoModal">&times;</span>
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
        <button class="add-todo" @click="addSubtask">+</button>
      </div>
      <button class="btn" @click="saveItemEdits">
        Save Changes and close modal
      </button>
    </div>
  </div>

  <header>
    <router-link :to="{ name: 'Todo' }"
      ><span><img :src="backIcon" /></span
    ></router-link>
    <h1 class="big-title">{{ list.name }}</h1>
    <span
      ><button @click="removeTodoList(list)"><img :src="settingsIcon" /></button
    ></span>
  </header>
  <main class="todo-list">
    <div class="new-todo">
      <input
        type="text"
        placeholder="Name your task"
        ref="todoItemName"
        @keypress.enter="addTodoItem"
      />
      <button class="add-todo" @click="addTodoItem">+</button>
    </div>

    <div class="todo-items">
      <div class="empty-list" v-if="list.items.length == 0">
        <p>No todos added yet</p>
      </div>
      <div
        class="todo-items-divider"
        v-for="(item, index) in uncheckedItems"
        :key="index"
      >
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
          <button @click="removeTodoItem(item)">
            <img class="delete-icon" :src="deleteIcon" />
          </button>
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

            <button @click="removeSubtask(item, subtask)">
              <img class="delete-icon" :src="deleteIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <h2 class="big-title">Done</h2>
    <div class="todo-items done">
      <div
        class="todo-items-divider"
        v-for="(item, index) in checkedItems"
        :key="index"
      >
        <div class="todo-item">
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
          <button @click="removeTodoItem(item)">
            <img class="delete-icon" :src="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { todoStore } from "../store/todo";
import { v4 as uuid } from "uuid";
import backIcon from "../assets/icons/arrow_back.svg";
import deleteIcon from "../assets/icons/delete.svg";
import settingsIcon from "../assets/icons/settings.svg";

export default {
  name: "TodoListView",
  setup() {
    return {
      backIcon,
      settingsIcon,
      deleteIcon,
    };
  },
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
    removeTodoList(list) {
      history.back();
      this.todoStore.removeTodoList(list.id);
    },
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
      console.log("Deleted item in list: " + item.id);
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
    closeTodoModal() {
      this.modalActive = false;
    },
  },
};
</script>

<style lang="less" scoped>
.empty-list {
  display: flex;
  justify-content: center;
  margin: 2em 0;

  p {
    font-size: 20px;
    color: var(--faded-dark);
  }
}

.todo-list {
  .todo-items-divider {
    border-bottom: 1px solid #ccc;
  }
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    // border-bottom: 1px solid #ccc;

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
      // color: rgb(255, 0, 0);
    }
  }
  .new-todo {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    input {
      width: 100%;
    }
  }
  .todo-items.done > div > .todo-item > p {
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
.add-todo {
  border: none;
  background: var(--main-blue);
  border-radius: 0.2em;
  cursor: pointer;
  font-size: 22px;
  color: rgb(255, 255, 255);
  width: 3em;
  padding: 0.4em;
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
    // width: 300px;
    padding: 10px 30px;
    background-color: #fff;
    margin: 1em;
    .close {
      color: #aaaaaa;
      font-size: 28px;
      font-weight: bold;
    }
    .new-subtask {
      display: flex;
      gap: 1em;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
.delete-icon {
  width: 1.3em;
}
</style>
