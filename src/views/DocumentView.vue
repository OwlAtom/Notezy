<template>
  <header>
    <span onclick="history.back()"><img :src="backIcon" /></span>
    <h1 class="big-title">{{ document.title }}</h1>
    <div class="empty-space"></div>
  </header>
  <main>
    {{ document.content }}
    <div ref="editor">
      <p>Hello World!</p>
      <p>Some initial <strong>bold</strong> text</p>
      <p><br /></p>
    </div>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";
import backIcon from "../assets/icons/arrow_back.svg";
import Quill from "quill";
window.Quill = Quill;
// const ImageResize = require("quill-image-resize-module").default;
// Quill.register("modules/imageResize", ImageResize);

export default {
  name: "DocumentView",
  setup() {
    return {
      backIcon,
    };
  },
  mounted() {
    new Quill(this.$refs.editor, {
      theme: "snow",
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
