const PLANK = Number.EPSILON;
const rainbow = rainbowGenerator({
  shift: randomInteger(0, COLOR_SIZE),
  step: 4,
});

class Body {
  constructor(mass, hardness, pos, v, density = 1, field = null) {
    this.field = field;

    this.mass = mass * 100;
    this.density = density;
    this.hardness = hardness; // TODO: handle hardness is not in 0..1

    this.id = Body.idCount += 1;

    this.pos = new Vector(...pos);
    this.v = new Vector(...v);

    this.color = rainbow();
  }
  static idCount = 0
  
  
  get x() { return this.pos[0] }
  get y() { return this.pos[1] }
  get vx() { return this.v[0] }
  get vy() { return this.v[1] }
  set x(a) { this.pos[0] = a }
  set y(a) { this.pos[1] = a }
  set vx(a) { this.v[0] = a }
  set vy(a) { this.v[1] = a }

  get radius() {
    return Math.sqrt(Math.abs(this.mass / 100) * this.density / Math.PI);
  }

  movePerVector(dt, direction = 1) {
    this.pos = this.pos.add(this.v.mul(dt * direction))
  }
  
  changeVectorsByInfluence(dt, b) {
    if (!(b instanceof Body)) throw new TypeError('Argument is not a Body');
    const dr = this.distance(b);
  
    const a = b.mass / (dr.abs() ** 2);
  
    this.v = this.v.add(dr.mul(a * dt / dr.abs()))
  }
  
  distance(b) {
    return b.pos.sub(this.pos);
  }
}