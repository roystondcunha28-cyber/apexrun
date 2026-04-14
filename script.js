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

/* LIGHTING */
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const neonLight = new THREE.PointLight(0xff0040, 3, 200);
neonLight.position.set(0, 20, 20);
scene.add(neonLight);

/* NEON GRID FLOOR */
const grid = new THREE.GridHelper(200, 40, 0xff0040, 0x00aaff);
grid.position.y = -5;
scene.add(grid);

/* RUNNING TRACK (CENTER STRIP) */
const trackGeo = new THREE.PlaneGeometry(10, 400);
const trackMat = new THREE.MeshBasicMaterial({
color: 0x111111
});
const track = new THREE.Mesh(trackGeo, trackMat);
track.rotation.x = -Math.PI / 2;
track.position.y = -4.9;
scene.add(track);

/* NEON LANE LINES */
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

/* SIDE LIGHT BARS */
for (let i = -1; i <= 1; i += 2) {
const lightGeo = new THREE.BoxGeometry(0.5, 0.5, 400);
const lightMat = new THREE.MeshBasicMaterial({
color: 0x00aaff
});

const bar = new THREE.Mesh(lightGeo, lightMat);
bar.position.x = i * 8;
bar.position.y = -4;
scene.add(bar);
}

/* CAMERA */
camera.position.set(0, 8, 25);

/* MOUSE CONTROL */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ANIMATION */
function animate() {
requestAnimationFrame(animate);

// move grid (illusion of running)
grid.position.z += 0.5;
if (grid.position.z > 10) grid.position.z = 0;

// camera follow mouse
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
