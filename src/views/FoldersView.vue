<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <h2>New doc folder:</h2>
      <input
        type="text"
        placeholder="Name your folder"
        ref="folderName"
        @keypress.enter="addFolder"
      />
      <!-- choose color -->
      <!-- todo: highlight farven der er valgt -->
      <div class="color-chooser">
        <div
          class="color-chooser-color"
          v-for="color in colors"
          :style="{ backgroundColor: color }"
          @click="setColor(color)"
          :key="color"
        ></div>
      </div>
      <!-- todo: make into component -->

      <button class="btn" @click="addFolder">Create new folder</button>
    </div>
  </div>
  <div class="todo">
    <h1>All folders</h1>
    <div
      class="folders"
      v-for="(folder, index) in documentStore.folders"
      :key="index"
      @click="openFolder(folder.id)"
    >
      <div class="folder-name" :style="{ backgroundColor: folder.color }">
        {{ folder.name }}
      </div>
    </div>
    <button @click="createNewFolder">Create new folder</button>
  </div>
</template>

<script>
import { documentStore } from "../store/documents";

export default {
  name: "DocumentView",
  computed: {
    documentStore() {
      return documentStore();
    },
  },
  methods: {
    createNewFolder() {
      // åben modal istedet
      this.modalActive = true;
    },
    addFolder() {
      this.documentStore.addFolder(this.$refs.folderName.value, this.color);
      this.modalActive = false;
    },
    setColor(color) {
      console.log(color);
      this.color = color;
    },
    openFolder(id) {
      this.$router.push({ name: "Documents", params: { id } });
    },
  },
  data() {
    return {
      modalActive: false,
      color: null,
      colors: [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.color-chooser {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .color-chooser-color {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
  }
}
.folders {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .folder-name {
    width: 5em;
    height: 5em;
    border: 1px solid #ccc;
    border-radius: 5%;
    margin: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 5em;
    color: white;
    text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000,
      1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000;
    font-size: 1.5em;
  }
}
// stolen directly from the Vue fireblogs tutorial
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    h2 {
      text-align: center;
    }
    button {
      align-self: center;
    }
  }
}
</style>
