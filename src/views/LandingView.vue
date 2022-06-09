<template>
  <div class="home">
    <login-button-vue></login-button-vue>
  </div>
</template>

<script>
import loginButtonVue from "@/components/loginButton.vue";
export default {
  name: "HomeView",
  components: {
    loginButtonVue,
  },
};
</script>
