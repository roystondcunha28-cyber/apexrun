// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDh3yeWRxl8LOEcXJfK2eouSqyPn5MrWQ8",
  authDomain: "apex-run-2026-details.firebaseapp.com",
  projectId: "apex-run-2026-details",
  storageBucket: "apex-run-2026-details.appspot.com",
  messagingSenderId: "709122500778",
  appId: "1:709122500778:web:91794532d472b21e1e08d3
"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
