<template>
  <router-view />

  <Navigation />
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: { Navigation },
};
</script>

<style lang="less">

//main color
@main-blue:#626ADE;
@main-white:#FAFAFA;
@main-dark-color: #3B252C;

//user colors
@green:#68DEA3;
@blue:#818EF5;
@light-blue: #8AEDE5;
@lavender: #D79EF4;
@red:#ED84A0;
@orange:#F7BE87;
@yellow: #F1DE79;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
