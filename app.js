/* SMOOTH SCROLL */
const lenis = new Lenis();
function raf(t){ lenis.raf(t); requestAnimationFrame(raf);}
requestAnimationFrame(raf);

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".reveal").forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    },
    opacity: 0,
    y: 60,
    duration: 1
  });
});

/* CONFETTI */
document.querySelectorAll(".confetti").forEach(btn => {
  btn.onclick = () => {
    for(let i=0;i<20;i++){
      let d=document.createElement("div");
      document.body.appendChild(d);
      gsap.to(d,{
        x:Math.random()*200-100,
        y:Math.random()*-200,
        opacity:0,
        duration:1,
        onComplete:()=>d.remove()
      });
    }
  };
});

/* PAYMENT FLOW */
document.getElementById("regForm").onsubmit = e => {
  e.preventDefault();
  document.getElementById("paymentBox").classList.remove("hidden");
};

document.getElementById("confirmBtn").onclick = () => {
  alert("Registration Submitted ✅");
};
