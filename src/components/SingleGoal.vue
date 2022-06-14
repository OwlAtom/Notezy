<template>
  <div class="wrapper">
    <div class="goal" :style="{ backgroundColor: color }" :id="id">
      <h4 class="small-title">{{ title }}</h4>
      <div class="checkboxes">
        <input
          type="checkbox"
          name="checkbox"
          v-for="(day, index) in days"
          :key="index"
          :disabled="day"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleGoal",
  data() {
    return {
      colors: [
        "#68dea3",
        "#818ef5",
        "#8aede5",
        "#d79ef4",
        "#ed84a0",
        "#f7be87",
        "#f1de79",
      ],
    };
  },
  computed: {
    title() {
      // returns the title of the prop goal
      return this.$props.goal.title;
    },
    description() {
      return this.$props.goal.description;
    },
    color() {
      return this.colors[this.$props.goal.color];
    },
    days() {
      //returns an array of days for the goal
      // check if this.$props.goal.plan contains specificDays
      if (this.$props.goal.plan.specificDays) {
        return this.$props.goal.plan.specificDays;
      } else {
        // return a full week? or just today + x days?
        return [false, false, false, false, false, false, false];
      }
    },
    id() {
      return this.$props.goal.id;
    },
  },
  props: {
    goal: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        color: 0,
        plan: {
          specificDays: [false, false, false, false, false, false, false],
        },
        id: "",
      }),
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  // margin: 0 0.8em;
  .goal {
    height: 7.6em;
    width: 100%;
    padding: 0 1em;
    border-radius: 0.5em;
    margin-bottom: 1em;
    // background-color: var(--main-blue);
    .checkboxes {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      input[type="checkbox"] {
        // height: 1.5em;
        // width: 1.5em;
        width: 30px;
        height: 30px;
        // margin: 0.3em 0.5em;
        border: 1px black solid;
      }
    }
  }
}
</style>
