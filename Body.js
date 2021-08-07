const PLANK = Number.EPSILON;

class Body {
  constructor(mass, hardness, r, v, density = 1) {
    this.mass = mass * 100;
    this.density = density;
    this.hardness = hardness;

    this.id = Body.idCount += 1;

    this.r = new Vector(...r);
    this.v = new Vector(...v);

    this.color = Body.rainbow();
    
    this.hits = {};
  }
  static idCount = 0;
  static rainbow = rainbowGenerator({
    shift: randomInteger(0, COLOR_SIZE),
    step: 4,
  });
  
  get x() { return this.r[0] }
  get y() { return this.r[1] }

  get radius() {
    return Math.sqrt(Math.abs(this.mass / 100) * this.density / Math.PI);
  }

  movePerVector(dt, direction = 1) {
    this.r = this.r.add(this.v.mul(dt * direction))
  }
  
  changeVectorsByInfluence(dt, b) {
    if (!(b instanceof Body)) throw new TypeError('Argument is not a Body');
    const dr = this.distance(b);
  
    const a = b.mass / (dr.abs ** 2);
    this.v = this.v.add(dr.mul(a * dt / dr.abs))
  }
  
  distance(b) {
    return b.r.sub(this.r);
  }
}

