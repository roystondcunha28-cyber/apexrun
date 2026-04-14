/* THREE JS SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
canvas: document.getElementById('bg')
});

renderer.setSize(window.innerWidth, window.innerHeight);

/* LIGHT */
const light = new THREE.PointLight(0xff0000, 2);
light.position.set(5,5,5);
scene.add(light);

/* GEOMETRY (ROAD EFFECT) */
const geometry = new THREE.PlaneGeometry(100, 200, 10, 10);
const material = new THREE.MeshStandardMaterial({
color: 0x111111,
wireframe: true
});

const road = new THREE.Mesh(geometry, material);
road.rotation.x = -Math.PI / 2;
scene.add(road);

/* PARTICLES */
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);

for(let i=0;i<particlesCount*3;i++){
posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
size: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

/* CAMERA */
camera.position.z = 30;

/* ANIMATION */
function animate() {
requestAnimationFrame(animate);

road.position.z += 0.5;
if(road.position.z > 50) road.position.z = 0;

particlesMesh.rotation.y += 0.001;

renderer.render(scene, camera);
}

animate();

/* MODAL */
const runs = [
{title:"3K Run", rules:["Fun run","Open for all"]},
{title:"5K Run", rules:["Age 12+","Hydrate"]},
{title:"10K Run", rules:["Age 16+","Medical required"]}
];

function openModal(i){
document.getElementById("modal").style.display="block";
document.getElementById("modal-title").innerText=runs[i].title;

let list="";
runs[i].rules.forEach(r=> list+=`<li>${r}</li>`);
document.getElementById("rules").innerHTML=list;
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

/* FORM */
document.getElementById("form").addEventListener("submit", function(e){
e.preventDefault();
alert("Registered 🚀");
});
