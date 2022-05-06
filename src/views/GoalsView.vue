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
    <!-- <button class="new-goal"><img :src="todoIcon"/>Create new goal</button> -->
      <router-link :to="{ name: 'CreateGoal' }"><img :src="todoIcon"/>Create new goal</router-link>


  </div>
</template>

<script>
import NewGoal from '../components/NewGoal.vue';
import CreateGoal from '../components/CreateGoal.vue';
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";


export default {
name: 'GoalsView',
components: { NewGoal, CreateGoal },
setup() {
    return {
      todoIcon,
      
    }
  },
 };
</script>

<style lang='less'>
 img {
      height: 1.5em;
      margin-bottom: .4em;
    }
router-link{
  width: 80%;
  height: 2em;
 }

</style>
