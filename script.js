* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
}

body {
  overflow: hidden;
  background: black;
}

/* 3D Canvas */
#webgl {
  position: fixed;
  top: 0;
  left: 0;
}

/* Overlay UI */
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

/* Logo */
.logo {
  width: 380px;
  filter: drop-shadow(0 0 40px cyan);
  animation: float 4s ease-in-out infinite;
}

/* Floating */
@keyframes float {
  50% { transform: translateY(-15px); }
}

/* Title */
.overlay h1 {
  font-size: 4rem;
  color: #00f7ff;
  text-shadow:
    0 0 10px #00f7ff,
    0 0 30px #00f7ff,
    0 0 60px #00f7ff;
}

/* Text */
.overlay p {
  margin-top: 10px;
  color: #aaa;
}

/* Button */
button {
  margin-top: 30px;
  padding: 15px 40px;
  border: 2px solid cyan;
  background: transparent;
  color: cyan;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 20px cyan;
}

button:hover {
  background: cyan;
  color: black;
  transform: scale(1.1);
}
