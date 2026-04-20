
console.log("APEX RUN Loaded Successfully!");

// RULES TOGGLE
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('.rules-toggle').forEach(button => {
    button.addEventListener('click', () => {

      const targetId = button.getAttribute('aria-controls');
      const rulesDiv = document.getElementById(targetId);

      if (!rulesDiv) return;

      const isHidden = rulesDiv.hasAttribute("hidden");

      if (isHidden) {
        rulesDiv.removeAttribute("hidden");
        button.setAttribute("aria-expanded", "true");
      } else {
        rulesDiv.setAttribute("hidden", "");
        button.setAttribute("aria-expanded", "false");
      }

    });
  });
rulesDiv.style.display = isHidden ? "block" : "none";
});

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
const targetDate = new Date("May 10, 2026 05:00:00").getTime();
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

//TSHIRT SIZE
const ageInput = document.getElementById("age");
const sizeSuggestion = document.getElementById("sizeSuggestion");

if (ageInput) {
  ageInput.addEventListener("input", () => {
 const age = parseInt(ageInput.value);
  let suggestedSize = "";
}
  if (!age) return;

  // Kids
  if (age <= 7) {
    suggestedSize = "6-8Y";
  } else if (age <= 10) {
    suggestedSize = "8-10Y";
  } else if (age <= 12) {
    suggestedSize = "10-12Y";
  }
  // Teens / Adults
  else if (age <= 15) {
    suggestedSize = "XS";
  } else if (age <= 18) {
    suggestedSize = "S";
  } else if (age <= 25) {
    suggestedSize = "M";
  } else if (age <= 35) {
    suggestedSize = "L";
  } else if (age <= 45) {
    suggestedSize = "XL";
  } else if (age <= 55) {
    suggestedSize = "XXL";
  } else {
    suggestedSize = "XXXL";
  }

  sizeSuggestion.innerHTML = `Recommended Size: <strong>${suggestedSize}</strong>`;

  // Auto select radio button
  const sizeRadios = document.querySelectorAll('input[name="size"]');
  sizeRadios.forEach(radio => {
    if (radio.value === suggestedSize) {
      radio.checked = true;
    }
  });
});
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
const form = document.getElementById("registrationForm");
const submitBtn = document.querySelector(".register-btn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🚫 Prevent multiple clicks
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    const formData = new FormData(form);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData
      });

      alert("✅ Registration Successful!");
      form.reset();

      // 🔒 Lock button permanently (optional)
      submitBtn.innerText = "Registered ✅";

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong!");

      // 🔓 Re-enable if failed
      submitBtn.disabled = false;
      submitBtn.innerText = "Complete Registration";
    }
  });
}
