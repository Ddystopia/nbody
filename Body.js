/** Represents a body */
class Body {
  /**
   * Create a body
   *
   * @param {number} mass Mass of the body
   * @param {number} hardness Hardness of the body, must be from 0 to 1
   * @param {(Vector|number[])} r Start position of the body
   * @param {(Vector|number[])} v Start velosity of the body
   * @param {number} [density=1] Density of the body
   * @param {string=} color Color of the body in the #rrggbb format
   */
  constructor(mass, hardness, r, v, density = 1, color) {
    /** Mass of the body
     * @type {number} */
    this.mass = mass * 100;
    /** Hardness of the body
     * @type {number} */
    this.hardness = hardness;
    /** Density of the body
     * @type {number} */
    this.density = density;

    /** Id of the body
     * @type {number} */
    this.id = Body.idCount += 1;

    /** Position of the body
     * @type {Vector} */
    this.r = new Vector(...r);
    /** Velocity of the body
     * @type {Vector} */
    this.v = new Vector(...v);

    /** Color of the body
     * @type {string} */
    this.color = color || Body.rainbow();
  }
  static idCount = 0;
  static rainbow = rainbowGenerator({
    shift: randomInteger(0, COLOR_SIZE),
    step: 4,
  });

  /** X coordinate of the Body
   * @type {number} */
  get x() {
    return this.r[0];
  }

  /** Y coordinate of the Body
   * @type {number} */
  get y() {
    return this.r[1];
  }

  /** Radius of the body
   * @type {number} */
  get radius() {
    return Math.sqrt((Math.abs(this.mass / 100) * this.density) / Math.PI);
  }

  /**
   * Move body per vector
   * @param {number} dt Time for change
   * @param {number} directin direction of move - 1 straigth, -1 back
   */
  movePerVector(dt, direction = 1) {
    this.r = this.r.add(this.v.mul(dt * direction));
  }

  /**
   * Change velocity by gravity influence
   * @param {number} dt Time for change
   * @param {Body} body Body attractor
   */
  changeVectorsByInfluence(dt, b) {
    if (!(b instanceof Body)) throw new TypeError('Argument is not a Body');
    const dr = this.distance(b);

    const a = b.mass / dr.norm() ** 2;
    this.v = this.v.add(dr.mul((a * dt) / dr.norm()));
  }

  /**
   * Get distance between centers of mass of bodies
   * @param {Body} b Body to calc distance
   */
  distance(b) {
    return b.r.sub(this.r);
  }
}
