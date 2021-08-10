class Field2d {
  constructor({ bodies = [], walls = [], scale = 1, width, height }) {
    this.scale = scale;
    this.width = width;
    this.height = height;
    this.bodies = bodies;
    this.walls = walls;
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
  draw() {}
}

class CanvasField2d extends Field2d {
  constructor({ bodies, walls, fieldId, scale = 1, width = 0, height = 0 }) {
    super({ bodies, walls, scale, width, height });
    this.canvas = document.getElementById(fieldId);
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
  }

  getStyle(tagName, style) {
    return parseInt(getComputedStyle(document.querySelector(tagName))[style]);
  }

  draw() {
    canvas.width = this.width || this.getStyle('body', 'width');
    canvas.height = this.height || this.getStyle('body', 'height');

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
    const wall = new Path2D();
    wall.moveTo(...r);
    wall.lineTo(...d.add(r));
    this.ctx.strokeStyle = color;
    this.ctx.stroke(wall);
  }
}
