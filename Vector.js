class Vector extends Array {
  constructor(...v) {
    // super(...v)
    super()
    for (const x of v) this.push(x)
  }
  
  copy() {
    return new Vector(...this)
  }
  
  toVec(v) {
    return Array.isArray(v) ? new Vector(...v) : this.map(() => v)
  }
  
  abs() {
    return this.pow(2).reduce((s, x) => s + x, 0) ** (1/2);
  }
  
  sub(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x - v[i])
  }
  
  mul(n) {
    const v = this.toVec(n);
    return this.map((x, i) => x * v[i]);
  }
  
  pow(n) { 
    return this.map(x => x ** n)
  }
  
  
}
