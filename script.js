/* INTRO */
setTimeout(() => {
document.getElementById("main").classList.remove("hidden");
}, 3000);

/* FIREBASE CONFIG */
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_BUCKET",
messagingSenderId: "YOUR_ID",
appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* DOM */
const form = document.getElementById("form");
const userList = document.getElementById("userList");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const rules = document.getElementById("rules");

/* SAVE DATA */
form.onsubmit = async (e) => {
e.preventDefault();

const data = {
name: form.name.value,
location: form.location.value,
phone: form.phone.value,
email: form.email.value,
category: form.category.value,
time: new Date()
};

await db.collection("registrations").add(data);

form.reset();
};

/* LIVE DATA */
db.collection("registrations")
.orderBy("time", "desc")
.onSnapshot(snapshot => {
userList.innerHTML = "";

snapshot.forEach(doc => {
const u = doc.data();

userList.innerHTML += `
<div class="card">
<h3>${u.name}</h3>
<p>${u.location}</p>
<p>${u.phone}</p>
<p>${u.email}</p>
<p>${u.category}</p>
</div>
`;
});
});

/* THREE JS */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("bg")});
renderer.setSize(innerWidth, innerHeight);

camera.position.z = 20;

/* GRID */
const grid = new THREE.GridHelper(200, 50);
scene.add(grid);

function animate(){
requestAnimationFrame(animate);
grid.position.z += 0.5;
if(grid.position.z > 10) grid.position.z = 0;
renderer.render(scene,camera);
}
animate();

/* MODAL */
const runs = [
{title:"3K Run",rules:["Fun Run","All ages"]},
{title:"5K Run",rules:["Age 12+","Hydration required"]},
{title:"10K Run",rules:["Age 16+","Medical fitness"]}
];

function openModal(i){
modal.style.display="flex";
modalTitle.innerText=runs[i].title;
rules.innerHTML=runs[i].rules.map(r=>`<li>${r}</li>`).join("");
}

function closeModal(){
modal.style.display="none";
}
