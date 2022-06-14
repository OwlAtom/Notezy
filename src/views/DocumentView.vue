<template>
  <header>
    <span @click="goBack()"><img :src="backIcon" /></span>
    <h1 class="big-title">{{ document?.title }}</h1>
    <button @click="removeDocument()"><img :src="deleteIcon" alt="" /></button>
  </header>
  <main>
    <div ref="editor" v-html="document?.content"></div>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";
import backIcon from "../assets/icons/arrow_back.svg";
import deleteIcon from "../assets/icons/delete.svg";
import Quill from "quill";
window.Quill = Quill;
// const ImageResize = require("quill-image-resize-module").default;
// Quill.register("modules/imageResize", ImageResize);

export default {
  name: "DocumentView",
  setup() {
    return {
      backIcon,
      deleteIcon,
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: "snow",
      placeholder: "Write your notes here",
    });

    const that = this;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        that.saveDocument();
      }
    });

    window.addEventListener("pagehide", () => {
      that.saveDocument();
    });
  },
  computed: {
    documentStore() {
      return documentStore();
    },
    document() {
      // get by this.$route.params.id
      return this.documentStore.getDocument(
        this.$route.params.folderID,
        this.$route.params.id
      );
    },
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "Documents",
        params: {
          id: this.$route.params.folderID,
        },
      });
      this.saveDocument();
    },
    removeDocument() {
      this.goBack();
      this.$nextTick(() => {
        this.documentStore.removeDocument(
          this.$route.params.folderID,
          this.$route.params.id
        );
      });
    },
    saveDocument() {
      this.documentStore.saveDocument(
        this.$route.params.folderID,
        this.$route.params.id,
        this.quill.root.innerHTML
      );
    },
  },
};
</script>

<style lang="less" scoped>
body {
  background-color: var(--secondary-bg);
}
.ql-container {
  font-size: 16px;
}
</style>
