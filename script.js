/* INTRO */
setTimeout(() => {
document.getElementById("main").classList.remove("hidden");
}, 3000);

/* FIX DOM */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const rules = document.getElementById("rules");
const form = document.getElementById("form");

/* SCENE */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 200);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("bg"),
antialias: true
});

renderer.setSize(innerWidth, innerHeight);

/* LIGHTS */
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const light1 = new THREE.PointLight(0xff0033, 2);
light1.position.set(10, 20, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0x00d4ff, 2);
light2.position.set(-10, 20, -10);
scene.add(light2);

/* TRACK */
const track = new THREE.Mesh(
new THREE.PlaneGeometry(12, 400),
new THREE.MeshStandardMaterial({ color: 0x111111 })
);
track.rotation.x = -Math.PI/2;
track.position.y = -4.9;
scene.add(track);

/* PARTICLES (PRO UPGRADE) */
const particlesGeo = new THREE.BufferGeometry();
const count = 500;

const positions = [];
for (let i = 0; i < count; i++) {
positions.push((Math.random()-0.5)*200);
positions.push(Math.random()*50);
positions.push((Math.random()-0.5)*200);
}

particlesGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

const particlesMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.5 });

const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

/* CAMERA */
camera.position.set(0, 6, 20);

/* MOUSE */
let mx = 0, my = 0;

addEventListener("mousemove", e => {
mx = (e.clientX / innerWidth - 0.5) * 2;
my = (e.clientY / innerHeight - 0.5) * 2;
});

/* SPEED */
let speed = 0.6;

addEventListener("click", () => {
speed = 2;
setTimeout(() => speed = 0.6, 800);
});

/* ANIMATE */
function animate() {
requestAnimationFrame(animate);

/* track loop */
track.position.z += speed;
if (track.position.z > 50) track.position.z = 0;

/* particles movement */
particles.rotation.y += 0.001;

/* camera smooth */
camera.position.x += (mx * 5 - camera.position.x) * 0.05;
camera.position.y += (6 - my * 3 - camera.position.y) * 0.05;

camera.lookAt(0, 0, 0);

renderer.render(scene, camera);
}
animate();

/* RESIZE FIX */
addEventListener("resize", () => {
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(innerWidth, innerHeight);
});

/* MODAL */
const runs = [
{ title: "3K Run", rules: ["Fun run", "Open to all"] },
{ title: "5K Run", rules: ["Age 12+", "Hydration needed"] },
{ title: "10K Run", rules: ["Age 16+", "Medical fitness required"] }
];

function openModal(i) {
modal.style.display = "flex";
modalTitle.innerText = runs[i].title;
rules.innerHTML = runs[i].rules.map(r => `<li>${r}</li>`).join("");
}

function closeModal() {
modal.style.display = "none";
}

/* FORM */
form.onsubmit = e => {
e.preventDefault();
form.innerHTML = "<h2>Registered Successfully 🚀</h2>";
};
