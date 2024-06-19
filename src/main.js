import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqhskpLl0YTKcFn3jl5W1Rp63kPx9hBSg",
  authDomain: "masrouf-9e8fa.firebaseapp.com",
  projectId: "masrouf-9e8fa",
  storageBucket: "masrouf-9e8fa.appspot.com",
  messagingSenderId: "516591514051",
  appId: "1:516591514051:web:85a970b9b9e06769470d76",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseapp);

const app = createApp(App);
app.use(router);
app.mount("#app");

document.title = "MASROUF";
export { database };
