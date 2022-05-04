import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css'

createApp(App).use(createPinia()).use(router).mount("#app");

import "./firebase";

import setupStores from "@/store/index";
setupStores();
