import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const documentStore = defineStore("documents", {
  state: () => ({
    folders: [
      {
        name: "new",
        color: "#d79ef4",
        id: "e138db80-aa86-49a2-ba9a-46fa5dc6111f",
        documents: [
          {
            title: "test title",
            id: "e238db80-aa86-45a2-ba9a-46fa1dc6111f",
            content: "",
          },
        ],
      },
    ],
  }),
  actions: {
    addFolder(folderName, color) {
      this.folders.push({
        name: folderName,
        color: color,
        id: uuidv4(),
        documents: [],
      });
    },
    createDocument(title, folderId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      folder.documents.push({
        title: title,
        id: uuidv4(),
        content: "",
        // Skal vi tilføje Timestamp?
        // Og hvad med tags?
      });
    },
    // get all documents in a folder
    getDocuments(id) {
      const folder = this.folders.find((folder) => folder.id === id);
      console.log("folder.id: " + id);
      // console.log(folder);
      return folder.documents;
    },
    getDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      console.log("folder.id: " + folderId);
      console.log("document.id: " + documentId);
      return folder.documents.find((document) => document.id === documentId);
    },
    removeDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      folder.documents = folder.documents.filter(
        (document) => document.id !== documentId
      );
    },
  },
  persist: true,
});
