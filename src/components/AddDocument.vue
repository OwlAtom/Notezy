<template>
  <input type="text" placeholder="Name your document" v-model="title" />
  <button @click="createDocument">+</button>
</template>

<script>
import { documentStore } from "../store/documents";

export default {
  name: "AddDocument",
  computed: {
    documentStore() {
      return documentStore();
    },
  },
  methods: {
    createDocument() {
      // check if title is empty
      if (this.title.length === 0) {
        alert("Please enter a title");
        return;
      }
      this.documentStore.createDocument(this.title, this.$route.params.id);
      this.title = "";
    },
  },
};
</script>

<style lang="less" scoped></style>
