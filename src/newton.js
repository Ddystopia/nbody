const getDf = (f, dt) => t => (f(t + dt) - f(t)) / dt;

/**
 * Get zero of function by newton method
 * @param {Object} options
 *
 * @param {function} config.f Function to get zero
 * @param {function=} [config.Df=derivative by definition] Derivative of the function
 * @param {number=} [config.x0=-1e10] Start point of iteration
 * @param {number=} [config.eps=1e12] Epsilon of mistake
 * @param {number=} [config.max_iter=1e4] Max iteration count
 *
 * @returns {number} Result of iteration, NaN if failed
 */
function newton({ f, Df = null, x0 = -1e-10, eps = 1e-12, max_iter = 1e4 }) {
  let x = x0;
  let step = 0;
  Df = Df || getDf(f, 1e-13);
  while (Math.abs(f(x)) > eps) {
    const dfx = Df(x);
    if (dfx === 0 || step > max_iter) return NaN;
    x = x - f(x) / dfx;
    step++;
  }
  return x;
}

function arc(f) {
  return y => newton({ f: x => f(x) - y });
}
