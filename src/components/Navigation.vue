<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <router-link to="/todo">Notes</router-link> |
    <router-link to="/todo">Goals</router-link>
  </nav>

</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>
