class Wall {
  constructor(x0, y0, x, y, color) {
    this.r = new Vector(x0, y0);
    this.d = new Vector(x, y);
    this.radius = 0;
    this.color = color || Wall.rainbow();
  }

  distance(b) {
    const ap = this.r.sub(b.r);
    const n = this.d.div(this.d.abs);

    return ap.sub(ap.mul(n).mul(n));
  }
  movePerVector() {}

  static rainbow = rainbowGenerator({
    shift: randomInteger(0, COLOR_SIZE),
    step: 4,
  });
}
