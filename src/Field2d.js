/** Abstact class that represents a 2d field */
class Field2d {
  /**
   * @abstract
   * @param {Object} options
   * @param {Body[]} [options.bodies=[]] Bodies of field
   * @param {Wall[]} [options.walls=[]] Walls of field
   * @param {number} [options.scale=1] Scale of field
   * @param {number} options.width Width of field
   * @param {number} options.height Width of field
   */
  constructor({ bodies = [], walls = [], scale = 1, width, height }) {
    /** Width of field
     * @type {number} */
    this.width = width;
    /** Height of field
     * @type {number} */
    this.height = height;
    /** Scale of field
     * @type {number} */
    this.scale = scale;
    /** Bodies of field
     * @type {Body[]} */
    this.bodies = bodies;
    /** Walls of field
     * @type {Wall[]} */
    this.walls = walls;
  }
  static width = Symbol('width');
  static height = Symbol('height');

  /**
   * Draw frame
   * @abstract
   */
  draw() {}
}

/** Represents Canvas Field2d */
class CanvasField2d extends Field2d {
  /**
   * @param {Object} options
   * @param {string} options.fieldId Id of canvas to draw
   * @param {Body[]} [options.bodies=[]] Bodies of field
   * @param {Wall[]} [options.walls=[]] Walls of field
   * @param {number} [options.scale=1] Scale of field
   * @param {number} [options.width=screen width] Width of field
   * @param {number} [options.height=screen height] Height of field
   */
  constructor({ bodies, walls, fieldId, scale = 1, width = 0, height = 0 }) {
    super({ bodies, walls, scale, width, height });
    /** Canvas
     * @type {Canvas} */
    this.canvas = document.getElementById(fieldId);
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
  }

  getStyle(tagName, style) {
    return parseInt(getComputedStyle(document.querySelector(tagName))[style]);
  }
  /**
   * Draw frame
   */

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
  /**
   * Draw body
   * @param {Body} body
   */
  drawBody({ x, y, radius, color }) {
    const circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill(circle);
  }
  /**
   * Draw wall
   * @param {Wall} wall
   */
  drawWall({ r, d, color }) {
    const wall = new Path2D();
    wall.moveTo(...r);
    wall.lineTo(...d.add(r));
    this.ctx.strokeStyle = color;
    this.ctx.stroke(wall);
  }
}
