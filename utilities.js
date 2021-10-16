function onMouseUpdate(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  e.stopPropagation();
}
// detect collisions
function detectCollisions(enemies, projectiles, player) {
  enemies.forEach((enemy, enemyIndex) => {
    if (
      Math.sqrt((enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2) <
      enemy.radius + player.radius - 3
    ) {
      youLose();
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

// Lose
function youLose() {
  alert("you lose!");
  enemies = [];
  projectiles = [];
}
//draw
function draw(player, enemies, projectiles) {
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.move();
  });
  enemies.forEach((enemy) => {
    enemy.move();
  });
}
