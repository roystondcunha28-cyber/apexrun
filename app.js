/* LENIS */
const lenis = new Lenis({ lerp: 0.08 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf);}
requestAnimationFrame(raf);

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

/* REVEAL */
gsap.utils.toArray(".reveal").forEach(el=>{
  gsap.from(el,{
    scrollTrigger:{trigger:el,start:"top 80%"},
    opacity:0,y:80,duration:1.2,ease:"power4.out"
  });
});

/* CONFETTI */
document.querySelectorAll(".confetti").forEach(btn=>{
  btn.onclick=()=>{
    for(let i=0;i<30;i++){
      let d=document.createElement("div");
      d.style.position="fixed";
      d.style.width="5px";
      d.style.height="5px";
      d.style.background="cyan";
      document.body.appendChild(d);

      gsap.to(d,{
        x:Math.random()*300-150,
        y:Math.random()*-300,
        opacity:0,
        duration:1,
        onComplete:()=>d.remove()
      });
    }
  }
});

/* PAYMENT FLOW */
regForm.onsubmit=e=>{
  e.preventDefault();
  paymentBox.classList.remove("hidden");
};
confirmBtn.onclick=()=>alert("Registered ✅");

/* ===== ADVANCED PARTICLE NETWORK ===== */

const canvas = document.getElementById("vfx");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let pts = [];
for(let i=0;i<100;i++){
  pts.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  pts.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle="cyan";
    ctx.fill();
  });

  /* CONNECT LINES */
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      let dx=pts[i].x-pts[j].x;
      let dy=pts[i].y-pts[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);

      if(dist<120){
        ctx.strokeStyle="rgba(0,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(pts[i].x,pts[i].y);
        ctx.lineTo(pts[j].x,pts[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
