<template>
  <router-view />

  <Navigation />

</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'app',
  components: { Navigation }
}
</script>

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
