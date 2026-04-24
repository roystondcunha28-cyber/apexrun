document.addEventListener("DOMContentLoaded", () => {

  console.log("APEX RUN Loaded Successfully!");

  /* =========================
     ✅ AMENITIES TOGGLE (FIXED)
  ========================= */
  document.querySelectorAll('.rules-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.getAttribute('aria-controls'));
      if (!target) return;

      target.classList.toggle("active");

      // close others (premium feel)
      document.querySelectorAll('.event-rules').forEach(el => {
        if (el !== target) el.classList.remove("active");
      });
    });
  });


  /* =========================
     ⏳ COUNTDOWN
  ========================= */
  const targetDate = new Date("May 10, 2026 05:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timer);
      if (countdownEl) countdownEl.innerHTML = "🚀 Event Started!";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    if (countdownEl) countdownEl.innerHTML = `${d}d ${h}h ${m}m`;

  }, 1000);

const album = document.querySelector(".album-scroll");

if (album) {
  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += 300;

    if (scrollAmount >= album.scrollWidth) {
      scrollAmount = 0;
    }

    album.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }, 3000);
}
  /*=========================
   📸 LIGHTBOX FUNCTION
========================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".album-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove("active");
  }
});
  /* =========================
     📏 SIZE SUGGESTION
  ========================= */
  const ageInput = document.getElementById("age");
  const sizeSuggestion = document.getElementById("sizeSuggestion");

  if (ageInput && sizeSuggestion) {
    ageInput.addEventListener("input", () => {

      const age = parseInt(ageInput.value);
      if (!age) {
        sizeSuggestion.innerHTML = "";
        return;
      }

      let size = "";

      if (age <= 7) size = "6-8Y";
      else if (age <= 10) size = "8-10Y";
      else if (age <= 12) size = "10-12Y";
      else if (age <= 15) size = "XS";
      else if (age <= 18) size = "S";
      else if (age <= 25) size = "M";
      else if (age <= 35) size = "L";
      else if (age <= 45) size = "XL";
      else if (age <= 55) size = "XXL";
      else size = "XXXL";

      sizeSuggestion.innerHTML = `Recommended Size: <strong>${size}</strong>`;

      document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.checked = radio.value === size;
      });

    });
  }
/* =========================
   💳 DYNAMIC QR + UTR SHOW
========================= */
const qrImage = document.getElementById("qrImage");
const qrLabel = document.getElementById("qrLabel");
const utrGroup = document.getElementById("utrGroup");

const qrMap = {
  "3K": { src: "qr-3k.jpeg", text: "Scan to pay ₹250 for 3K Run" },
  "5K": { src: "qr-5k.jpeg", text: "Scan to pay ₹350 for 5K Run" },
  "10K": { src: "qr-10k.jpeg", text: "Scan to pay ₹450 for 10K Run" }
};

document.querySelectorAll('input[name="run"]').forEach(radio => {
  radio.addEventListener("change", () => {

    const selected = radio.value;

    if (!qrMap[selected]) return;

    // hide QR before switching
    qrImage.style.opacity = 0;

    setTimeout(() => {

      // 🔥 UPDATE QR
      qrImage.src = qrMap[selected].src;
      qrImage.style.display = "block";
      qrLabel.innerHTML = qrMap[selected].text;
      qrImage.style.opacity = 1;

      // 🔥 SHOW UTR FIELD HERE
      if (utrGroup) {
        utrGroup.style.display = "block";
      }

    }, 150);

  });
});
  /* =========================
     🚀 FORM SUBMIT (WORKING)
  ========================= */
  const form = document.getElementById("registrationForm");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8U4XBl2d20-0veslXtFbBDieYum5X_I_inZsVps79D9cdKbtQkzER-Zx5TVwKbXA85A/exec";

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector(".register-btn");
      const originalText = btn.innerText;

      const formData = new FormData(form);

      /* ✅ VALIDATION */
      if (!formData.get("run")) {
        alert("⚠️ Please select a run");
        return;
      }

      if (!formData.get("size")) {
        alert("⚠️ Please select a T-shirt size");
        return;
      }

      if (!/^[0-9]{10}$/.test(formData.get("phone"))) {
        alert("⚠️ Enter valid 10-digit phone number");
        return;
      }
const utr = formData.get("utr");

if (!utr || !/^[A-Za-z0-9]{10,20}$/.test(utr)) {
  alert("⚠️ Please enter a valid UTR / Transaction ID");
  return;
}
      btn.innerText = "Processing...";
      btn.disabled = true;
      console.log({
  utr: formData.get("utr")
});
      try {
  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: new URLSearchParams({
      name: formData.get("name"),
      location: formData.get("location"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      run: formData.get("run"),
      size: formData.get("size"),
      organisation: formData.get("organisation"),
      utr: formData.get("utr") // ✅ FIXED
    })
  });

  const data = await response.json(); // ✅ READ RESPONSE

  if (data.status === "success") {
    btn.innerText = "✅ Registered!";
    form.reset();
  }
  else if (data.status === "duplicate_phone") {
    alert("⚠️ Phone already registered");
  }
  else if (data.status === "duplicate_utr") {
    alert("⚠️ UTR already used");
  }
  else {
    alert("❌ Registration failed");
  }

} catch (error) {
  console.error(error);
  alert("❌ Network or script error");
}
 setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
       }, 2000);
       
    });
  }

});
/* =========================
   🔥 THREE.JS HERO VFX
========================= */
const canvas = document.getElementById("heroCanvas");

if (canvas && window.innerWidth > 768) { // disable on small devices for performance

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.position.z = 5;

  /* PARTICLES */
  const particlesCount = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < particlesCount; i++) {
    positions.push(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 10
    );
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.03
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  /* ANIMATION */
  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    renderer.render(scene, camera);
  }

  animate();

  /* RESIZE FIX */
  window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}
