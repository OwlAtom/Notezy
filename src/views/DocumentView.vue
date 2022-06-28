<template>
  <header>
    <span @click="goBack()"><img :src="backIcon" /></span>
    <h1 class="big-title">{{ document?.title }}</h1>
    <button @click="removeDocument()"><img :src="deleteIcon" alt="" /></button>
  </header>
  <main>
    <div id="toolbar-container">
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="draw" @click="toggleDrawModal">D</button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
        <button
          class="transcribeButton"
          @click="toggleTranscribe()"
          ref="transribBtn"
        >
          <svg
            class="speechToText"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              d="M34.5 19.5q-1.45 0-2.475-1.025Q31 17.45 31 16V8q0-1.45 1.025-2.475Q33.05 4.5 34.5 4.5q1.45 0 2.475 1.025Q38 6.55 38 8v8q0 1.45-1.025 2.475Q35.95 19.5 34.5 19.5ZM9 44q-1.25 0-2.125-.875T6 41V7q0-1.25.875-2.125T9 4h17v3H9v34h24v-5.5h3V41q0 1.25-.875 2.125T33 44Zm5-8.5v-3h14v3Zm0-6v-3h10v3Zm22 2h-3v-5.1q-3.8-.55-6.4-3.5Q24 19.95 24 16h3q0 3.1 2.2 5.3 2.2 2.2 5.3 2.2 3.15 0 5.325-2.2Q42 19.1 42 16h3q0 3.95-2.575 6.9T36 26.4Z"
            />
          </svg>
        </button>
      </span>
    </div>
    <div ref="editor"></div>
  </main>
  <dialog class="drawModal" ref="drawModal">
    <form method="dialog" class="drawModal-content">
      <h2>Draw</h2>
      <div class="drawingToolbar">
        <label for="drawingTool">Tool</label>
        <select id="drawingTool" name="drawingTool" ref="drawingTool">
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <label for="width">Width</label>
        <input
          type="range"
          id="width"
          name="width"
          min="1"
          max="10"
          step="0.1"
          v-model="drawWidth"
        />
        <label for="color">Color</label>
        <input type="color" id="color" name="color" v-model="drawColor" />
      </div>
      <canvas
        ref="canvas"
        width="500"
        height="500"
        @mousedown="drawStart"
        @mousemove="draw"
        @mouseup="drawEnd"
        @touchstart="drawStart"
        @touchmove="draw"
        @touchend="drawEnd"
      ></canvas>
      <div class="drawModal-footer">
        <button class="btn cancel-btn" @click="drawCancel">Cancel</button>
        <span class="btn clear-btn" @click="drawCancel">Clear</span>
        <button class="btn done-btn" @click="drawSave">Done</button>
      </div>
    </form>
  </dialog>
</template>

<script>
import { documentStore } from "../store/documents";
import backIcon from "../assets/icons/arrow_back.svg";
import deleteIcon from "../assets/icons/delete.svg";
import Quill from "quill";
window.Quill = Quill;
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { userStore } from "../store/user";
import { v4 as uuid } from "uuid";

