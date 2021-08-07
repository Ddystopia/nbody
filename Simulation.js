const STEP_DELTA = 4; // 4 is min

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
    this.bodies = field.bodies;
    this.field = field;
    this.doHit = doHit;
    this.gravity = gravity;
    this.workCycle = null;
    this.timeSpeed = timeSpeed;
    this.dt = STEP_DELTA / 1000;
    this.step = 0;
  }

  hitBodiesPerCollisions() {
    const bodies = this.field.bodies;
    const walls = this.field.walls;
    for (let i = 0, k = 0; i < bodies.length; i++) {
      [bodies.filter(b => b !== bodies[i]), walls].forEach(c => {
        for (let j = 0; j < c.length && k < 1000; j++, k++) {
          const els = [bodies[i], c[j]];
          if (!this.isCollision(...els)) continue;

          console.log(`hit, step: ${this.step}`);

          const dt = this.calcHitTime(...els);
          els.forEach(a => a.movePerVector(dt));
          this.hitBodies(...els);
          els.forEach(a => a.movePerVector(-dt));
          //    i = j = 0;
        }
      });
    }
  }

  hitBodies(a, b) {
    if (b instanceof Wall) return (a.v.angle = 2 * b.d.angle - a.v.angle);

    const [x1, x2] = [a.r.copy(), b.r.copy()];
    const [v1, v2] = [a.v.copy(), b.v.copy()];

    const M = a.mass + b.mass;
    const d = x1.sub(x2).abs ** 2;
    const k = (a.hardness + b.hardness) / 2 + 1;

    a.v = v1.sub(
      v1
        .sub(v2)
        .mul(x1.sub(x2))
        .div(d)
        .mul(x1.sub(x2))
        .mul((k * b.mass) / M)
    );
    b.v = v2.sub(
      v2
        .sub(v1)
        .mul(x2.sub(x1))
        .div(d)
        .mul(x2.sub(x1))
        .mul((k * a.mass) / M)
    );
  }

  calcHitTime(a, b) {
    if (b instanceof Wall) return -2 * this.dt;
    // return this.dt
    // TODO: include acceleration of gravity
    const c = 0.5;
    const r = a.radius + b.radius;
    /*const dt2 = (Math.sqrt((2*u*x - 2*u*X + 2*U*y - 2*U*Y - 2*v*x + 2*v*X - 2*V*y + 2*V*Y)**2 -
    4*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2) *
    (x**2 - (r + c)**2 - 2*x*X + X**2 + y**2 - 2*y*Y + Y**2)) -
    2*u*x + 2*u*X - 2*U*y + 2*U*Y + 2*v*x - 2*v*X + 2*V*y - 2*V*Y) /
    (2*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2))*/

    const f = t => b.v.sub(a.v).mul(t).add(b.r).sub(a.r).abs - r - c;
    const dt = newton({ f });
    return isNaN(dt) ? -2 * this.dt * this.timeSpeed : dt;
  }

  moveBodiesPerVectors() {
    this.bodies.forEach(b => b.movePerVector(this.dt * this.timeSpeed));
  }

  changeAllVectorsByInfluence() {
    for (const a of this.bodies) {
      for (const b of this.bodies.filter(b => b !== a)) {
        a.changeVectorsByInfluence(this.dt * this.timeSpeed, b);
      }
    }
  }

  isCollision(a, b) {
    return b.distance(a).abs <= a.radius + b.radius;
  }

  start() {
    this.workCycle = setInterval(this.tick.bind(this), this.dt * 1000);
  }

  stop() {
    clearInterval(this.workCycle);
  }

  tick() {
    this.step++;
    this.moveBodiesPerVectors();
    if (this.doHit) this.hitBodiesPerCollisions();
    if (this.gravity) this.changeAllVectorsByInfluence();
    this.field.draw();
  }
}
