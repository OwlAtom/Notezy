<template>
  <header>
    <router-link :to="{ name: 'Folders' }"><img :src="backIcon" /></router-link>
    <h1 class="big-title">Notes</h1>
    <span></span>
  </header>
  <main>
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
          <span><img class="chevron-img" :src="arrowIcon" /></span>
        </router-link>
        <!-- <button @click="removeDocument(document)">delete</button> -->
      </li>
    </ul>
  </main>
</template>

<script>
import { documentStore } from "../store/documents";
import AddDocument from "@/components/AddDocument.vue";
import backIcon from "../assets/icons/arrow_back.svg";
import arrowIcon from "../assets/icons/chevron_right.svg";

export default {
  name: "DocumentsView",
  components: {
    AddDocument,
  },
  setup() {
    return {
      backIcon,
      arrowIcon,
    };
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
  mounted() {
    // load documents from firestore
    this.documentStore.loadDocuments(this.$route.params.id);
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
      text-transform: capitalize;
      padding: 0.7em 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
header {
  span {
    width: 2.5em;
  }
}

.chevron-img {
  width: 2em;
}
</style>
