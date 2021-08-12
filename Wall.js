/** Represents a wall */
class Wall {
  /**
   * Create a wall
   *
   * @param {number} x0 x start of the wall
   * @param {number} y0 y start of the wall
   * @param {number} x x length of the wall
   * @param {number} y y length of the wall
   * @param {string=} color of the wall in #rrggbb format
   */
  constructor(x0, y0, x, y, color) {
    this.r = new Vector(x0, y0);
    this.d = new Vector(x, y);
    this.color = color || Wall.rainbow();
  }

  /*
   * Get distance vector between the wall and the body
   * @param {Body} b body to calc distance
   * @returns {Vector}
   */
  distance(b) {
    // distance between center of body and start of the wall
    const d = b.r.sub(this.r);
    // it is line segment, not straight line
    if (b.r[0] + b.radius < this.r[0]) return d.mul(1 - b.radius / d.norm());
    if (b.r[0] - b.radius > this.r[0] + this.d[0])
      return d.sub(this.d).mul(1 - b.radius / d.sub(this.d).norm());

    return b.r.sub(this.r).distance(this.d);
  }

  static rainbow = rainbowGenerator({
    shift: randomInteger(0, COLOR_SIZE),
    step: 4,
  });
}
