/* LENIS */
const lenis = new Lenis({ lerp: 0.08 });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

/* LOADER CINEMATIC */
gsap.timeline()
  .from(".loader-text", {
    opacity: 0,
    y: 50,
    duration: 1
  })
  .to(".loader", {
    opacity: 0,
    delay: 0.5,
    duration: 1,
    onComplete: () => document.querySelector(".loader").style.display = "none"
  });

/* TEXT REVEAL */
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });
});

/* CURSOR */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* HOVER SCALE */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
  });
  btn.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
  });
});

/* MAGNETIC BUTTON */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
