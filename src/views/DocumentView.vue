<template>
  <button onclick="history.back()">Go Back</button>
  <h1 class="big-title">{{ document.title }}</h1>
  {{ document.content }}
  <div ref="editor">
    <p>Hello World!</p>
    <p>Some initial <strong>bold</strong> text</p>
    <p><br /></p>
  </div>
</template>

<script>
import { documentStore } from "../store/documents";

import Quill from "quill";
window.Quill = Quill;
// const ImageResize = require("quill-image-resize-module").default;
// Quill.register("modules/imageResize", ImageResize);

export default {
  name: "DocumentView",
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