export default {
  name: "DocumentView",
  setup() {
    return {
      backIcon,
      deleteIcon,
    };
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
    firebaseStorage() {
      return getStorage();
    },
    user() {
      return userStore();
    },
  },
  data() {
    return {
      quill: null,
      isTranscribing: false,
      transribPreviewElm: null,
      recognition: null,
      imageInput: null,
      canvas: null,
      ctx: null,
      prevX: null,
      prevY: null,
      isDrawing: false,
      drawWidth: 5,
      drawColor: "#000000",
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      modules: { toolbar: "#toolbar-container" },
      theme: "snow",
      placeholder: "Write your notes here",
    });
    this.updateQuill();
    this.quill.getModule("toolbar").addHandler("image", this.imageHandler);

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("pagehide", this.handlePageHide);
  },
  methods: {
    toggleDrawModal() {
      this.$refs.drawModal.showModal();
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
    },
    drawStart(e) {
      this.ctx.lineWidth = this.drawWidth;
      // check if the user is drawing with the pen or eraser
      if (this.$refs.drawingTool.value === "pen") {
        this.ctx.strokeStyle = this.drawColor;
      } else {
        this.ctx.strokeStyle = "white";
      }
      this.isDrawing = true;
      this.prevX = e.offsetX;
      this.prevY = e.offsetY;
    },
    draw(e) {
      if (this.isDrawing) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        // this.ctx.lineTo(e.offsetX, e.offsetY);
        // smoothing by giving the line a round end cap and using a bezier curve instead of a straight line
        this.ctx.lineCap = "round";
        this.ctx.bezierCurveTo(
          this.prevX,
          this.prevY,
          this.prevX,
          this.prevY,
          e.offsetX,
          e.offsetY
        );
        this.ctx.stroke();
        this.prevX = e.offsetX;
        this.prevY = e.offsetY;
      }
    },
    drawEnd() {
      this.isDrawing = false;
    },
    drawCancel() {
      // clear canvas
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      // compress the blob to a more reasonable size
      // let arrbuffer = await blob.arrayBuffer(); // then send this through the squoosh.app api to minimize used space on the server
    },
    drawSave() {
      const imageRef = ref(
        this.firebaseStorage,
        `user/${this.user.uid}/${uuid()}`
      );
      // create a blob
      this.canvas.toBlob((blob) => {
        // upload to firebase storage, get url and insert into quill
        uploadBytes(imageRef, blob).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            this.insertToEditor(url);
          });
        });
      }, "image/webp");
    },
    imageHandler() {
      this.imageInput = document.createElement("input");
      this.imageInput.setAttribute("type", "file");
      this.imageInput.setAttribute("accept", "image/*");
      this.imageInput.click();
      this.imageInput.addEventListener("change", this.imageInputHandler);
    },
    imageInputHandler() {
      const file = this.imageInput.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        this.uploadToFirebase(file);
      } else {
        console.warn("You can only upload images.");
      }
    },
    uploadToFirebase(file) {
      // get reference to firebase storage from this.user.uid + file name
      const imageRef = ref(
        this.firebaseStorage,
        `user/${this.user.uid}/${file.name}`
      );
      uploadBytes(imageRef, file).then((snapshot) => {
        // get download url
        getDownloadURL(snapshot.ref).then((url) => {
          // insert image into quill
          this.insertToEditor(url);
        });
      });
      // upload file to firebase storage
    },
    insertToEditor(url) {
      let range = this.quill.getSelection();
      // if range is null, set range to end of editor
      if (range == null) {
        range = { index: this.quill.getLength() };
      }
      this.quill.insertEmbed(range.index, "image", url);
    },
    toggleTranscribe() {
      this.isTranscribing = !this.isTranscribing;
      // change button text to "stop transcription"
      if (this.isTranscribing) {
        // start transcription
        // append an empty p tag to the end of the editor
        this.transribPreviewElm = document.createElement("p");
        // insert the p tag at the end of the editor
        this.quill.root.appendChild(this.transribPreviewElm);
        // speech recognition is prefixed for all browsers because it is a standard
        this.recognition = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition)();
        this.recognition.interimResults = true;
        this.recognition.continuous = true;
        // listen for the results and pass the event to handleRecognitionResult
        this.recognition.onresult = this.handleRecognitionResult;
        this.recognition.start();
        // add the active class to .speechToText
        document.querySelector(".speechToText").classList.add("active");
      } else {
        this.recognition.stop();
        document.querySelector(".speechToText").classList.remove("active");
      }
    },
    handleRecognitionResult(event) {
      var result = event.results[event.resultIndex];
      this.transribPreviewElm.innerHTML = result[0].transcript;
      if (result.isFinal) {
        this.toggleTranscribe(); // stop transcription
      }
    },
    handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        this.saveDocument();
      }
    },
    handlePageHide() {
      this.saveDocument();
    },
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
      this.updateQuill();
    },
    updateQuill() {
      this.quill.root.innerHTML = this.documentStore.getDocument(
        this.$route.params.folderID,
        this.$route.params.id
      ).content;
    },
  },
  watch: {
    $route(to) {
      // if user navigates away from this page, remove event listeners
      if (to.name !== "Document") {
        document.removeEventListener(
          "visibilitychange",
          this.handleVisibilityChange
        );
        window.removeEventListener("pagehide", this.handlePageHide);
      }
    },
  },
};
</script>

<style lang="less" scoped>
body {
  background-color: var(--secondary-bg);
}

header {
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
}

.ql-container {
  font-size: 16px;
}
.transcribeButton {
  padding: 0 !important;
}
.speechToText {
  &:hover {
    fill: #06c;
  }
  &.active {
    fill: red;
  }
}
.drawModal {
  // dont let it be wider than the screen
  max-width: 80%;
  h2 {
    margin-bottom: 0;
  }
  canvas {
    border: 1px solid black;
  }
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.drawingToolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  // style color inputs
  input[type="color"] {
    -webkit-appearance: none;
    border: none;
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
}
.drawModal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  .btn {
    transition: all 0.2s ease-in-out;
    margin: 0 0.5rem;
  }
  .cancel-btn {
    background-color: rgb(164, 22, 0);
    &:hover {
      background-color: rgb(255, 0, 0);
    }
  }
  .clear-btn {
    background-color: rgb(204, 116, 0);
    &:hover {
      background-color: rgb(255, 153, 0);
    }
  }
  .done-btn {
    background-color: rgb(0, 138, 0);
    &:hover {
      background-color: rgb(0, 255, 0);
    }
  }
}
</style>
