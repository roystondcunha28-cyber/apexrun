/* INTRO TRANSITION */
setTimeout(() => {
document.getElementById("main").classList.remove("hidden");
}, 3000);

/* MODAL */
const runs = [
{ title: "3K Run", rules: ["Fun run", "Open for all"] },
{ title: "5K Run", rules: ["Age 12+", "Hydration required"] },
{ title: "10K Run", rules: ["Age 16+", "Medical fitness"] }
];

function openModal(i) {
document.getElementById("modal").style.display = "block";
document.getElementById("modal-title").innerText = runs[i].title;

let list = "";
runs[i].rules.forEach(r => list += `<li>${r}</li>`);
document.getElementById("rules").innerHTML = list;
}

function closeModal() {
document.getElementById("modal").style.display = "none";
}

/* FORM */
document.getElementById("form").addEventListener("submit", function(e){
e.preventDefault();
alert("Registration Successful 🚀");
});

/* RIPPLE EFFECT */
document.querySelectorAll("button").forEach(btn => {
btn.addEventListener("click", function(e){
const circle = document.createElement("span");
circle.style.position = "absolute";
circle.style.width = "100px";
circle.style.height = "100px";
circle.style.background = "rgba(255,255,255,0.3)";
circle.style.borderRadius = "50%";
circle.style.left = e.offsetX + "px";
circle.style.top = e.offsetY + "px";
circle.style.transform = "translate(-50%, -50%)";
circle.style.animation = "ripple 0.6s linear";

```
this.appendChild(circle);
setTimeout(() => circle.remove(), 600);
```

});
});
