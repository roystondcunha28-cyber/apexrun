const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 300);

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

/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const redLight = new THREE.PointLight(0xff0000, 2, 200);
redLight.position.set(0, 20, 20);
scene.add(redLight);

const blueLight = new THREE.PointLight(0x00aaff, 2, 200);
blueLight.position.set(0, 20, -20);
scene.add(blueLight);

/* ROAD */
const roadGeo = new THREE.PlaneGeometry(200, 600, 50, 50);
const roadMat = new THREE.MeshStandardMaterial({
color: 0x111111,
side: THREE.DoubleSide
});
const road = new THREE.Mesh(roadGeo, roadMat);
road.rotation.x = -Math.PI / 2;
road.position.y = -5;
scene.add(road);

/* NEON LANES */
const laneMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

for (let i = -10; i <= 10; i += 5) {
const pts = [
new THREE.Vector3(i, -4.9, -300),
new THREE.Vector3(i, -4.9, 300)
];
const geo = new THREE.BufferGeometry().setFromPoints(pts);
const line = new THREE.Line(geo, laneMaterial);
scene.add(line);
}

/* CITY BUILDINGS */
for (let i = 0; i < 50; i++) {
const geo = new THREE.BoxGeometry(5, Math.random() * 30 + 10, 5);
const mat = new THREE.MeshStandardMaterial({ color: 0x111111 });

const building = new THREE.Mesh(geo, mat);

building.position.x = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 50);
building.position.z = (Math.random() - 0.5) * 400;
building.position.y = geo.parameters.height / 2 - 5;

scene.add(building);
}

/* PARTICLES */
const starsGeo = new THREE.BufferGeometry();
const starCount = 4000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
positions[i] = (Math.random() - 0.5) * 500;
}

starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const starsMat = new THREE.PointsMaterial({
size: 0.7
});

const stars = new THREE.Points(starsGeo, starsMat);
scene.add(stars);

/* SPEED LINES (RUNNER EFFECT) */
const speedGeo = new THREE.BufferGeometry();
const speedCount = 500;
const speedPos = new Float32Array(speedCount * 3);

for (let i = 0; i < speedCount * 3; i++) {
speedPos[i] = (Math.random() - 0.5) * 200;
}

speedGeo.setAttribute("position", new THREE.BufferAttribute(speedPos, 3));

const speedMat = new THREE.PointsMaterial({
size: 2
});

const speedLines = new THREE.Points(speedGeo, speedMat);
scene.add(speedLines);

/* CAMERA */
camera.position.set(0, 8, 30);

/* MOUSE CONTROL */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ANIMATION */
let speed = 1;

function animate() {
requestAnimationFrame(animate);

// ROAD movement
road.position.z += speed;
if (road.position.z > 200) road.position.z = 0;

// SPEED LINES
speedLines.position.z += speed * 5;
if (speedLines.position.z > 200) speedLines.position.z = 0;

// STARS
stars.rotation.y += 0.001;

// CAMERA movement
camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
camera.position.y += (8 + -mouseY * 5 - camera.position.y) * 0.05;

camera.lookAt(0, 0, 0);

renderer.render(scene, camera);
}

animate();

/* BOOST EFFECT */
document.addEventListener("click", () => {
speed = 5;
setTimeout(() => speed = 1, 1000);
});

/* RESPONSIVE */
window.addEventListener("resize", () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});
