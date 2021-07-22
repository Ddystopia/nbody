const rainbow = rainbowGenerator({
  shift: randomInteger(0, COLOR_SIZE),
  step: 4,
});

class Body {
  constructor(mass, hardness, pos, vec, field = null) {
    this.field = field;

    this.mass = mass;
    this.hardness = hardness; // TODO: handle hardness is not in 0..1

    this.id = Body.idCount += 1;

    this.x = pos[0];
    this.y = pos[1];

    this.vx = vec[0]; // x vector projection
    this.vy = vec[1]; // y vector projection

    this.color = rainbow();
  }

  get radius() {
    return Math.abs(2 * this.mass) / this.field.scale;
  }

  movePerVector(dt, direction) {
    const sign = direction === 'back' ? -1 : 1;
    this.x += this.vx * dt * sign;
    this.y += this.vy * dt * sign;
  }
}
Body.idCount = 0;
