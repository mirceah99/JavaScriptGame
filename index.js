const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
let mouseX = 0;
let mouseY = 0;

// TODO organize code, add mircea easter egg, and more others, increase game difficulty,
// add Youtubers, add boss, add sounds

// create player

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.draw();
  }
}
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.draw();
  }
}
const enemiesDistanceToEdgeMultiplier = 0.1;
function generateRandomCoordinatesForEnemy() {
  if (Math.random() < 0.5) {
    var coordinates = {
      x: Math.random() * canvas.width,
      y: Math.random() * enemiesDistanceToEdgeMultiplier * canvas.height,
    };
  } else {
    var coordinates = {
      x: Math.random() * enemiesDistanceToEdgeMultiplier * canvas.width,
      y: Math.random() * canvas.height,
    };
  }
  if (Math.random() < 0.5) return coordinates;
  coordinates.x = canvas.width - coordinates.x;
  coordinates.y = canvas.height - coordinates.y;
  return coordinates;
}
let enemies = [];
const timeBetweenTwoEnemies = 10;
function spawnEnemies() {
  setInterval(() => {
    coordinates = generateRandomCoordinatesForEnemy();
    const angle = Math.atan2(middleY - coordinates.y, middleX - coordinates.x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(
      new Enemy(coordinates.x, coordinates.y, 15, "green", velocity)
    );
  }, timeBetweenTwoEnemies);
}

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const player = new Player(middleX, middleY, 30, "red");
player.draw();

// Get mouse position

function onMouseUpdate(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  e.stopPropagation();
}
document.addEventListener("mousemove", onMouseUpdate, true);

// shoot projectiles

let projectiles = [];
let timeBetweenTwoProjectiles = 1;
let projectileRadius = 10;

setInterval(() => {
  const angle = Math.atan2(mouseY - middleY, mouseX - middleX);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  projectiles.push(
    new Projectile(middleX, middleY, projectileRadius, "red", velocity)
  );
}, timeBetweenTwoProjectiles);
// detect collisions

function detectCollisions(enemies, projectiles, player) {
  enemies.forEach((enemy, enemyIndex) => {
    if (
      Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2) <
      enemy.radius + player.radius - 3
    ) {
      alert("you lose!");
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.sqrt(
        (enemy.x - projectile.x) ** 2 + (enemy.y - projectile.y) ** 2
      );
      if (distance < enemy.radius + projectile.radius) {
        enemies.splice(enemyIndex, 1);
        projectiles.splice(projectileIndex, 1);
        return;
      }
    });
  });
}
// load frames

let counter = 0;
const startTime = new Date();
spawnEnemies();
const loadFrames = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.move();
  });
  enemies.forEach((enemy) => {
    enemy.move();
  });
  counter++;
  detectCollisions(enemies, projectiles, player);
  //console.log(new Date() - startTime, counter);
}, 1);
