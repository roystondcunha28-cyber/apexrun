// PARTICLES
const c=document.getElementById('bg');
const ctx=c.getContext('2d');
c.width=innerWidth;
c.height=innerHeight;

let p=[];
for(let i=0;i<100;i++){
p.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2});
}

function draw(){
ctx.clearRect(0,0,c.width,c.height);
ctx.fillStyle="#ff3c00";
p.forEach(a=>{
a.y+=0.5;
if(a.y>innerHeight)a.y=0;
ctx.beginPath();
ctx.arc(a.x,a.y,a.r,0,6.28);
ctx.fill();
});
requestAnimationFrame(draw);
}
draw();

// COUNTDOWN
const target=new Date("Jan 1, 2026").getTime();
setInterval(()=>{
let now=new Date().getTime();
let d=Math.floor((target-now)/(1000*60*60*24));
document.getElementById("countdown").innerText=d+" Days Left";
},1000);

// VIEW MORE
function toggleMore(btn){
btn.nextElementSibling.classList.toggle("show");
}

// SCROLL
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// FORM + PAYMENT
document.getElementById("form").addEventListener("submit",function(e){
e.preventDefault();

let data={
name:document.getElementById("name").value,
location:document.getElementById("location").value,
phone:document.getElementById("phone").value,
email:document.getElementById("email").value,
category:document.getElementById("category").value
};

let price={
"10K":450,
"5K":350,
"3K":250
}[data.category];

var options={
key:"YOUR_RAZORPAY_KEY",
amount:price*100,
currency:"INR",
name:"Apex Run 2026",
handler:function(){
fetch("YOUR_SCRIPT_URL",{
method:"POST",
body:JSON.stringify(data)
});
window.open(`https://wa.me/91${data.phone}`);
alert("Registration Successful!");
}
};

var rzp=new Razorpay(options);
rzp.open();
});
