class Wall {
  constructor(x0, y0, x, y, color) {
    this.r = new Vector(x0, y0);
    this.d = new Vector(x, y);
    this.color = color || Wall.rainbow();
  }

  distance(b) {
    // it is line segment, not straight line
    if (b.r[0] + b.radius < this.r[0]) return b.r.sub(this.r).sub(b.radius);
    if (b.r[0] - b.radius > this.r[0] + this.d[0])
      return b.r.sub(this.r.add(this.d)).sub(b.radius);

    return b.r.sub(this.r).distance(this.d)
  }

  static rainbow = rainbowGenerator({
    shift: randomInteger(0, COLOR_SIZE),
    step: 4,
  });
}
