<template>
  <div class="todo-list" @click="openTodoList(list.id)">
    <h2 class="small-title">{{ list.name }}</h2>
    <div class="todo-items" v-for="(item, index) in list.items" :key="index">
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
</template>

<script>
export default {
  name: "SimplifiedTodoList",
  props: {
    list: {
      type: Object,
      default: () => ({ name: "", id: "", items: [] }),
    },
  },
  methods: {
    openTodoList(id) {
      //remove it from the store
      //this.todoStore.removeTodoList(id);
      this.$router.push({
        name: "TodoList",
        params: {
          id,
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
</style>
