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
// google fonts
// todo: only load font weights that are used (do this after styling is complete)
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");
@import "./assets/css/style.less";

body {
  background-color: @main-white;
}

.big-title {
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
}
.medium-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.small-title {
  font-family: "Nunito Sans", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
}

.smaller-title {
  font-size: 1rem;
}

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

main {
  margin: 0 1em 7em;
}

.round-borders {
  border-radius: 0.5em;
}

input {
  padding: 0.7em;
  // border-radius: 0.5em;
  .round-borders;
  border-color: @faded-dark;
}

.btn {
  width: 100%;
  background-color: @main-blue;
  border: none;
  // border-radius: 0.5em;
  .round-borders;
  font-family: "Nunito Sans", sans-serif;
  color: @main-white;
  padding: 1.2em;
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-alt {
  &:extend(.btn);
  background-color: initial;
  border: 2px solid @main-blue;
  color: @main-dark;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @main-dark;
}

button {
  width: 80%;
}
</style>
