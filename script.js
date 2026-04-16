const canvas = document.getElementById("webgl");

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 2000);
camera.position.set(0, 2, 15);

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

/* BLOOM */
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

const bloom = new THREE.UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  2,
  0.5,
  0.2
);
composer.addPass(bloom);

/* LIGHT */
const light = new THREE.PointLight(0x00ffff, 10, 100);
light.position.set(0, 10, 10);
scene.add(light);

/* CITY (FAKE BUILDINGS) */
for (let i = 0; i < 80; i++) {
  const geo = new THREE.BoxGeometry(1, Math.random() * 10 + 2, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: 0x00ffff,
    emissiveIntensity: 0.2
  });

  const building = new THREE.Mesh(geo, mat);

  building.position.x = (Math.random() - 0.5) * 40;
  building.position.z = (Math.random() - 0.5) * 40;
  building.position.y = geo.parameters.height / 2 - 3;

  scene.add(building);
}

/* ROAD */
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 10),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);
road.rotation.x = -Math.PI / 2;
road.position.y = -3;
scene.add(road);

/* RUNNER LIGHT TRAILS */
const trails = [];

for (let i = 0; i < 5; i++) {
  const trail = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 3),
    new THREE.MeshBasicMaterial({ color: 0xff5500 })
  );

  trail.position.set(i - 2, -2.5, -10);
  trails.push(trail);
  scene.add(trail);
}

/* OPTIONAL REAL RUNNER MODEL */
const loader = new THREE.GLTFLoader();
/*
loader.load('assets/runner.glb', (gltf) => {
  gltf.scene.scale.set(2,2,2);
  gltf.scene.position.y = -3;
  scene.add(gltf.scene);
});
*/

/* START */
let started = false;

document.getElementById("startBtn").onclick = () => {
  document.querySelector(".overlay").classList.add("hidden");
  started = true;
};

/* MOUSE */
let mouseX = 0;
let mouseY = 0;

addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / innerWidth - 0.5);
  mouseY = (e.clientY / innerHeight - 0.5);
});

/* LOOP */
function animate() {
  requestAnimationFrame(animate);

  /* Move forward */
  if (started) {
    camera.position.z -= 0.1;
  }

  /* Trails movement */
  trails.forEach(t => {
    t.position.z += 0.5;
    if (t.position.z > 10) t.position.z = -20;
  });

  /* Parallax */
  camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;

  camera.lookAt(0, 0, 0);

  composer.render();
}

animate();

/* RESIZE */
addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});
