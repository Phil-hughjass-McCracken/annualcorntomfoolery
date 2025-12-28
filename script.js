const maze = document.getElementById("maze");
const music = document.getElementById("music");
const sting = document.getElementById("sting");
const entity = document.getElementById("finalEntity");
const message = document.getElementById("message");

let level = 1;
let started = false;

music.play();

maze.addEventListener("mouseenter", () => {
  started = true;
});

maze.addEventListener("mouseleave", () => {
  if (!started) return;

  level++;

  if (level === 2) {
    message.textContent = "Good job! Keep going!";
    music.playbackRate = 0.95;
  }

  if (level === 3) {
    document.body.classList.add("uneasy");
    message.textContent = "Stay on the path.";
    music.playbackRate = 0.8;
  }

  if (level >= 4) {
    triggerFinal();
  }
});

function triggerFinal() {
  document.body.innerHTML = "";
  document.body.style.background = "black";

  entity.style.display = "block";
  document.body.appendChild(entity);

  sting.play();
}
