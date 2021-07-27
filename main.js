function main() {
  const w = CanvasField2d.width;
  const h = CanvasField2d.height;
  const field = new CanvasField2d({
    bodies: [
      new Body(500, 1, [100, 100], [0, 0]),
      new Body(500, 1, [200, 100], [0, 0]),
      new Body(700, 1, [200, 300], [0, -150]),
      new Body(500, 0, [300, 200], [-30, 0]),
      new Body(700, 0, [100, 200], [30, 0]),
      new Body(700, 1, [210, 210], [35, 0]),
    ],
    walls: [
      [0, 0, 0, h],
      [0, 0, w, 0],
      [w, 0, 0, h],
      [0, h, w, 0],
    ],
    fieldId: 'canvas',
    scale: 1,
  });

  const simulation = new Simulation({
    field,
    timeSpeed: 1,
    doHit: true,
    gravity: false,
  });

  // debug
  window.simulation = simulation;

  simulation.start();
}

main();