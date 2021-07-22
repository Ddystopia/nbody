const REFRESH_RATE_HZ = 240;

class Field2d {
  constructor({ bodies, scale }) {
    this.scale = scale || 1;
    this.bodies = bodies || [];
    this.timePerDraw = 1000 / REFRESH_RATE_HZ;
    this.prevDraw = Date.now() - this.timePerDraw;
    for (const b of this.bodies) b.field = this;
  }
  body(mass, hardness, pos, vec) {
    const b = new Body(mass, hardness, pos, vec, this);
    this.bodies.push(b);
    return b;
  }
  canDraw() {
    return Date.now() - this.prevDraw > this.timePerDraw;
  }
  draw() {}
}

class CanvasField2d extends Field2d {
  constructor({ bodies, fieldId, scale = 1 }) {
    super({ bodies, scale });
    this.canvas = document.getElementById(fieldId);
    canvas.width = parseInt(getComputedStyle(canvas).width);
    canvas.height = parseInt(getComputedStyle(canvas).height);
    this.ctx = canvas.getContext('2d');
  }
  draw() {
    if (!this.canDraw()) return;
    this.prevDraw = Date.now();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bodies.forEach(this.drawBody.bind(this));
  }

  drawBody({ x, y, radius, color }) {
    const circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, radius, 0, 2 * PI);
    this.ctx.fillStyle = color;
    this.ctx.fill(circle);
  }
}
