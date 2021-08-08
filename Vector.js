// TODO: 3 dimentional logic

class Vector extends Array {
  constructor(...v) {
    // super(...v)
    super();
    for (const x of v) this.push(x);
  }

  set angle(a) {
    const abs = this.abs;
    const v = new Vector(Math.cos(a), Math.sin(a)).dot(abs);
    for (let i = 0; i < v.length; i++) this[i] = v[i];
  }

  get angle() {
    const angle = Math.acos(this.cos());
    if (this[1] < 0) return -angle;
    return angle;
  }

  get abs() {
    return this.pow(2).reduce((s, x) => s + x, 0) ** (1 / 2);
  }

  set abs(abs) {
    const n = this.dot(abs / this.abs);
    this.r = n.r;
  }

  sin = () => this.dot(1 / this.abs)[1];
  cos = () => this.dot(1 / this.abs)[0];
  tan = () => this.sin() / this.cos();
  cot = () => 1 / this.tan();

  toVec = v => (Array.isArray(v) ? new Vector(...v) : this.map(() => v));

  add(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x + v[i]);
  }

  sub(n) {
    const v = this.toVec(n);
    return this.add(v.dot(-1));
  }

  distance(v) {
    return new Vector(0, 0, v[0] * this[1] - this[0] * v[1]).dot(1 / v.abs);
  }

  dot(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x * v[i]);
  }

  pow = n => this.map(x => x ** n);
  copy = () => new Vector(...this);
}
