const path = document.getElementById("mazePath");
const maze = document.getElementById("maze");
const music = document.getElementById("music");
const sting = document.getElementById("sting");
const message = document.getElementById("message");

let level = 1;
let active = false;

/* unlock audio */
document.body.addEventListener("click", () => {
  music.volume = 0.4;
  music.play().catch(() => {});
}, { once: true });

function generateMaze() {
  const points = [];
  const width = window.innerWidth;
  const height = maze.clientHeight;

  let x = 50;
  let y = height - 50;

  points.push(`M ${x} ${y}`);

  for (let i = 0; i < 6 + level * 2; i++) {
    x += (Math.random() * 200 - 100);
    y -= (height / (6 + level * 2));

    x = Math.max(50, Math.min(width - 50, x));
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
  advanceLevel();
});

function advanceLevel() {
  level++;

  if (level === 2) {
    message.textContent = "Great job! 🌽";
    music.playbackRate = 0.95;
  }

  if (level === 3) {
    message.textContent = "Stay on the path.";
    document.body.classList.add("uneasy");
    music.playbackRate = 0.8;
  }

  if (level >= 4) {
    triggerFinal();
    return;
  }

  generateMaze();
}

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
  sting.play();
}

generateMaze();
