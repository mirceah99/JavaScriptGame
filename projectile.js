class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    ``;
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
