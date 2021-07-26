function newton(f, Df, x0 = 0, eps = 1e-20, max_iter = 1e6) {
  let x = x0;
  let step = 0;
  while(Math.abs(f(x)) > eps) {
    const dfx = Df(x);
    if (dfx === 0 || step > max_iter) return NaN;
    x = x - f(x) / dfx;
    step++
  }
  console.log(step)
  return x;
}
