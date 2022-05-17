<template>
  <div class="todo">
    <h1>This is a goals page</h1>
    <div>
      <div :class="{ currentDay: currentDay == 1 }">M</div>
      <div :class="{ currentDay: currentDay == 2 }">T</div>
      <div :class="{ currentDay: currentDay == 3 }">W</div>
      <div :class="{ currentDay: currentDay == 4 }">T</div>
      <div :class="{ currentDay: currentDay == 5 }">F</div>
      <div :class="{ currentDay: currentDay == 6 }">S</div>
      <div :class="{ currentDay: currentDay == 0 }">S</div>
    </div>
    <SingleGoal />
    <button type="button" class="btn" @click="showModal">
      Create New Goal
    </button>

    <CreateGoal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import SingleGoal from "../components/SingleGoal.vue";
import CreateGoal from "../components/CreateGoal.vue";
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";
import { goalStore } from "../store/goals";

export default {
  name: "GoalsView",
  components: { SingleGoal, CreateGoal },
  setup() {
    return {
      todoIcon,
    };
  },
  data() {
    return {
      isModalVisible: false,
      colors: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  computed: {
    // goals store
    goalStore() {
      return goalStore();
    },
    // getDay
    currentDay() {
      return new Date().getDay();
    },
  },
};
</script>

<style lang="less">
img {
  height: 1.5em;
  margin-bottom: 0.4em;
}
router-link {
  width: 80%;
  height: 2em;
}

.currentDay {
  background-color: var(--main-blue);
}
</style>
