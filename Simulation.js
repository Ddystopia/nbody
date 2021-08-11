const STEP_DELTA = 4; // 4 is min
const FPS = 120;

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

  constructor({ field, doHit, timeSpeed, gravity }) {
    this.field = field;
    this.doHit = doHit;
    this.gravity = gravity;
    this.timeSpeed = timeSpeed;
    this.cadrs = [];
    this.workCycle = null;
    this.drawCycle = null;
    this.dt = STEP_DELTA / 1000;
  }

  hitBodiesPerCollisions() {
    const bodies = this.field.bodies;
    const walls = this.field.walls;
    for (let i = 0, k = 0; i < bodies.length; i++) {
      [bodies.filter(b => b !== bodies[i]), walls].forEach(c => {
        for (let j = 0; j < c.length && k < 1000; j++, k++) {
          const els = [bodies[i], c[j]];
          if (!this.isCollision(...els)) continue;

          const dt = this.calcHitTime(...els);
          els.filter(a => a instanceof Body).forEach(a => a.movePerVector(dt));
          this.hitBodies(...els);
          els.filter(a => a instanceof Body).forEach(a => a.movePerVector(-dt));
          i = j = 0;
        }
      });
    }
  }

  hitBodies(a, b) {
    if (b instanceof Wall)
      return (a.v = b.d
        .mul(1 / b.d.norm ** 2)
        .mul(2 * b.d.dot(a.v))
        .sub(a.v));

    const [x1, x2] = [a.r.copy(), b.r.copy()];
    const [v1, v2] = [a.v.copy(), b.v.copy()];

    const M = 1 / (a.mass + b.mass);
    const d = x1.sub(x2).norm ** -2;
    const k = (a.hardness + b.hardness) / 2 + 1;

    a.v = v1.add(x2.sub(x1).mul(v2.sub(v1).dot(x2.sub(x1)) * k * b.mass * M * d));
    b.v = v2.add(x1.sub(x2).mul(v1.sub(v2).dot(x1.sub(x2)) * k * a.mass * M * d));
  }

  calcHitTime(a, b) {
    // TODO: include acceleration of gravity
    const c = 0.5;
    const r = a.radius + (b.radius || 0);
    /*const dt2 = (Math.sqrt((2*u*x - 2*u*X + 2*U*y - 2*U*Y - 2*v*x + 2*v*X - 2*V*y + 2*V*Y)**2 -
    4*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2) *
    (x**2 - (r + c)**2 - 2*x*X + X**2 + y**2 - 2*y*Y + Y**2)) -
    2*u*x + 2*u*X - 2*U*y + 2*U*Y + 2*v*x - 2*v*X + 2*V*y - 2*V*Y) /
    (2*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2))*/

    const f =
      b instanceof Wall
        ? t => b.distance({ r: a.v.mul(t).add(a.r) }).norm - r - c
        : t => b.v.sub(a.v).mul(t).add(b.r).sub(a.r).norm - r - c;

    const dt = newton({ f });
    return isNaN(dt) ? -2 * this.dt * this.timeSpeed : dt;
  }

  moveBodiesPerVectors() {
    this.field.bodies.forEach(b => b.movePerVector(this.dt * this.timeSpeed));
  }

  changeAllVectorsByInfluence() {
    for (const a of this.field.bodies) {
      for (const b of this.field.bodies.filter(b => b !== a)) {
        a.changeVectorsByInfluence(this.dt * this.timeSpeed, b);
      }
    }
  }

  isCollision(a, b) {
    return b.distance(a).norm <= a.radius + (b.radius || 0);
  }

  start() {
    this.workCycle = setInterval(() => this.tick(), this.dt * 1000);
    this.drawCycle = this.drawCycle || setInterval(() => this.field.draw(), 1000 / FPS);
  }

  stop() {
    clearInterval(this.workCycle);
  }

  tick() {
    this.moveBodiesPerVectors();
    if (this.doHit) this.hitBodiesPerCollisions();
    if (this.gravity) this.changeAllVectorsByInfluence();
  }
}
