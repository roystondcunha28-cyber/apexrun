import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDh3yeWRxl8LOEcXJfK2eouSqyPn5MrWQ8",
  authDomain: "apex-run-2026-details.firebaseapp.com",
  projectId: "apex-run-2026-details",
  storageBucket: "apex-run-2026-details.firebasestorage.app",
  messagingSenderId: "709122500778",
  appId: "1:709122500778:web:91794532d472b21e1e08d3",
  measurementId: "G-BYMLBHSECQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FORM
const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    const data = {
      name: formData.get("Runner Name"),
      location: formData.get("Location"),
      phone: formData.get("Phone Number"),
      email: formData.get("Email"),
      run: formData.get("Run Category"),
      tshirt: formData.get("T-Shirt Size"),
      timestamp: new Date()
    };

    await addDoc(collection(db, "registrations"), data);

    alert("✅ Registration Successful!");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("❌ Error saving data");
  }
});
