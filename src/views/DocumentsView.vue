<template>
  <main>
    <router-link :to="{ name: 'Folders' }">&lt; Back</router-link>
    <br />
    <input type="text" placeholder="Name your document" v-model="title" />
    <button @click="createDocument">+</button>

    <!-- Show documents in folder -->
    <ul>
      <li v-for="(doc, index) in documents" :key="index">
        <router-link
          :to="{
            name: 'Document',
            params: { id: doc.id, folderID: this.$route.params.id },
          }"
          >{{ doc.title }} >
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";

export default {
  name: "DocumentsView",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    documentStore() {
      return documentStore();
    },
    documents() {
      // get all documents in current folder
      return this.documentStore.getDocuments(this.$route.params.id);
    },
  },
  methods: {
    createDocument() {
      this.documentStore.createDocument(this.title, this.$route.params.id);
      this.title = "";
    },
  },
};
</script>

<style lang="less"></style>
