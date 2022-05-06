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
       <button
      type="button"
      class="btn"
      @click="showModal">
      Create New Goal
    </button>

    <CreateGoal
      v-show="isModalVisible"
      @close="closeModal"
    />
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
      data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
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
