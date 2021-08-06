class Vector extends Array {
  constructor(...v) {
    // super(...v)
    super()
    for (const x of v) this.push(x)
  }
  
  copy() { return new Vector(...this) }
  
  get x() { return this[0] }
  get y() { return this[1] }
  set x(a) { this[0] = a }
  set y(a) { this[1] = a }
  
  set angle(a) {
    const abs = this.abs
    this.y = Math.sin(a) * abs;
    this.x = Math.cos(a) * abs;
  }
  
  get angle() {
    const angle = Math.acos(this.cos());
    if (this.y < 0) return -angle;
    return angle;
  }
  
  get abs() {
    return this.pow(2).reduce((s, x) => s + x, 0) ** (1/2);
  }
  
  set abs(abs) {
    const n = this.mul(abs / this.abs);
    this.x = n.x;
    this.y = n.y;
  }
  
  sin() { return this.y / this.abs() }
  cos() { return this.x / this.abs() }
  tan() { return this.sin() / this.cos() }
  cot() { return 1 / this.tan() }
  
  toVec(v) {
    return Array.isArray(v) ? new Vector(...v) : this.map(() => v)
  }
  
  add(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x + v[i])
  }
  
  sub(n) {
    const v = this.toVec(n);
    return this.add(v.mul(-1));
  }
  
  mul(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x * v[i]);
  }
  
  div(n) {
    const v = this.toVec(n);
    return this.mul(v.pow(-1));
  }
  
  pow(n) { 
    return this.map(x => x ** n)
  }
  
  
}
