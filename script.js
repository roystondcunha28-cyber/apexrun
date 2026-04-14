// SMOOTH SCROLL
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// SCROLL REVEAL
function reveal(){
let reveals=document.querySelectorAll(".reveal");

reveals.forEach(el=>{
let top=el.getBoundingClientRect().top;
let windowHeight=window.innerHeight;

if(top < windowHeight - 100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",reveal);
reveal();
