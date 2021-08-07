const REFRESH_RATE_HZ = 240;

class Field2d {
  constructor({ bodies = [], walls = [], scale, width, height }) {
    this.scale = scale || 1;
    this.width = width;
    this.height = height;
    this.bodies = bodies;
    this.walls = walls;
    this.timePerDraw = 1000 / REFRESH_RATE_HZ;
    this.prevDraw = Date.now() - this.timePerDraw;
  }
  static width = Symbol('width');
  static height = Symbol('height');
  body(mass, hardness, pos, vec, density = 1) {
    const b = new Body(mass, hardness, pos, vec, density, this);
    this.bodies.push(b);
    return b;
  }
  wall(x0, y0, x, y) {
    const w = new Wall(x0, y0, x, y);
    this.walls.push(w);
    return w;
  }
  canDraw() {
    return Date.now() - this.prevDraw > this.timePerDraw;
  }
  draw() {}
}

class CanvasField2d extends Field2d {
  constructor({ bodies, walls, fieldId, scale = 1, width = 0, height = 0 }) {
    super({ bodies, walls, scale, width, height });
    this.canvas = document.getElementById(fieldId);
    this.width = this.width || this.getStyle('body', 'width');
    this.height = this.height || this.getStyle('body', 'height');
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
  }

  getStyle(tagName, style) {
    return parseInt(getComputedStyle(document.querySelector(tagName))[style]);
  }

  draw() {
    if (!this.canDraw()) return;
    this.prevDraw = Date.now();

    this.ctx.clearRect(
      0,
      0,
      this.canvas.width / this.scale,
      this.canvas.height / this.scale
    );

    this.bodies.forEach(this.drawBody.bind(this));
    this.walls.forEach(this.drawWall.bind(this));
  }

  drawBody({ x, y, radius, color }) {
    const circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill(circle);
  }

  drawWall({ r, d, color }) {
    const c = i => {
      if (i === CanvasField2d.width) return (this.width - 1) / this.scale;
      if (i === CanvasField2d.height) return (this.height - 1) / this.scale;
      return i;
    };
    const wall = new Path2D();
    wall.moveTo(...r.map(c));
    wall.lineTo(...d.map(c).add(r.map(c)));
    this.ctx.strokeStyle = color;
    this.ctx.stroke(wall);
  }
}
