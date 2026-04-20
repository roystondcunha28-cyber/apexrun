document.addEventListener("DOMContentLoaded", () => {

  console.log("APEX RUN Loaded Successfully!");

  // ✅ TOGGLE
  document.querySelectorAll('.rules-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const rulesDiv = document.getElementById(button.getAttribute('aria-controls'));
      if (!rulesDiv) return;
      rulesDiv.classList.toggle("show");
    });
  });

  // ✅ COUNTDOWN
  const targetDate = new Date("May 10, 2026 05:00:00").getTime();
  setInterval(() => {
    const now = Date.now();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);

    const el = document.getElementById("countdown");
    if (el) el.innerHTML = `${days}d ${hours}h ${mins}m`;
  }, 1000);

  // ✅ SIZE SUGGESTION
  const ageInput = document.getElementById("age");
  const sizeSuggestion = document.getElementById("sizeSuggestion");

  if (ageInput && sizeSuggestion) {
    ageInput.addEventListener("input", () => {

      const age = parseInt(ageInput.value);
      if (!age) return;

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

  // ✅ FORM SUBMIT
  const form = document.getElementById("registrationForm");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJjRqD3ryFhcT3yHtDz49OE98fcQ9y1S0XtmK66sVvPhJM718jaUHsW06R6jv7G0iC_A/exec";

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams({
            name: formData.get("name"),
            location: formData.get("location"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            run: formData.get("run"),
            size: formData.get("size"),
            organisation: formData.get("organisation")
          })
        });

        alert("✅ Registration Successful!");
        form.reset();

      } catch (error) {
        console.error(error);
        alert("❌ Submission failed!");
      }
    });
  }

});
