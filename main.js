function main() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const field = new CanvasField2d({
    bodies: [
      new Body(500, 1, [100, 100], [0, 0]),
      new Body(500, 1, [200, 100], [0, 0]),
      new Body(700, 1, [200, 300], [0, -150]),
      new Body(500, 0, [300, 200], [-300, 0]),
      new Body(500, 1, [200, 300], [0, 0]),
      new Body(2000, 0, [300, 300], [400, 0]),
      new Body(700, 1, [210, 210], [3500, 0]),
    ],
    walls: [
      new Wall(0, 0, 0, h),
      new Wall(0, 0, w, 0, 'tomato'),
      new Wall(w, 0, 0, h),
      new Wall(0, h, w, 0),
      new Wall(0, h / 2, w / 4, 100)
    ],
    fieldId: 'canvas',
    scale: 1,
  });

  const simulation = new Simulation({
    field,
    timeSpeed: 1,
    doHit: true,
    gravity: true,
  });

  // debug
  window.simulation = simulation;

  simulation.start();
}

main();
