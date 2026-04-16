/* LENIS SMOOTH SCROLL */
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* GSAP SCROLL ANIMATIONS */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(el => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
  });
});
