<template>
  <router-view />

  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <router-link to="/todo">Notes</router-link> |
    <router-link to="/todo">Goals</router-link>
  </nav>

</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;

    }
  }
}
</style>
