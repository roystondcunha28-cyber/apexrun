
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
const targetDate = new Date("May 10, 2026 08:30:00").getTime();

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

// REGISTRATION
const form = document.getElementById("registrationForm");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOSEImyUDsUyqtzqBv1xKmixNErZ8zqcV1g5hSkRhKFWUqKwCoABQmlKSV751_WWqmJw/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(form);

  const data = {
    name: formData.get("runner_name"),
    location: formData.get("location"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    run: formData.get("run"),
    size: formData.get("size")
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    alert("✅ Registration Successful!");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong!");
  }
});
