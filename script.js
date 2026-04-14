/* =========================
🎬 CINEMATIC INTRO
========================= */
const intro = document.getElementById("intro");
const main = document.getElementById("main");

setTimeout(() => {
intro.style.opacity = "0";
}, 2500);

setTimeout(() => {
intro.style.display = "none";
main.classList.remove("hidden");
}, 3500);

/* =========================
🌌 SCENE
========================= */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 220);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

/* =========================
🎥 RENDERER
========================= */
const renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("bg"),
antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* =========================
✨ BLOOM (VFX)
========================= */
const composer = new THREE.EffectComposer(renderer);

const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass(
new THREE.Vector2(window.innerWidth, window.innerHeight),
1.5,  // strength
0.4,  // radius
0.85  // threshold
);
composer.addPass(bloomPass);

/* =========================
💡 LIGHTING
========================= */
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

const red = new THREE.PointLight(0xff0040, 3, 200);
red.position.set(10, 20, 10);
scene.add(red);

const blue = new THREE.PointLight(0x00aaff, 3, 200);
blue.position.set(-10, 20, -10);
scene.add(blue);

/* =========================
🛣️ TRACK
========================= */
const track = new THREE.Mesh(
new THREE.PlaneGeometry(12, 500),
new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
);
track.rotation.x = -Math.PI / 2;
track.position.y = -5;
scene.add(track);

/* =========================
🌐 NEON GRID
========================= */
const grid = new THREE.GridHelper(300, 60, 0xff0040, 0x00aaff);
grid.position.y = -4.9;
scene.add(grid);

/* =========================
✨ GLOW LINES
========================= */
const mat = new THREE.LineBasicMaterial({ color: 0xff0040 });

for (let i = -5; i <= 5; i += 2) {
const geo = new THREE.BufferGeometry().setFromPoints([
new THREE.Vector3(i, -4.8, -300),
new THREE.Vector3(i, -4.8, 300)
]);
scene.add(new THREE.Line(geo, mat));
}

/* =========================
💡 SIDE LIGHTS
========================= */
for (let i = -1; i <= 1; i += 2) {
const bar = new THREE.Mesh(
new THREE.BoxGeometry(0.3, 0.3, 500),
new THREE.MeshBasicMaterial({ color: 0x00aaff })
);
bar.position.x = i * 8;
bar.position.y = -4.5;
scene.add(bar);
}

/* =========================
🎥 CAMERA
========================= */
camera.position.set(0, 8, 30);

/* =========================
🧲 MOUSE PARALLAX
========================= */
let mx = 0, my = 0;

addEventListener("mousemove", e => {
mx = (e.clientX / innerWidth - 0.5) * 2;
my = (e.clientY / innerHeight - 0.5) * 2;
});

/* =========================
⚡ SPEED BOOST
========================= */
let speed = 0.7;

addEventListener("click", () => {
speed = 3;
setTimeout(() => speed = 0.7, 700);
});

/* =========================
🔄 ANIMATION
========================= */
function animate() {
requestAnimationFrame(animate);

grid.position.z += speed;
if (grid.position.z > 10) grid.position.z = 0;

camera.position.x += (mx * 6 - camera.position.x) * 0.05;
camera.position.y += (8 - my * 4 - camera.position.y) * 0.05;

camera.lookAt(0, 0, 0);

composer.render();
}

animate();

/* =========================
📱 RESPONSIVE
========================= */
addEventListener("resize", () => {
renderer.setSize(innerWidth, innerHeight);
composer.setSize(innerWidth, innerHeight);

camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
});
