<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <div class="close" @click="closeFolderModal">&times;</div>
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
  <main>
    <h1 class="big-title">All folders</h1>
    <div class="folders">
      <div
        class="folder"
        v-for="(folder, index) in documentStore.folders"
        :key="index"
        @click="openFolder(folder.id)"
        :style="{ backgroundColor: folder.color }"
      >
        <div class="folder-name">
          {{ folder.name }}
        </div>
      </div>
    </div>

    <button class="btn-alt" @click="createNewFolder">Create new folder</button>
  </main>
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
    closeFolderModal() {
      this.modalActive = false;
    },
  },
  data() {
    return {
      modalActive: false,
      color: null,
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
  .folder {
    width: 100%;
    margin-bottom: 1em;
    border-radius: 0.5em;
  }
  .folder-name {
    cursor: pointer;
    padding: 1em;
    color: var(--main-dark-color);
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
  .close {
    color: #aaaaaa;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
