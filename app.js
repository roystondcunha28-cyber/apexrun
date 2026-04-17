// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.PointLight(0xffffff);
light.position.set(20, 20, 20);
scene.add(light);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Countdown
const countdown = document.getElementById("countdown");
const eventDate = new Date("May 10, 2026 05:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = eventDate - now;

  const days = Math.floor(gap / (1000*60*60*24));
  const hours = Math.floor((gap / (1000*60*60)) % 24);
  const minutes = Math.floor((gap / (1000*60)) % 60);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m`;
}, 1000);
