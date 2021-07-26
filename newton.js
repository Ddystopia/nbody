const getDf = (f, dt) => t => (f(t + dt) - f(t)) / dt;

function newton({f, Df = null, x0 = -1e-10, eps = 1e-12, max_iter = 1e4}) {
  let x = x0;
  let step = 0;
  Df = Df || getDf(f, 1e-13);
  while(Math.abs(f(x)) > eps) {
    const dfx = Df(x);
    if (dfx === 0 || step > max_iter) return NaN;
    x = x - f(x) / dfx;
    step++
  }
  return x;
}
