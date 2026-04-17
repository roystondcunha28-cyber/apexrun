// 🔥 Import Firebase (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDh3yeWRxl8LOEcXJfK2eouSqyPn5MrWQ8",
  authDomain: "apex-run-2026-details.firebaseapp.com",
  projectId: "apex-run-2026-details",
  storageBucket: "apex-run-2026-details.firebasestorage.app",
  messagingSenderId: "709122500778",
  appId: "1:709122500778:web:91794532d472b21e1e08d3"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 Get Form
const form = document.getElementById("registrationForm");

// 🔥 Submit Handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Collect data
    const data = {
      name: form["Runner Name"].value,
      location: form["Location"].value,
      phone: form["Phone Number"].value,
      email: form["Email"].value,
      run: form["Run Category"].value,
      tshirt: form["T-Shirt Size"].value,
      timestamp: new Date()
    };

    // Save to Firestore
    await addDoc(collection(db, "registrations"), data);

    // Success
    alert("✅ Registration Successful!");
    form.reset();

  } catch (error) {
    alert("❌ Error: " + error.message);
    console.error(error);
  }
});
