import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const documentStore = defineStore("documents", {
  state: () => ({
    folders: [
      {
        name: "new",
        color: "#e91e63",
        documents: [],
        id: "e138db80-aa86-49a2-ba9a-46fa5dc6111f",
      },
    ],
  }),
  actions: {
    addFolder(folderName, color) {
      this.folders.push({
        name: folderName,
        color: color,
        documents: [],
        id: uuidv4(),
      });
    },
    createDocument(title, folderId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      folder.documents.push({
        title: title,
        id: uuidv4(),
        content: "",
      });
    },
    getDocuments(id) {
      const folder = this.folders.find((folder) => folder.id === id);
      console.log(id);
      console.log(folder);
      return folder.documents;
    },
    getDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      return folder.documents.find((document) => document.id === documentId);
    },
  },
  persist: true,
});
