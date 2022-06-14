<template>
  <main>
    <logout-button></logout-button>
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h1 style="font-size: 1.8em">Hello {{ this.user.displayName }}!</h1>
      <img
        :src="this.user.photoURL"
        :alt="'Profile Image for ' + this.user.displayName"
        class="pfp"
      />
    </div>

    <AddTodoButton />
  </main>
</template>

<script>
import { userStore } from "../store/user";
import logoutButton from "@/components/logoutButton.vue";
import AddTodoButton from "@/components/AddTodoButton.vue";

export default {
  name: "DashboardView",
  computed: {
    user() {
      return userStore();
    },
  },
  components: {
    logoutButton: logoutButton,
    AddTodoButton,
  },
};
</script>

<style lang="less">
.pfp {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0;
}
</style>
