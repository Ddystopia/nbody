class Vector extends Array {
  constructor(...v) {
    // super(...v)
    super();
    for (const x of v) this.push(x);
  }

  get norm() {
    return this.reduce((s, x) => s + x ** 2, 0) ** (1 / 2);
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
    // norm of this vector is realy a distance, but it's not perpendicular vector
    // here i used the fact that area between vectors is equal to norm of
    // cross product. May be i should use outer product and bivectors, idk.
    return new Vector(0, 0, v[0] * this[1] - this[0] * v[1]).mul(1 / v.norm);
  }

  // dot product
  dot(v) {
    return this.reduce((s, x, i) => s + x * v[i], 0);
  }

  // mul by scalar
  mul(n) {
    return this.map(x => x * n, 0);
  }

  copy = () => new Vector(...this);
}
