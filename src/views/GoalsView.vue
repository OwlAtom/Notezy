<template>
  <div class="modal-backdrop" v-show="showModal">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> New Goal </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <h4>Name:</h4>
          <input
            type="text"
            placeholder="Name your goal"
            v-model="newHabit"
          /><br />
          <h4>Description:</h4>
          <input
            type="text"
            placeholder="Describe your goal"
            v-model="newHabit"
          /><br />
          <h4>Goal:</h4>
          <p>Weekly</p>
          <input type="radio" v-model="newHabit" /><br />
          <p>Monthly</p>
          <input type="radio" v-model="newHabit" /><br />
          <input type="number" v-model="reps" />times a week<br />
          <h4>Color:</h4>
          <div class="usercolor" user-green></div>
          <div class="usercolor" user-light-blue></div>
          <!-- <div user-blue></div>
        <div user-lavender></div>
        <div user-red></div>
        <div user-orange></div>
        <div user-yellow></div> -->
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"> This is the default footer! </slot>
        <button type="button" class="btn-green" @click="close">
          Close Modal
        </button>
      </footer>
    </div>
  </div>
  <div class="todo">
    <h1 class="big-title">Goals</h1>
    <div class="week-bar">
      <div :class="{ currentDay: currentDay == 1 }">M</div>
      <div :class="{ currentDay: currentDay == 2 }">T</div>
      <div :class="{ currentDay: currentDay == 3 }">W</div>
      <div :class="{ currentDay: currentDay == 4 }">T</div>
      <div :class="{ currentDay: currentDay == 5 }">F</div>
      <div :class="{ currentDay: currentDay == 6 }">S</div>
      <div :class="{ currentDay: currentDay == 0 }">S</div>
    </div>
    <!-- for each goal in the store -->
    <template v-for="goal in goalStore.goals" :key="goal.id">
      <SingleGoal :goal="goal" />
    </template>
    <button type="button" class="btn" @click="showModal">
      Create New Goal
    </button>

    <CreateGoal v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import SingleGoal from "../components/SingleGoal.vue";
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";
import { goalStore } from "../store/goals";

export default {
  name: "GoalsView",
  components: { SingleGoal },
  setup() {
    return {
      todoIcon,
    };
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    togglModal() {
      this.showModal = !this.showModal;
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

.todo {
  margin: 1em;
}

.week-bar {
  display: flex;
  justify-content: space-evenly;
  background-color: var(--main-dark-color);
  color: var(--main-white);
  border-radius: 7px;
  box-shadow: 0 3px 10px 0px #3b252c33;
  :last-child {
    border: none;
  }

  div {
    padding: 1em;
    width: 100%;
    text-align: center;
    border-right: 1px solid var(--main-blue);
  }
}

.currentDay {
  background-color: var(--main-blue);
}
// modal :-)
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.usercolor {
  width: 20px;
  height: 20px;
  border-radius: 50px;
}
</style>
