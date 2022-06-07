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
:root {
  /* main colors */
  --main-blue: #626ade;
  --main-white: #fafafa;
  --main-dark-color: #3b252c;
  --secondary-bg: #f7f8f5;

  /* user colors */
  --green: #68dea3;
  --blue: #818ef5;
  --light-blue: #8aede5;
  --lavender: #d79ef4;
  --red: #ed84a0;
  --orange: #f7be87;
  --yellow: #f1de79;
}

// google fonts
// todo: only load font weights that are used (do this after styling is complete)
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");

body {
  background-color: var(--main-white);
}

.big-title {
  // font-family: "Bebas Neue", cursive;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  text-align: center;
}
.medium-title {
  // font-family: "Bebas Neue", cursive;
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

// .big-text {
//   font-family: "Nunito Sans", sans-serif;
//   font-size: 0.5rem;
//   font-weight: 700;
//   margin-bottom: 1rem;
// }
// .medium-text {
//   font-family: "Nunito Sans", sans-serif;
//   font-size: 1.5rem;
//   font-weight: 400;
//   margin-bottom: 1rem;
// }
// .small-text {
//   font-family: "Nunito Sans", sans-serif;
//   font-size: 1.25rem;
//   font-weight: 400;
//   margin-bottom: 1rem;
// }

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
  margin: 1em;
}

input {
  padding: 0.7em;
  border-radius: 0.5em;
  border-color: #3b252c80;
}

.btn {
  width: 100%;
  background-color: var(--main-blue);
  border: none;
  border-radius: 0.5em;
  font-family: "Nunito Sans", sans-serif;
  color: var(--main-white);
  padding: 1.5em;
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-border {
  background-color: transparent;
  border: 2px solid var(--main-blue);
  color: var(--main-dark-color);
}

.btn-alt {
  background-color: initial;
  border: 2px solid var(--main-blue);
  color: var(--main-dark-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--main-dark-color);
}

button {
  width: 80%;
  height: 2em;
}
</style>
