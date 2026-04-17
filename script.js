// Amenities Toggle
function toggleRules(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

// Countdown
const countdown = document.getElementById("countdown");
const eventDate = new Date("May 10, 2026 05:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = eventDate - now;

  const d = Math.floor(gap / (1000*60*60*24));
  const h = Math.floor((gap/(1000*60*60))%24);
  const m = Math.floor((gap/(1000*60))%60);

  countdown.innerHTML = `${d}d ${h}h ${m}m`;
}, 1000);
