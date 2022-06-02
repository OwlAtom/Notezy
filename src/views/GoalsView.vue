<template>
  <div class="modal-backdrop" v-show="showModal">
    <div class="modal">
      <h1>New Goal</h1>
      <label for="Name" class="small-title">Name</label>
      <input id="Name" type="text" placeholder="Name your goal" />
      <label for="Desc" class="small-title">Desc</label>
      <input id="Desc" type="text" placeholder="Describe your goal" />

      <label for="timesPerWeek" class="small-title">Times per week</label>
      <input id="timesPerWeek" type="number" min="1" max="7" value="1" />

      <label for="specDays" class="small-title">On specific days</label>
      <input id="specDays" type="checkbox" v-model="onSpecificDays" />
      <div v-show="onSpecificDays" class="day-container smaller-title">
        Choose the days:
        <!-- loop days -->
        <div class="individual-day" v-for="day in days" :key="day">
          <label :for="day.name" class="smaller-title">{{ day.name }}</label>
          <input :id="day.name" type="checkbox" v-model="day.checked" />
        </div>
      </div>

      <label for="colors" class="small-title">Color</label>
      <div id="colors" class="colors">
        <div
          class="color"
          v-for="color in colors"
          :class="{ selected: color === selectedColor }"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
          :key="color"
          :ref="color"
        ></div>
      </div>
      <button type="button" class="btn" @click="saveGoal">Save goal</button>
      <button type="button" class="btn btn-border" @click="toggleModal">
        Close modal
      </button>
    </div>
  </div>
  <!-- end of modal -->
  <div class="goalsview-wrapper">
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
    <button type="button" class="btn btn-alt btn-border" @click="toggleModal">
      <img :src="plusIcon" /> Create New Goal
    </button>
  </div>
</template>

<script>
import SingleGoal from "../components/SingleGoal.vue";
import todoIcon from "../assets/icons/check_circle_black_24dp.svg";
import plusIcon from "../assets/icons/plus_circle_black_24dp.svg";
import { goalStore } from "../store/goals";

export default {
  name: "GoalsView",
  components: { SingleGoal },
  setup() {
    return {
      todoIcon,
      plusIcon,
    };
  },
  data() {
    return {
      showModal: false,
      colors: [
        "#68dea3",
        "#818ef5",
        "#8aede5",
        "#d79ef4",
        "#ed84a0",
        "#f7be87",
        "#f1de79",
      ],
      selectedColor: "#68dea3",
      onSpecificDays: false,
      days: [
        {
          name: "M",
          checked: false,
        },
        {
          name: "T",
          checked: false,
        },
        {
          name: "W",
          checked: false,
        },
        {
          name: "T",
          checked: false,
        },
        {
          name: "F",
          checked: false,
        },
        {
          name: "S",
          checked: false,
        },
        {
          name: "S",
          checked: false,
        },
      ],
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    selectColor(color) {
      this.selectedColor = color;
      // clear the selected color from the other colors
      this.colors.forEach((color) => {
        // console.log(this.$refs[color][0]);
        this.$refs[color][0].classList.remove("selected");
      });
      // highlight the selected color
      this.$refs[color][0].classList.add("selected");
    },
    saveGoal() {
      // get the values from the form
      const title = document.getElementById("Name").value;
      const description = document.getElementById("Desc").value;
      const repeats = document.getElementById("timesPerWeek").value;
      const specDays = document.getElementById("specDays").checked;
      // if specDays
      let specificDays = [];
      if (specDays) {
        // loop through the days
        this.days.forEach((day) => {
          if (day.checked) {
            specificDays.push(false);
          } else {
            specificDays.push(true);
          }
        });
      } else {
        specificDays = null;
      }
      const color = this.colors.indexOf(this.selectedColor);
      // create a new goal
      const goal = {
        title,
        description,
        color,
        plan: {
          repeats,
          specificDays,
        },
      };
      // add the goal to the store
      this.goalStore.addGoal(goal);
      // close the modal
      this.showModal = false;
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
.goalsview-wrapper {
  margin: 1.5em;
}

.colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .color {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
    &.selected {
      border: 2px solid rgb(0, 0, 0);
    }
  }
}

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
  margin-bottom: 1.5em;
  :last-child {
    border: none;
    border-radius: 0 7px 7px 0;
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
  justify-content: center;
  z-index: 101;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 1em;
  padding: 1em;
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

.day-container {
  display: flex;
  height: 7.6em;
  align-items: center;
  background-color: var(--secondary-bg);
  padding: 0 1.6em;
}

.individual-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.3em;
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
</style>
