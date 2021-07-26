const REFRESH_RATE_HZ = 240;

class Field2d {
  constructor({ bodies, walls, scale, width = 0, height = 0 }) {
    this.scale = scale || 1;
    this.width = width;
    this.height = height;
    this.bodies = bodies || [];
    this.walls = walls || [];
    this.timePerDraw = 1000 / REFRESH_RATE_HZ;
    this.prevDraw = Date.now() - this.timePerDraw;
    for (const b of this.bodies) b.field = this;
  }
  body(mass, hardness, pos, vec, density = 1) {
    const b = new Body(mass, hardness, pos, vec, density, this);
    this.bodies.push(b);
    return b;
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
    this.width = this.width || this.getStyle("body", "width");
    this.height = this.height || this.getStyle("body", "height");
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale)
  }
  
  getStyle(tagName, style) {
    return parseInt(getComputedStyle(document.querySelector(tagName))[style]);
  }
  
  draw() {
    if (!this.canDraw()) return;
    this.prevDraw = Date.now();

    this.ctx.clearRect(0, 0, this.canvas.width / this.scale, this.canvas.height / this.scale);
    
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
  
  drawWall([x, y, w, h]) {
    this.ctx.fillStyle = 'tomato';
    this.ctx.fillRect(x, y, w || 1 / this.scale, h || 1 / this.scale)
  }
}