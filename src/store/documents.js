import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { cyrb53 } from "./cyrb53";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
let userID = null;
auth.onAuthStateChanged((user) => {
  if (user) {
    userID = user.uid;
  }
});

const HoursBetweenLoads = 4;

const db = getFirestore();

export const documentStore = defineStore("documents", {
  state: () => ({
    folders: [],
    lastLoad: {},
  }),
  actions: {
    async createFolder(folderName, color) {
      const folder = {
        name: folderName,
        color: color,
        id: uuidv4(),
        documents: [],
      };
      this.folders.push(folder);
      // also add the folder to the firestore database
      await setDoc(doc(db, `users/${userID}/folders/${folder.id}`), {
        color: folder.color,
        name: folder.name,
      });
    },
    async removeFolder(folderId) {
      // check if the folder is empty
      const folder = this.folders.find((folder) => folder.id === folderId);
      // oh no!
      // https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
      // todo: check if empty on firebase too
      if (folder.documents.length > 0) {
        return new Error(
          "Folder is not empty, you must empty this folder to delete it"
        );
        // could also allow the user to delete the documents in the folder automatically
        // popup: "this folder is not empty, if you delete it all the documents in this folder will be deleted forever (a long time)"
      }

      this.folders = this.folders.filter((folder) => folder.id !== folderId);
      // delete the folder from the firestore database
      await deleteDoc(doc(db, `users/${userID}/folders/${folderId}`));
    },
    async createDocument(title, folderId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      const document = {
        title: title,
        id: uuidv4(),
        content: "",
        // Skal vi tilføje Timestamp?
        // Og hvad med tags?
      };
      folder.documents.push(document);
      // create the document in the firestore database
      setDoc(
        doc(db, `users/${userID}/folders/${folderId}/documents/${document.id}`),
        {
          title: document.title,
          content: document.content,
        }
      );
    },
    removeDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      folder.documents = folder.documents.filter(
        (document) => document.id !== documentId
      );
      // delete the document from the firestore database
      deleteDoc(
        doc(db, `users/${userID}/folders/${folderId}/documents/${documentId}`)
      );
    },
    saveDocument(folderId, documentId, content) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      const document = folder.documents.find(
        (document) => document.id === documentId
      );
      document.content = content;

      const stateHash = cyrb53(
        JSON.stringify({
          title: document.title,
          content: document.content,
        })
      );
      if (stateHash === document.lastHash) {
        return;
      }
      document.lastHash = stateHash;
      // save the document in the firestore database
      setDoc(
        doc(db, `users/${userID}/folders/${folderId}/documents/${documentId}`),
        {
          title: document.title,
          content: document.content,
        }
      );
    },
    // load folders from firestore
    // all "documents" inside the folders collection
    async loadFolders() {
      // if the time of last load is less than X hours ago, return
      if (
        this.lastLoad.folders &&
        Date.now() - this.lastLoad.folders < HoursBetweenLoads * 60 * 60 * 1000
      ) {
        return;
      }
      this.lastLoad.folders = Date.now();
      // if the user is not logged in, wait for the user to log in
      if (!userID) {
        await new Promise((resolve) => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              userID = user.uid;
              resolve();
            }
          });
        });
      }
      const firestoreFolders = await getDocs(
        query(collection(db, `users/${userID}/folders`))
      );
      // this causes 1 document reads of 50k total reads
      // 1k users can have max 50 reads per day (folders only)
      // + document reads for each folder
      // could be optimized by having a collection with the "basic" data, ids, titles, colors, etc.
      // one read for seeing all folders + their subdocuments
      // however this means when deleting or creating a folder,
      // it also need to be updated in the basic tree
      // we only have 20k reads/deletes per day
      // these limits are all based on the free tier of firestore
      // which of course won't matter if this was a real app
      // but its still good to consider, to keep costs low
      const folders = firestoreFolders.docs.map((folder) => {
        return {
          name: folder.data().name,
          color: folder.data().color,
          id: folder.id,
          documents: [],
        };
      });
      this.folders = folders;
    },
    // load documents from firestore
    async loadDocuments(folderID) {
      const folder = this.folders.find((folder) => folder.id === folderID);

      if (
        this.lastLoad[folderID] &&
        Date.now() - this.lastLoad[folderID] <
          HoursBetweenLoads * 60 * 60 * 1000
      ) {
        return;
      }
      this.lastLoad[folderID] = Date.now();
      const firestoreDocuments = await getDocs(
        query(collection(db, `users/${userID}/folders/${folderID}/documents`))
      );
      const documents = firestoreDocuments.docs.map((document) => {
        return {
          title: document.data().title,
          id: document.id,
          content: document.data().content,
          lastHash: document.data().lastHash,
        };
      });
      folder.documents = documents;
    },
    // load one document from firestore
    async loadSingleDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      const document = folder.documents.find(
        (document) => document.id === documentId
      );
      const firestoreDocument = await getDoc(
        doc(db, `users/${userID}/folders/${folderId}/documents/${documentId}`)
      );
      document.title = firestoreDocument.data().title;
      document.content = firestoreDocument.data().content;
      document.lastHash = firestoreDocument.data().lastHash;
    },
    // get all documents in a folder
    getDocuments(id) {
      const folder = this.folders.find((folder) => folder.id === id);
      return folder.documents;
    },
    getDocument(folderId, documentId) {
      const folder = this.folders.find((folder) => folder.id === folderId);
      let a = folder.documents.find((document) => document.id === documentId);
      return a;
    },
  },
  persist: true,
});
