const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
let mouseX = 0;
let mouseY = 0;

// TODO organize code, add mircea easter egg, and more others, increase game difficulty,
// add Youtubers, add boss, add sounds

// variables
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const enemiesDistanceToEdgeMultiplier = 0.1;
let timeBetweenTwoEnemies = 1000;
let timeBetweenTwoProjectiles = 1000;
let enemies = [];
let projectiles = [];
let projectileRadius = 10;
// something
// create player
const player = new Player(middleX, middleY, 30, "red");

document.addEventListener("mousemove", onMouseUpdate, true);

// shoot projectiles

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

//load enemies
spawnEnemies();

// load frames

const loadFrames = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw(player, enemies, projectiles);

  detectCollisions(enemies, projectiles, player);
  //console.log(new Date() - startTime, counter);
}, 1);

// easter egg
let secret = "mircea";
let lastKeyTime = new Date();
let userText = "";
document.addEventListener("keydown", logKey);
function logKey(e) {
  if (new Date() - lastKeyTime > 2000) {
    userText = "";
    lastKeyTime = new Date();
  } else lastKeyTime = new Date();
  console.log(e.key);
  userText = userText + e.key;
  console.log(userText);
  if (userText === secret) {
    timeBetweenTwoProjectiles = Math.floor(timeBetweenTwoProjectiles / 10);
    alert(`cheats on! ${timeBetweenTwoProjectiles}`);
  }
}
