<template>
  <h1>Hello {{ this.user.displayName }}!</h1>
  <img
    :src="this.user.photoURL"
    alt="Profile Image for { this.user.displayName }"
    class="pfp"
  />
</template>

<script>
import { userStore } from "../store/user";

export default {
  name: "DashboardView",
  computed: {
    user() {
      return userStore();
    },
  },
};
</script>

<style lang="less">
.pfp {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}
</style>
