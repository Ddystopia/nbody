/** Represents a vector */
class Vector extends Array {
  /**
   * Create a vector
   * @param {...number} numbers
   */
  constructor(...v) {
    // super(...v)
    super();
    for (const x of v) this.push(x);
  }

  /**
   * Get norm of the vector
   * @returns {number}
   */
  norm() {
    return this.reduce((s, x) => s + x ** 2, 0) ** (1 / 2);
  }

  /**
   * Adds vectors
   * @param {Vector} v Vector to add
   * @returns {Vector} Added vector
   */
  add(v) {
    return this.map((x, i) => x + v[i]);
  }

  /**
   * Substacts vectors
   * @param {Vector} v Vector to substract
   * @returns {Vector} Substracted vector
   */
  sub(v) {
    return this.add(v.mul(-1));
  }

  /**
   * Get perpendicular vector from end of this vector to the argument vector
   * @param {Vector} v
   * @returns {Vector} Perpendicular vector
   */

  distance(v) {
    return v.mul(this.dot(v) / v.norm() ** 2).sub(this);
  }

  /**
   * Dot product
   * @param {Vector} v Vector to do dot product
   * @return {number} Dot product
   */
  dot(v) {
    return this.reduce((s, x, i) => s + x * v[i], 0);
  }

  /**
   * Multiplication with a scalar
   * @param {number} Number to scale
   * @returns {Vector} Multiplicated vector
   */
  mul(n) {
    return this.map(x => x * n, 0);
  }

  /**
   * Copy vector
   * @returns {Vector}
   */
  copy() {
    return new Vector(...this);
  }
}
