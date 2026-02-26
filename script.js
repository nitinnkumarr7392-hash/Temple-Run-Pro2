let player = document.getElementById("player");
let road = document.getElementById("road");
let score = document.getElementById("score");
let gameOverScreen = document.getElementById("gameOver");

let lane = 1;
let speed = 5;
let scoreCount = 0;
let gameRunning = true;
let isJumping = false;
let isSliding = false;

function updateLane() {
  if (lane === 0) player.style.left = "20%";
  if (lane === 1) player.style.left = "45%";
  if (lane === 2) player.style.left = "70%";
}

function moveLeft() {
  if (lane > 0) lane--;
  updateLane();
}

function moveRight() {
  if (lane < 2) lane++;
  updateLane();
}

function jump() {
  if (isJumping) return;
  isJumping = true;
  player.style.bottom = "200px";
  setTimeout(() => {
    player.style.bottom = "100px";
    isJumping = false;
  }, 600);
}

function slide() {
  if (isSliding) return;
  isSliding = true;
  player.style.height = "40px";
  setTimeout(() => {
    player.style.height = "70px";
    isSliding = false;
  }, 600);
}

function createObstacle() {
  if (!gameRunning) return;

  let obstacle = document.createElement("div");
  let types = ["tree", "rock", "fire"];
  let type = types[Math.floor(Math.random() * 3)];
  obstacle.classList.add("obstacle", type);

  let obstacleLane = Math.floor(Math.random() * 3);
  if (obstacleLane === 0) obstacle.style.left = "20%";
  if (obstacleLane === 1) obstacle.style.left = "45%";
  if (obstacleLane === 2) obstacle.style.left = "70%";

  road.appendChild(obstacle);

  let topPos = -60;

  let move = setInterval(() => {
    if (!gameRunning) {
      clearInterval(move);
      obstacle.remove();
      return;
    }

    topPos += speed;
    obstacle.style.top = topPos + "px";

    if (topPos > window.innerHeight - 170 &&
        obstacleLane === lane &&
        !isJumping &&
        !isSliding) {
      endGame();
    }

    if (topPos > window.innerHeight) {
      obstacle.remove();
      scoreCount++;
      score.innerText = scoreCount;

      if (scoreCount % 10 === 0) speed += 1;

      clearInterval(move);
    }

  }, 20);
}

function endGame() {
  gameRunning = false;
  gameOverScreen.style.display = "block";
}

function restartGame() {
  location.reload();
}

setInterval(createObstacle, 1200);
updateLane();
