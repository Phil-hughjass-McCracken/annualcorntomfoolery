const maze = document.getElementById("maze");
const music = document.getElementById("music");
const sting = document.getElementById("sting");
const message = document.getElementById("message");

let level = 1;
let started = false;

/* ---- AUDIO FIX (browsers are cowards) ---- */
document.body.addEventListener("click", () => {
  music.volume = 0.4;
  music.play().catch(() => {});
}, { once: true });

/* ---- MAZE GENERATION ---- */
function generateMaze() {
  maze.innerHTML = "";

  const wallCount = 5 + level * 2;

  for (let i = 0; i < wallCount; i++) {
    const wall = document.createElement("div");
    wall.className = "wall";

    const vertical = Math.random() > 0.5;

    wall.style.width = vertical ? "10px" : `${100 + Math.random()*200}px`;
    wall.style.height = vertical ? `${100 + Math.random()*200}px` : "10px";

    wall.style.left = `${Math.random() * 90}%`;
    wall.style.top = `${Math.random() * 90}%`;

    maze.appendChild(wall);
  }
}

/* ---- LEVEL PROGRESSION ---- */
maze.addEventListener("mouseenter", () => {
  started = true;
});

maze.addEventListener("mouseleave", () => {
  if (!started) return;

  level++;
  started = false;

  if (level === 2) {
    message.textContent = "Great job! 🌽";
    music.playbackRate = 0.95;
  }

  if (level === 3) {
    document.body.classList.add("uneasy");
    message.textContent = "Stay on the path.";
    music.playbackRate = 0.8;
  }

  if (level >= 4) {
    triggerFinal();
    return;
  }

  generateMaze();
});

/* ---- FINAL JUMPSCARE FIX ---- */
function triggerFinal() {
  document.body.innerHTML = "";
  document.body.style.background = "black";

  const img = document.createElement("img");
  img.src = "entity_final.png";
  img.style.position = "fixed";
  img.style.inset = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

  document.body.appendChild(img);

  sting.volume = 1;
  sting.play();
}

/* ---- START GAME ---- */
generateMaze();
