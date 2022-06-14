<template>
  <div class="home">
    <login-button></login-button>
  </div>
</template>

<script>
import loginButton from "@/components/loginButton.vue";
export default {
  name: "HomeView",
  components: {
    loginButton,
  },
};
</script>
