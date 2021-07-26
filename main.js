function main() {
 console.log(newton(x => x**2 - 4*x + 4, x => 2*x - 4))
  const field = new CanvasField2d({
    bodies: [
      new Body(500, 1, [100, 100], [0, 0]),
      new Body(500, 1, [200, 100], [0, 0]),
      new Body(2000, 1, [250, 300], [0, -10]),
      new Body(50, 1, [100, 200], [30, 0], 7),
      new Body(70, 1, [200, 200], [-30, 0], 7),
    ],
    walls: [
      [0, 0, 1, 10000]
    ],
    fieldId: 'canvas',
    scale: 1,
  });

  const simulation = new Simulation({
    field,
    timeSpeed: 1,
    doHit: true,
  });

  // debug
  window.simulation = simulation;

  simulation.start();
}

main();