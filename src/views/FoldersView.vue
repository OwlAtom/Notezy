<template>
  <div class="modal" v-if="modalActive">
    <div class="modal-content">
      <div class="close" @click="closeFolderModal">&times;</div>
      <h2>New doc folder:</h2>
      <input
        type="text"
        placeholder="Name your folder"
        ref="folderName"
        @keypress.enter="createFolder"
      />
      <!-- choose color -->
      <!-- todo: highlight farven der er valgt -->
      <div class="color-chooser">
        <div
          class="color-chooser-color"
          v-for="color in colors"
          :style="{ backgroundColor: color }"
          :class="{ selected: color === selectedColor }"
          @click="setColor(color)"
          :key="color"
          :ref="color"
        ></div>
      </div>
      <!-- todo: make into component -->

      <button class="btn" @click="createFolder">Create new folder</button>
    </div>
  </div>
  <main>
    <h1 class="big-title">All folders</h1>
    <div class="folders">
      <div
        class="folder"
        v-for="(folder, index) in documentStore.folders"
        :key="index"
        :style="{ backgroundColor: folder.color }"
      >
        <div class="folder-name" @click="openFolder(folder.id)">
          {{ folder.name }}
        </div>
        <div class="folder-delete">
          <button @click="removeFolder(folder)">
            <img :src="deleteIcon" />
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn-alt" @click="createNewFolder">
      Create new folder
    </button>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";
import deleteIcon from "../assets/icons/delete.svg";

export default {
  name: "DocumentView",
  setup() {
    return {
      deleteIcon,
    };
  },
  mounted() {
    // load folders from firestore
    this.documentStore.loadFolders();
  },
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
    createFolder() {
      // ensure folder has name and color
      if (this.$refs.folderName.value === "") {
        alert("Please enter a name for your folder");
        return;
      }
      if (this.selectedColor === "") {
        alert("Please choose a color for your folder");
        return;
      }
      this.documentStore.createFolder(
        this.$refs.folderName.value,
        this.selectedColor
      );
      this.modalActive = false;
      this.selectedColor = "";
    },
    setColor(color) {
      this.selectedColor = color;
      // clear other highlighted colors
      for (let colorFromList of this.colors) {
        this.$refs[colorFromList].classList?.remove("selected");
      }
      // highlight color
      this.$refs[color].classList?.add("selected");
    },
    openFolder(id) {
      this.$router.push({ name: "Documents", params: { id } });
    },
    closeFolderModal() {
      this.modalActive = false;
      this.selectedColor = "";
      this.$refs.folderName.value = "";
      // remove selected color class
      for (let colorFromList of this.colors) {
        this.$refs[colorFromList].classList?.remove("selected");
      }
    },
    async removeFolder(folder) {
      const status = await this.documentStore.removeFolder(folder.id);
      if (status) {
        console.error(status);
        // todo: show error message in modal or something like that
      }
    },
  },
  data() {
    return {
      modalActive: false,
      selectedColor: null,
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
    &.selected {
      border: 0.5px solid rgb(58 58 58 / 50%);
      box-shadow: inset 4px 4px 6px 0px rgb(0 0 0 / 16%);
    }
  }
}
.folders {
  .folder {
    margin-bottom: 1em;
    border-radius: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
  }
  .folder-name {
    cursor: pointer;
    padding: 1em;
    color: var(--main-dark-color);
    width: 100%;
  }
  .folder-delete {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      border: none;
      background: none;
      cursor: pointer;

      img {
        width: 32px;
      }
    }
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
