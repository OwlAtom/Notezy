<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          New Goal
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
            <h4>Name:</h4>
          <input type="text" placeholder="Name your goal" v-model="newHabit" /><br />
            <h4>Description:</h4>         
          <input type="text" placeholder="Describe your goal" v-model="newHabit" /><br />
            <h4>Goal:</h4>
            <p>Weekly</p>
          <input type="radio" v-model="newHabit" /><br />
          <p>Monthly</p>
          <input type="radio" v-model="newHabit" /><br />
        <input type="number" v-model="reps" />times a week<br />
        <NewGoal />
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
        <slot name="footer">
          This is the default footer!
        </slot>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import NewGoal from '../components/NewGoal.vue';

  export default {
    name: 'CreateGoal',
    components: { NewGoal },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
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
    background: #FFFFFF;
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
    color: #4AAE9B;
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
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .usercolor{
      width: 20px;
      height: 20px;
      border-radius: 50px;
  }
</style>