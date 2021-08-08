function main() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const field = new CanvasField2d({
    bodies: [
      new Body(500, 1, [100, 100], [0, 0]),
      new Body(500, 1, [200, 100], [0, 0]),
      new Body(700, 1, [200, 300], [0, -150]),
      // new Body(500, 0, [300, 200], [-30, 0]),
      // new Body(700, 0, [100, 200], [30, 0]),
      new Body(700, 1, [210, 210], [35, 0]),
    ],
    walls: [
      new Wall(0, 0, 0, h),
      new Wall(0, 0, w, 0, 'tomato'),
      new Wall(w, 0, 0, h),
      new Wall(0, h, 0, w),
      new Wall(0, h / 2, w, h / 2)
    ],
    // walls: [
    //   new Wall(0, 0, 0, h),
    //   new Wall(0, 0, w, 0),
    //   new Wall(w, h, 0, h),
    //   new Wall(w, h, w, 0),
    // ],
    fieldId: 'canvas',
    scale: 1,
  });

  const simulation = new Simulation({
    field,
    timeSpeed: 1,
    doHit: true,
    gravity: !true,
  });

  // debug
  window.simulation = simulation;

  simulation.start();
}

main();
