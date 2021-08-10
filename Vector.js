// TODO: 3 dimentional logic

class Vector extends Array {
  constructor(...v) {
    // super(...v)
    super();
    for (const x of v) this.push(x);
  }

  unit() {
    return this.mul(1 / this.abs);
  }

  get abs() {
    return this.pow(2).reduce((s, x) => s + x, 0) ** (1 / 2);
  }

  toVec = v => (Array.isArray(v) ? new Vector(...v) : this.map(() => v));

  add(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x + v[i]);
  }

  sub(n) {
    const v = this.toVec(n);
    return this.add(v.mul(-1));
  }

  distance(v) {
    return new Vector(0, 0, v[0] * this[1] - this[0] * v[1]).mul(1 / v.abs);
  }

  // dot product
  dot(v) {
    return this.reduce((s, x, i) => s + x * v[i], 0);
  }

  // mul by scalar
  mul(n) {
    return this.map(x => x * n, 0);
  }

  pow = n => this.map(x => x ** n);
  copy = () => new Vector(...this);
}
