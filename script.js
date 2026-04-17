
console.log("APEX RUN Loaded Successfully!");

// RULES TOGGLE
document.querySelectorAll('.rules-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const rulesDiv = document.getElementById(button.getAttribute('aria-controls'));
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isExpanded);
    rulesDiv.style.display = rulesDiv.style.display === 'block' ? 'none' : 'block';
  });
});

// CONFETTI MOCK
function fireConfetti() {
  console.log("Confetti!");
}

// SPARKLES
function createSparkles(x, y) {
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);

    sparkle.style.position = "absolute";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.width = "8px";
    sparkle.style.height = "8px";
    sparkle.style.background = "gold";
    sparkle.style.borderRadius = "50%";

    setTimeout(() => sparkle.remove(), 1000);
  }
}

// COUNTDOWN
const targetDate = new Date("March 7, 2026 08:30:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);

  const el = document.getElementById("countdown");
  if (el) {
    el.innerHTML = `${days}d ${hours}h ${mins}m`;
  }
}, 1000);


// ================= FIREBASE =================
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get("Runner Name"),
    location: formData.get("Location"),
    phone: formData.get("Phone Number"),
    email: formData.get("Email"),
    run: formData.get("Run Category"),
    tshirt: formData.get("T-Shirt Size"),
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "registrations"), data);
    alert("Registration Successful ✅");
    form.reset();
  } catch (err) {
    console.error("Firebase Error:", err);
    alert("Failed to register ❌");
  }
});
