document.addEventListener("DOMContentLoaded", () => {

  console.log("APEX RUN 2026 Loaded ✅");

  /* =========================
     ✅ AMENITIES TOGGLE
  ========================= */
  document.querySelectorAll('.rules-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      if (!target) return;

      const isOpen = target.classList.contains("active");

      // Close all first
      document.querySelectorAll('.event-rules').forEach(el => el.classList.remove("active"));
      document.querySelectorAll('.rules-toggle').forEach(btn => {
        btn.textContent = "Amenities";
        btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        target.classList.add("active");
        button.textContent = "Close ✕";
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* =========================
     ⏳ COUNTDOWN (card-style)
  ========================= */
  const targetDate = new Date("May 10, 2026 05:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  function renderCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (!countdownEl) return;

    if (diff <= 0) {
      countdownEl.innerHTML = `<span style="font-size:1.6rem;font-weight:800;color:#00ffff;text-shadow:0 0 20px #00ffff">🚀 Race Day!</span>`;
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    countdownEl.innerHTML = `
      <div class="countdown-unit"><span class="countdown-num">${String(d).padStart(2,'0')}</span><span class="countdown-label">Days</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(h).padStart(2,'0')}</span><span class="countdown-label">Hours</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(m).padStart(2,'0')}</span><span class="countdown-label">Mins</span></div>
      <div class="countdown-unit"><span class="countdown-num">${String(s).padStart(2,'0')}</span><span class="countdown-label">Secs</span></div>
    `;
  }

  renderCountdown();
  setInterval(renderCountdown, 1000);


  /* =========================
     🖼️ ALBUM AUTO-SCROLL
  ========================= */
  const album = document.querySelector(".album-scroll");
  let autoScrollTimer = null;
  let isPaused = false;

  if (album) {
    function doAutoScroll() {
      if (isPaused) return;
      const maxScroll = album.scrollWidth - album.clientWidth;
      let next = album.scrollLeft + album.clientWidth * 0.75;
      if (next >= maxScroll - 10) next = 0;
      album.scrollTo({ left: next, behavior: "smooth" });
    }

    autoScrollTimer = setInterval(doAutoScroll, 3200);

    // Pause on touch/mouse interaction
    album.addEventListener("pointerdown", () => { isPaused = true; });
    album.addEventListener("pointerup", () => {
      clearTimeout(album._resumeTimer);
      album._resumeTimer = setTimeout(() => { isPaused = false; }, 4000);
    });
  }


  /* =========================
     📸 LIGHTBOX
  ========================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox-img");
  const closeBtn = lightbox?.querySelector(".close-btn");

  document.querySelectorAll(".album-item img").forEach(img => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", e => { if (e.target !== lightboxImg) closeLightbox(); });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });


  /* =========================
     📏 SIZE SUGGESTION
  ========================= */
  const ageInput = document.getElementById("age");
  const sizeSuggestion = document.getElementById("sizeSuggestion");

  const sizeByAge = age => {
    if (age <= 7) return "6-8Y";
    if (age <= 10) return "8-10Y";
    if (age <= 12) return "10-12Y";
    if (age <= 15) return "XS";
    if (age <= 18) return "S";
    if (age <= 25) return "M";
    if (age <= 35) return "L";
    if (age <= 45) return "XL";
    if (age <= 55) return "XXL";
    return "XXXL";
  };

  if (ageInput && sizeSuggestion) {
    ageInput.addEventListener("input", () => {
      const age = parseInt(ageInput.value);
      if (!age || age < 1) { sizeSuggestion.innerHTML = ""; return; }
      const size = sizeByAge(age);
      sizeSuggestion.innerHTML = `Recommended Size: <strong>${size}</strong>`;
      document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.checked = radio.value === size;
      });
    });
  }


  /* =========================
     💳 DYNAMIC QR + UTR
     (logic unchanged, UI improved)
  ========================= */
  const qrImage = document.getElementById("qrImage");
  const qrLabel = document.getElementById("qrLabel");
  const utrGroup = document.getElementById("utrGroup");

  const qrMap = {
    "3K":  { src: "qr-3k.jpeg",  text: "Scan & pay ₹250 for 3K Run" },
    "5K":  { src: "qr-5k.jpeg",  text: "Scan & pay ₹350 for 5K Run" },
    "10K": { src: "qr-10k.jpeg", text: "Scan & pay ₹450 for 10K Run" }
  };

  document.querySelectorAll('input[name="run"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const selected = radio.value;
      if (!qrMap[selected]) return;

      // Fade out → swap → fade in (no lag)
      if (qrImage.style.display === "block") {
        qrImage.style.opacity = "0";
        qrImage.style.transform = "scale(0.92)";
      }

      setTimeout(() => {
        qrImage.src = qrMap[selected].src;
        qrImage.style.display = "block";
        qrLabel.innerHTML = qrMap[selected].text;

        // Force reflow before animation
        qrImage.getBoundingClientRect();

        qrImage.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        qrImage.style.opacity = "1";
        qrImage.style.transform = "scale(1)";

        if (utrGroup) utrGroup.style.display = "block";
      }, qrImage.style.display === "block" ? 180 : 0);
    });
  });


  /* =========================
     🚀 FORM SUBMIT
  ========================= */
  const form = document.getElementById("registrationForm");
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8U4XBl2d20-0veslXtFbBDieYum5X_I_inZsVps79D9cdKbtQkzER-Zx5TVwKbXA85A/exec";

  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      const btn = form.querySelector(".register-btn");
      const formData = new FormData(form);

      // Validations
      if (!formData.get("run")) { alert("⚠️ Please select a run category"); return; }
      if (!formData.get("size")) { alert("⚠️ Please select a T-shirt size"); return; }
      if (!/^[0-9]{10}$/.test(formData.get("phone"))) { alert("⚠️ Enter a valid 10-digit phone number"); return; }

      const utr = formData.get("utr");
      if (!utr || !/^[A-Za-z0-9]{10,20}$/.test(utr)) {
        alert("⚠️ Please enter a valid UTR / Transaction ID (12 characters)");
        return;
      }

      btn.textContent = "Processing…";
      btn.disabled = true;

      try {
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams({
            name:         formData.get("name"),
            location:     formData.get("location"),
            phone:        formData.get("phone"),
            email:        formData.get("email"),
            age:          formData.get("age"),
            run:          formData.get("run"),
            size:         formData.get("size"),
            organisation: formData.get("organisation"),
            utr:          formData.get("utr")
          })
        });

        const data = await response.json();

        if (data.status === "success") {
          btn.textContent = "✅ Registered!";
          btn.style.background = "linear-gradient(45deg,#00c853,#00e676)";
          form.reset();
          // Reset QR area
          if (qrImage) { qrImage.style.display = "none"; qrImage.style.opacity = "0"; }
          if (qrLabel) qrLabel.innerHTML = "Select a run to view payment QR";
          if (utrGroup) utrGroup.style.display = "none";
          setTimeout(() => {
            btn.textContent = "Complete Registration";
            btn.style.background = "";
            btn.disabled = false;
          }, 4000);
        } else if (data.status === "duplicate_phone") {
          alert("⚠️ This phone number is already registered.");
          btn.textContent = "Complete Registration";
          btn.disabled = false;
        } else if (data.status === "duplicate_utr") {
          alert("⚠️ This UTR / Transaction ID has already been used.");
          btn.textContent = "Complete Registration";
          btn.disabled = false;
        } else {
          alert("❌ Registration failed. Please try again.");
          btn.textContent = "Complete Registration";
          btn.disabled = false;
        }

      } catch (err) {
        console.error("Submit error:", err);
        alert("❌ Network error. Please check your connection and try again.");
        btn.textContent = "Complete Registration";
        btn.disabled = false;
      }
    });
  }

});


/* =========================
   🔥 THREE.JS HERO VFX
========================= */
(function initHeroVFX() {
  const canvas = document.getElementById("heroCanvas");

  // Skip on mobile for perf
  if (!canvas || window.innerWidth <= 768 || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Particles
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * (i % 3 === 2 ? 10 : i % 3 === 1 ? 8 : 15);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.03, transparent: true, opacity: 0.7 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    points.rotation.y += 0.0007;
    points.rotation.x += 0.0003;
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!canvas.clientWidth) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }, 150);
  });

  // Pause when tab hidden (save resources)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(raf); }
    else { animate(); }
  });
})();
