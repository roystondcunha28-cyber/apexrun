/* INTRO */
setTimeout(() => {
document.getElementById("main").classList.remove("hidden");
}, 3000);

/* THREE JS */
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

const red = new THREE.PointLight(0xff0000, 2);
red.position.set(10,20,10);
scene.add(red);

const blue = new THREE.PointLight(0x00aaff, 2);
blue.position.set(-10,20,-10);
scene.add(blue);

/* GRID */
const grid = new THREE.GridHelper(200, 40, 0xff0000, 0x00aaff);
grid.position.y = -5;
scene.add(grid);

/* TRACK */
const track = new THREE.Mesh(
new THREE.PlaneGeometry(10, 400),
new THREE.MeshStandardMaterial({color:0x111111})
);
track.rotation.x = -Math.PI/2;
track.position.y = -4.9;
scene.add(track);

/* CAMERA */
camera.position.set(0,8,25);

/* MOUSE */
let mx=0,my=0;
addEventListener("mousemove",e=>{
mx=(e.clientX/innerWidth-0.5)*2;
my=(e.clientY/innerHeight-0.5)*2;
});

/* ANIMATION */
let speed=0.6;

addEventListener("click",()=>{
speed=2;
setTimeout(()=>speed=0.6,800);
});

function animate(){
requestAnimationFrame(animate);

grid.position.z+=speed;
if(grid.position.z>10) grid.position.z=0;

camera.position.x+=(mx*5-camera.position.x)*0.05;
camera.position.y+=(8-my*3-camera.position.y)*0.05;

camera.lookAt(0,0,0);

renderer.render(scene,camera);
}
animate();

/* MODAL */
const runs=[
{title:"3K Run",rules:["Fun run","Open to all"]},
{title:"5K Run",rules:["Age 12+","Hydration needed"]},
{title:"10K Run",rules:["Age 16+","Medical fitness"]}
];

function openModal(i){
modal.style.display="block";
modalTitle.innerText=runs[i].title;

rules.innerHTML="";
runs[i].rules.forEach(r=>{
rules.innerHTML+=`<li>${r}</li>`;
});
}

function closeModal(){
modal.style.display="none";
}

/* FORM */
form.onsubmit=e=>{
e.preventDefault();
alert("Registered 🚀");
};
