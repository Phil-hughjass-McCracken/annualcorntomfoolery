const path = document.getElementById("mazePath");
const maze = document.getElementById("maze");
const music = document.getElementById("music");
const sting = document.getElementById("sting");
const message = document.getElementById("message");

let level = 1;
let active = false;

/* ---- AUDIO UNLOCK ---- */
document.body.addEventListener("click", () => {
  music.volume = 0.4;
  music.play().catch(() => {});
}, { once: true });

/* ---- MAZE GENERATOR ---- */
function generateMaze() {
  const points = [];
  const width = maze.clientWidth;
  const height = maze.clientHeight;

  let x = width / 2;
  let y = height - 40;

  const segments = 10 + level * 5;

  points.push(`M ${x} ${y}`);

  for (let i = 0; i < segments; i++) {
    x += (Math.random() * 300 - 150);
    y -= height / segments;

    x = Math.max(80, Math.min(width - 80, x));
    points.push(`L ${x} ${y}`);
  }

  path.setAttribute("d", points.join(" "));
}

path.addEventListener("mouseenter", () => {
  active = true;
});

maze.addEventListener("mouseleave", () => {
  if (!active) return;
  active = false;
  nextLevel();
});

function nextLevel() {
  level++;

  if (level === 2) {
    message.textContent = "Nice job! 🌽";
    music.playbackRate = 0.95;
  }

  if (level === 3) {
    message.textContent = "Stay on the path.";
    document.body.classList.add("uneasy");
    music.playbackRate = 0.8;
  }

  if (level >= 4) {
    finalScare();
    return;
  }

  generateMaze();
}

/* ---- FINAL ENTITY ---- */
function finalScare() {
  document.body.innerHTML = "";
  document.body.style.background = "black";

  const img = document.createElement("img");
  img.src = Diddy-working-on-new-album.jpg"";   // <-- YOU control this
  img.style.position = "fixed";
  img.style.inset = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";

  document.body.appendChild(img);

  sting.volume = 1;
  sting.play();
}

generateMaze();
