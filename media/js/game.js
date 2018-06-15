const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 20;
const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;

const PLAYER_MAX_SPEED = 5;
const LASER_MAX_SPEED = 5;
const LASER_COOLDOWN = 3;

const GAME_STATE = {
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  laserCooldown: 0
};

function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}

function createEnemy(container, x, y) {
  const enemy = document.createElement("img");
  enemy.src = "media/img/enemy-black-1.png";
  enemy.className = "enemy";
  enemy.style.left = `${x}px`;
  enemy.style.top = `${y}px`;
  container.appendChild(enemy);
}

function createPlayer(container, x, y) {
  const player = document.createElement("img");
  player.src = "media/img/player-blue-1.png";
  player.className = "player";
  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
  container.appendChild(player);
}

function createLaser(container, x, y) {
  const laser = document.createElement("img");
  laser.src = "media/img/laser-blue-1.png";
  laser.className = "laser";
  laser.style.left = `${x}px`;
  laser.style.top = `${y}px`;
  container.appendChild(laser);
}

function init() {
  const container = document.querySelector(".game");
  const enemySpacing =
    (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);

  for (let j = 0; j < 3; j++) {
    const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
    for (let i = 0; i < ENEMIES_PER_ROW; i++) {
      const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
      createEnemy(container, x, y);
    }
  }

  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  createPlayer(container, GAME_STATE.playerX, GAME_STATE.playerY);
}

function updatePlayer() {
  const player = document.querySelector(".player");
  player.style.left = `${GAME_STATE.playerX}px`;
  player.style.top = `${GAME_STATE.playerY}px`;
}

function updateLasers(container) {
  const lasers = document.querySelectorAll(".laser");
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    let y = parseInt(laser.style.top.substring(0, laser.style.top.length - 2));
    y -= LASER_MAX_SPEED;
    laser.style.top = `${y}px`;
    if (y < 0) {
      container.removeChild(laser);
    }
    const r1 = laser.getBoundingClientRect();
    const enemies = document.querySelectorAll(".enemy");
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      const r2 = enemy.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        // Enemy was hit
        container.removeChild(enemy);
        container.removeChild(laser);
        break;
      }
    }
  }
}

function playerHasWon() {
  const enemies = document.querySelectorAll(".enemy");
  return enemies.length === 0;
}

function update() {
  const container = document.querySelector(".game");
  // Math.sin(Date.now() / 1000.0) * 10;
  // const container = document.querySelector(".game");
  // const enemies = container.querySelectorAll(".enemy");
  // enemies;
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += PLAYER_MAX_SPEED;
  }

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.laserCooldown === 0) {
    createLaser(container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.laserCooldown += LASER_COOLDOWN;
  }
  if (GAME_STATE.laserCooldown > 0) {
    GAME_STATE.laserCooldown -= 1;
  }
  updatePlayer();
  updateLasers(container);
  if (playerHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
  }

  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

window.requestAnimationFrame(update);
