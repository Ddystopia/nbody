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
    for (let i = 0, k = 0; i < this.bodies.length; i++) {
      for (let j = 0; j < this.bodies.length && k < 1000; j++, k++) {
        const [a, b] = [this.bodies[i], this.bodies[j]];
        if (!this.isCirclesCollision(a, b) || a === b) continue;
        
        console.log(`hit, step: ${this.step}`)
        const dt = this.calcBodyHitTime(a, b);
        a.movePerVector(dt);
        b.movePerVector(dt);   
        this.hitBodies(a, b)
        a.movePerVector(-dt);
        b.movePerVector(-dt);
    //    i = j = 0;
      }
      for (let j = 0; j < this.field.walls.length; j++, k++) {
      
    }
  }
  
  hitBodies(a, b) {
    const [x1, x2] = [a.pos.copy(), b.pos.copy()];
    const [v1, v2] = [a.v.copy(), b.v.copy()];
    
    const M = a.mass + b.mass;
    const d = x1.sub(x2).abs ** 2;
    const k = (a.hardness + b.hardness) / 2 + 1;
    
    a.v = v1.sub(v1.sub(v2).mul(x1.sub(x2)).div(d).mul(x1.sub(x2)).mul(k * b.mass / M))
    b.v = v2.sub(v2.sub(v1).mul(x2.sub(x1)).div(d).mul(x2.sub(x1)).mul(k * a.mass / M))
  }
  
  hitBodyWall(b, w) {
    b.v.angle = 2 * w.r.add(w.d).angle - b.v.angle;
  }
  
  calcBodyHitTime(a, b) {
    // return this.dt
    // TODO: include acceleration of gravity
    const c = .5;
    const r = a.radius + b.radius;
    /*const dt2 = (Math.sqrt((2*u*x - 2*u*X + 2*U*y - 2*U*Y - 2*v*x + 2*v*X - 2*V*y + 2*V*Y)**2 -
    4*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2) *
    (x**2 - (r + c)**2 - 2*x*X + X**2 + y**2 - 2*y*Y + Y**2)) -
    2*u*x + 2*u*X - 2*U*y + 2*U*Y + 2*v*x - 2*v*X + 2*V*y - 2*V*Y) /
    (2*(u**2 - 2*u*v + U**2 - 2*U*V + v**2 + V**2))*/
    
    const f = t => b.v.sub(a.v).mul(t).add(b.pos).sub(a.pos).abs - r - c;
    const dt = newton({f});
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

  isCircleWallCollision(b, w) {
    return false;
  }
  
  isCirclesCollision(a, b) {
    return a.distance(b).abs <= a.radius + b.radius;
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
    if (this.gravity) this.changeAllVectorsByInfluence();
    this.field.draw();
  }
}
