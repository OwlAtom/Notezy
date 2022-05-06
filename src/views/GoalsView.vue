<template>
  <div class="todo">
    <h1>This is a goals page</h1>
    <h2>test</h2>
    <div>
      <ul>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
        <li>S</li>
      </ul>
    </div>
    <NewGoal />
  </div>
</template>

<script>
import NewGoal from '../components/NewGoal.vue';

export default {
name: 'GoalsView',
components: { NewGoal },
 };
</script>

<style lang='less' scoped>


</style>
