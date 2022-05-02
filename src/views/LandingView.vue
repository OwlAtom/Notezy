<template>
  <div class="home">
    <router-link :to="{ name: 'login' }">Login</router-link> -
    <router-link :to="{ name: 'logout' }">Logout</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>
