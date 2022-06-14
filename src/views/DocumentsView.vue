<template>
  <main>
    <h1 class="big-title">Notes</h1>
    <router-link :to="{ name: 'Folders' }">&lt; Back</router-link>
    <br />
    <AddDocument />
    <!-- Show documents in folder -->
    <ul>
      <li v-for="(document, index) in documents" :key="index">
        <router-link
          :to="{
            name: 'Document',
            params: { id: document.id, folderID: this.$route.params.id },
          }"
          >{{ document.title }}
          <span>></span>
        </router-link>
        <button @click="removeDocument(document)">delete</button>
      </li>
    </ul>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";
import AddDocument from "@/components/AddDocument.vue";

export default {
  name: "DocumentsView",
  components: {
    AddDocument,
  },
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
    removeDocument(document) {
      this.documentStore.removeDocument(this.$route.params.id, document.id);
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style-type: none;
  padding: 0;

  li {
    border-bottom: 1px solid var(--main-dark-color);

    a {
      text-decoration: none;
      padding: 0.7em 0;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
  }
}
</style>
