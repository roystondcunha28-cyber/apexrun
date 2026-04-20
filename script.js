document.addEventListener("DOMContentLoaded", () => {

  console.log("APEX RUN Loaded Successfully!");

  /* =========================
     ✅ AMENITIES TOGGLE (FIXED)
  ========================= */
  document.querySelectorAll('.rules-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;

      target.classList.toggle("active");

      // close others (premium feel)
      document.querySelectorAll('.event-rules').forEach(el => {
        if (el !== target) el.classList.remove("active");
      });
    });
  });


  /* =========================
     ⏳ COUNTDOWN
  ========================= */
  const targetDate = new Date("May 10, 2026 05:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      if (countdownEl) countdownEl.innerHTML = "🚀 Event Started!";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    if (countdownEl) countdownEl.innerHTML = `${d}d ${h}h ${m}m`;

  }, 1000);


  /* =========================
     📏 SIZE SUGGESTION
  ========================= */
  const ageInput = document.getElementById("age");
  const sizeSuggestion = document.getElementById("sizeSuggestion");

  if (ageInput && sizeSuggestion) {
    ageInput.addEventListener("input", () => {

      const age = parseInt(ageInput.value);
      if (!age) {
        sizeSuggestion.innerHTML = "";
        return;
      }

      let size = "";

      if (age <= 7) size = "6-8Y";
      else if (age <= 10) size = "8-10Y";
      else if (age <= 12) size = "10-12Y";
      else if (age <= 15) size = "XS";
      else if (age <= 18) size = "S";
      else if (age <= 25) size = "M";
      else if (age <= 35) size = "L";
      else if (age <= 45) size = "XL";
      else if (age <= 55) size = "XXL";
      else size = "XXXL";

      sizeSuggestion.innerHTML = `Recommended Size: <strong>${size}</strong>`;

      document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.checked = radio.value === size;
      });

    });
  }


  /* =========================
     🚀 FORM SUBMIT (WORKING)
  ========================= */
  const form = document.getElementById("registrationForm");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbR3_yFuHbBoJT6iQwOi3moAF-X-S65eZo1RhVjCYrpWhIihnQWcbDe8mqbzzv0vb1VA/exec";

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector(".register-btn");
      const originalText = btn.innerText;

      const formData = new FormData(form);

      /* ✅ VALIDATION */
      if (!formData.get("run")) {
        alert("⚠️ Please select a run");
        return;
      }

      if (!formData.get("size")) {
        alert("⚠️ Please select a T-shirt size");
        return;
      }

      if (!/^[0-9]{10}$/.test(formData.get("phone"))) {
        alert("⚠️ Enter valid 10-digit phone number");
        return;
      }

      btn.innerText = "Processing...";
      btn.disabled = true;

      try {
       const response = await fetch(SCRIPT_URL, {
  method: "POST",
  body: new URLSearchParams({
    name: formData.get("name"),
    location: formData.get("location"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    run: formData.get("run"),
    size: formData.get("size"),
    organisation: formData.get("organisation")
  }),
  mode: "no-cors"
});

    

        if (result.status === "success") {
          btn.innerText = "✅ Registered!";
          form.reset();
        } 
        else if (result.status === "duplicate") {
          btn.innerText = "⚠️ Already Registered";
        } 
        else {
          btn.innerText = "❌ Error";
        }

      } catch (error) {
        console.error(error);
        btn.innerText = "❌ Failed";
      }

      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      }, 2000);

    });
  }

});
