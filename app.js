function showDetails(btn) {
  const details = btn.nextElementSibling;
  details.style.display = "block";

  // CONFETTI BURST
  for (let i = 0; i < 80; i++) {
    let confetti = document.createElement("div");
    confetti.className = "confetti";
    document.body.appendChild(confetti);

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = `hsl(${Math.random()*360},100%,50%)`;
    confetti.style.animationDuration = Math.random() * 2 + 1 + "s";

    setTimeout(() => confetti.remove(), 2000);
  }
}

// ADD CONFETTI STYLE
const style = document.createElement('style');
style.innerHTML = `
.confetti {
  position: fixed;
  width: 6px;
  height: 6px;
  top: 0;
  animation: fall linear;
}
@keyframes fall {
  to { transform: translateY(100vh); }
}`;
document.head.appendChild(style);
