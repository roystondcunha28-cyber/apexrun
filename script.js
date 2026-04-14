/* =========================
🎬 INTRO TRANSITION
========================= */
setTimeout(() => {
const main = document.getElementById("main");
if (main) main.classList.remove("hidden");
}, 3000);

/* =========================
🌌 THREE JS SETUP
========================= */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 180);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("bg"),
antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* =========================
💡 LIGHTING (VFX GLOW)
========================= */
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const redLight = new THREE.PointLight(0xff0040, 2, 200);
redLight.position.set(0, 20, 20);
scene.add(redLight);

const blueLight = new THREE.PointLight(0x00aaff, 2, 200);
blueLight.position.set(0, 20, -20);
scene.add(blueLight);

/* =========================
🛣️ NEON GRID FLOOR
========================= */
const grid = new THREE.GridHelper(200, 40, 0xff0040, 0x00aaff);
grid.position.y = -5;
scene.add(grid);

/* =========================
🏁 RUNNING TRACK
========================= */
const trackGeo = new THREE.PlaneGeometry(12, 400);
const trackMat = new THREE.MeshStandardMaterial({
color: 0x0a0a0a,
roughness: 0.8
});

const track = new THREE.Mesh(trackGeo, trackMat);
track.rotation.x = -Math.PI / 2;
track.position.y = -4.9;
scene.add(track);

/* =========================
✨ NEON LANE LINES
========================= */
const laneMaterial = new THREE.LineBasicMaterial({ color: 0xff0040 });

for (let i = -4; i <= 4; i += 2) {
const points = [
new THREE.Vector3(i, -4.8, -200),
new THREE.Vector3(i, -4.8, 200)
];

const geo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geo, laneMaterial);
scene.add(line);
}

/* =========================
💡 SIDE GLOW BARS
========================= */
for (let i = -1; i <= 1; i += 2) {
const geo = new THREE.BoxGeometry(0.4, 0.4, 400);
const mat = new THREE.MeshBasicMaterial({
color: 0x00aaff
});

const bar = new THREE.Mesh(geo, mat);
bar.position.x = i * 8;
bar.position.y = -4.5;
scene.add(bar);
}

/* =========================
🎥 CAMERA
========================= */
camera.position.set(0, 8, 25);

/* =========================
🧲 MOUSE PARALLAX
========================= */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* =========================
⚡ SPEED BOOST EFFECT
========================= */
let speed = 0.6;

document.addEventListener("click", () => {
speed = 2.5;
setTimeout(() => speed = 0.6, 800);
});

/* =========================
🔄 ANIMATION LOOP
========================= */
function animate() {
requestAnimationFrame(animate);

// 🛣️ Move grid (running illusion)
grid.position.z += speed;
if (grid.position.z > 10) grid.position.z = 0;

// 🎥 Smooth camera movement
camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
camera.position.y += (8 + -mouseY * 3 - camera.position.y) * 0.05;

camera.lookAt(0, 0, 0);

renderer.render(scene, camera);
}

animate();

/* =========================
📱 RESPONSIVE
========================= */
window.addEventListener("resize", () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});

/* =========================
📜 MODAL (RUN DETAILS)
========================= */
const runs = [
{ title: "3K Run", rules: ["Fun run", "Open for all"] },
{ title: "5K Run", rules: ["Age 12+", "Stay hydrated"] },
{ title: "10K Run", rules: ["Age 16+", "Medical fitness required"] }
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

/* =========================
📝 FORM SUBMIT
========================= */
const form = document.getElementById("form");
if (form) {
form.addEventListener("submit", function(e){
e.preventDefault();
alert("Registration Successful 🚀");
});
}

/* =========================
💥 BUTTON RIPPLE EFFECT
========================= */
document.querySelectorAll("button").forEach(btn => {
btn.addEventListener("click", function(e){
const circle = document.createElement("span");

```
circle.style.position = "absolute";
circle.style.width = "120px";
circle.style.height = "120px";
circle.style.background = "rgba(255,255,255,0.3)";
circle.style.borderRadius = "50%";
circle.style.left = e.offsetX + "px";
circle.style.top = e.offsetY + "px";
circle.style.transform = "translate(-50%, -50%)";
circle.style.animation = "ripple 0.6s linear";

this.appendChild(circle);
setTimeout(() => circle.remove(), 600);
```

});
});
