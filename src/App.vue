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
@main-blue: #626ade;
@main-white: #fafafa;
@main-dark-color: #3b252c;

//user colors
@green: #68dea3;
@blue: #818ef5;
@light-blue: #8aede5;
@lavender: #d79ef4;
@red: #ed84a0;
@orange: #f7be87;
@yellow: #f1de79;

// google fonts
// todo: only load font weights that are used (do this after styling is complete)
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Bebas Neue", cursive;
}
p,
a,
button,
input,
li,
label {
  font-family: "Nunito Sans", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
