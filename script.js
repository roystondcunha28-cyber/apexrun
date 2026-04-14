/* INTRO TRANSITION */
setTimeout(() => {
document.getElementById("main").classList.remove("hidden");
}, 3000);
/* THREE JS SCENE */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 200);

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

/* LIGHTING (VFX GLOW) */
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const redLight = new THREE.PointLight(0xff0040, 2, 200);
redLight.position.set(0, 20, 20);
scene.add(redLight);

const blueLight = new THREE.PointLight(0x00aaff, 2, 200);
blueLight.position.set(0, 20, -20);
scene.add(blueLight);

/* NEON GRID FLOOR */
const grid = new THREE.GridHelper(200, 40, 0xff0040, 0x00aaff);
grid.position.y = -5;
scene.add(grid);

/* TRACK */
const trackGeo = new THREE.PlaneGeometry(10, 400);
const trackMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
const track = new THREE.Mesh(trackGeo, trackMat);

track.rotation.x = -Math.PI / 2;
track.position.y = -4.9;
scene.add(track);

/* GLOW LINES */
const material = new THREE.LineBasicMaterial({ color: 0xff0040 });

for (let i = -4; i <= 4; i += 2) {
const points = [
new THREE.Vector3(i, -4.8, -200),
new THREE.Vector3(i, -4.8, 200)
];

const geo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geo, material);
scene.add(line);
}

/* CAMERA */
camera.position.set(0, 8, 25);

/* MOUSE PARALLAX */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ANIMATION */
function animate() {
requestAnimationFrame(animate);

// Move grid (runner effect)
grid.position.z += 0.6;
if (grid.position.z > 10) grid.position.z = 0;

// Camera motion
camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
camera.position.y += (8 + -mouseY * 3 - camera.position.y) * 0.05;

camera.lookAt(0, 0, 0);

renderer.render(scene, camera);
}

animate();

/* RESPONSIVE */
window.addEventListener("resize", () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});

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
