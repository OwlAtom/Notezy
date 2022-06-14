<template>
  <logout-button></logout-button>
  <h1>Hello {{ this.user.displayName }}!</h1>
  <img
    :src="this.user.photoURL"
    :alt="'Profile Image for ' + this.user.displayName"
    class="pfp"
  />
  <AddTodoButton />
  <template v-for="goal in goalStore.goals" :key="goal.id">
    <!-- Skal kun hente goals med id -->
    <SingleGoal v-if="(goal.id = 1)" :goal="goal" />
  </template>
</template>

<script>
import { userStore } from "../store/user";
import { goalStore } from "../store/goals";
import logoutButton from "@/components/logoutButton.vue";
import AddTodoButton from "@/components/AddTodoButton.vue";
import SingleGoal from "../components/SingleGoal.vue";

export default {
  name: "DashboardView",
  computed: {
    user() {
      return userStore();
    },
    // goals store
    goalStore() {
      return goalStore();
    },
  },
  components: {
    logoutButton: logoutButton,
    AddTodoButton,
    SingleGoal,
  },
};
</script>

<style lang="less" scoped>
.pfp {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}
</style>
