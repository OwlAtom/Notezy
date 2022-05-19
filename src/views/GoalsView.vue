<template>
  <main>
    <h1>This is a goals page</h1>
    <div>
      <ul>
        <li :class="{ currentDay: currentDay == 1 }">M</li>
        <li :class="{ currentDay: currentDay == 2 }">T</li>
        <li :class="{ currentDay: currentDay == 3 }">W</li>
        <li :class="{ currentDay: currentDay == 4 }">T</li>
        <li :class="{ currentDay: currentDay == 5 }">F</li>
        <li :class="{ currentDay: currentDay == 6 }">S</li>
        <li :class="{ currentDay: currentDay == 0 }">S</li>
      </ul>
    </div>
    <NewGoal />
    <button type="button" class="btn" @click="showModal">
      Create New Goal
    </button>
  </main>
  <CreateGoal v-show="isModalVisible" @close="closeModal" />
</template>

<script>
import NewGoal from "../components/NewGoal.vue";
import CreateGoal from "../components/CreateGoal.vue";
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";

export default {
  name: "GoalsView",
  components: { NewGoal, CreateGoal },
  setup() {
    return {
      todoIcon,
    };
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
    },
  },
  computed: {
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
  background-color: red;
}
</style>
