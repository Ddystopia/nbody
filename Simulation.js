const STEP_DELTA = 5;
const G = (20 / 3) * 10 ** -11;
const { sqrt, hypot, PI } = Math;

class Simulation {
  /*
   * @constructor
   *
   * @param config
   *
   * @param {Body[]} config.bodies bodies for simulation
   * @param {Field2d} config.field id of canvas to draw
   * @param {boolean} config.doHit is bodies hits each other
   *
   */

  constructor({ field, doHit, timeSpeed }) {
    this.bodies = field.bodies;
    this.field = field;
    this.doHit = doHit;
    this.workCycle = null;
    this.soft = 0.15;
    this.timeSpeed = timeSpeed;
    this.dt = STEP_DELTA / 1000;
  }

  /*
   * @param {Body} a first body
   * @param {Body} b second body
   *
   * @description Calculates influence of two objects and change their vectors.
   *
   * @throws TypeError
   */

  changeVectorsByInfluence(a, b) {
    if (!a || !b) throw new TypeError('Arguments not enought');
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    const dr = hypot(dx, dy);
    const dt = this.dt * this.timeSpeed;

    const ac = b.mass / (dr ** 2 * a.mass);
    a.vx += (ac * dt * dx) / dr;
    a.vy += (ac * dt * dy) / dr;
  }

  hitBodiesPerCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        const [a, b] = [this.bodies[i], this.bodies[i]];
        const dt = this.dt * this.timeSpeed;
        if (this.isCirclesCollision(a, b) && a !== b) {
          a.movePerVector(dt, 'back');
          b.movePerVector(dt, 'back');
          this.hit(a, b);
          a.movePerVector(dt);
          b.movePerVector(dt);
          i = j = 0;
        }
      }
    }
  }

  hit(a, b) {}

  moveBodiesPerVectors() {
    this.bodies.forEach(b => b.movePerVector(this.dt * this.timeSpeed));
  }

  changeAllVectorsByInfluence() {
    for (const a of this.bodies) {
      for (const b of this.bodies.filter(b => b !== a)) {
        this.changeVectorsByInfluence(a, b);
      }
    }
  }

  isCirclesCollision(a, b) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return hypot(x, y) <= a.radius + b.radius;
  }

  start() {
    this.workCycle = setInterval(this.tick.bind(this), this.dt * 1000);
  }

  stop() {
    clearInterval(this.workCycle);
  }

  tick() {
    this.changeAllVectorsByInfluence();
    this.moveBodiesPerVectors();
    if (this.doHit) this.hitBodiesPerCollisions();
    this.field.draw();
  }
}
