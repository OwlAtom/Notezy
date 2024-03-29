<template>
  <div class="modal-backdrop" v-show="showModal">
    <div class="modal">
      <h1>New Goal</h1>
      <label for="Name" class="small-title small-title-modal">Name:</label>
      <input id="Name" type="text" placeholder="Name your goal" />
      <label for="Desc" class="small-title small-title-modal">Desc:</label>
      <input id="Desc" type="text" placeholder="Describe your goal" />

      <label for="timesPerWeek" class="small-title small-title-modal"
        >Times per week:</label
      >
      <input id="timesPerWeek" type="number" min="1" max="7" value="1" />

      <label for="specDays" class="small-title small-title-modal"
        >On specific days</label
      >
      <!-- <input id="specDays" type="checkbox" v-model="onSpecificDays" /> -->

      <!-- test switch  -->
      <label class="switch">
        <input id="specDays" type="checkbox" v-model="onSpecificDays" />
        <span class="slider round"></span>
      </label>

      <div v-show="onSpecificDays" class="day-container">
        <p>Choose the days:</p>

        <!-- loop days -->
        <div class="day-container-flex smaller-title">
          <div class="individual-day" v-for="day in days" :key="day">
            <label :for="day.name" class="smaller-title">{{ day.name }}</label>
            <input :id="day.name" type="checkbox" v-model="day.checked" />
          </div>
        </div>
      </div>

      <label for="colors" class="small-title small-title-modal">Color</label>
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
  <main>
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
      Create New Goal
    </button>
  </main>
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

<style lang="less" scoped>
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
// modal
.modal-backdrop {
  z-index: 5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
}

.modal {
  background: var(--main-white);
  overflow-x: auto;
  display: flex;
  z-index: 101;
  flex-direction: column;
  width: 100%;
  margin: 0.5em 1em;
  padding: 1em 1.5em;
  border-radius: 1em;
  h1 {
    margin: 0.25em 0;
  }
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

.small-title-modal {
  margin: 0.5em 0;
}

// toggle switch
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--main-blue);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--main-blue);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
//

.day-container {
  height: 7.6em;
  background-color: var(--secondary-bg);
  padding: 0 1em;
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: inset 0 0 10px var(--faded-dark);
  border-radius: 1em;

  p {
    margin: 0;
  }
}

.day-container-flex {
  display: flex;
  align-items: center;
}

.individual-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.3em;

  input[type="checkbox"] {
    width: 1.1em;
    height: 1.1em;
  }
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
