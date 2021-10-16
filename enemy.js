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
