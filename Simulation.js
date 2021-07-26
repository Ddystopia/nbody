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

  constructor({ field, doHit, timeSpeed }) {
    this.bodies = field.bodies;
    this.field = field;
    this.doHit = doHit;
    this.workCycle = null;
    this.timeSpeed = timeSpeed;
    this.dt = STEP_DELTA / 1000;
    this.step = 0;
  }

  /*
   * @param {Body} a first body
   * @param {Body} b second body
   *
   * @description Calculates influence of two objects and change their vectors.
   *
   * @throws TypeError
   */


  hitBodiesPerCollisions() {
    for (let i = 0, k = 0; i < this.bodies.length && k < 1000; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        const [a, b] = [this.bodies[i], this.bodies[j]];
        if (!this.isCirclesCollision(a, b) || a === b) continue;
        
        console.log(`hit, step: ${this.step}`)
        const dt = this.dt * this.timeSpeed;
        a.movePerVector(dt, -1);
        b.movePerVector(dt, -1);
        this.hit(a, b)
        a.movePerVector(dt, 1);
        b.movePerVector(dt, 1);
        i = j = 0;
        k++;
      }
    }
  }
  
  hit(a, b) {
    const [x1, x2] = [a.pos.copy(), b.pos.copy()];
    const [v1, v2] = [a.v.copy(), b.v.copy()];
    
    const M = a.mass + b.mass;
    const d = x1.sub(x2).abs() ** 2;
    
    a.v = v1.sub(v1.sub(v2).mul(x1.sub(x2)).mul(1 / d).mul(x1.sub(x2)).mul(2 * b.mass / M))
    b.v = v2.sub(v2.sub(v1).mul(x2.sub(x1)).mul(1 / d).mul(x2.sub(x1)).mul(2 * a.mass / M))
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

  isCirclesCollision(a, b) {
    const [,, dr] = a.distance(b);
    return dr <= a.radius + b.radius;
  }

  start() {
    this.workCycle = setInterval(this.tick.bind(this), this.dt * 1000);
  }

  stop() {
    clearInterval(this.workCycle);
  }

  tick() {
    this.step++
    this.moveBodiesPerVectors();
    if (this.doHit) this.hitBodiesPerCollisions();
    if (this.gravity || true) this.changeAllVectorsByInfluence();
    this.field.draw();
  }
}
