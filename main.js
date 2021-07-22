const s2 = Math.sqrt(2);
const s3 = Math.sqrt(3);

function main() {
  const field = new CanvasField2d({
    bodies: [
      new Body(70, 1, [300, 502], [0, -6]),
      new Body(70, 1, [500, 501], [4, -14]),
      new Body(70, 1, [402, 300], [8, 8]),
    ],
    fieldId: 'canvas',
    scale: 8,
  });

  const simulation = new Simulation({
    field,
    timeSpeed: 3,
    doHit: true,
  });

  // debug
  window.simulation = simulation;

  simulation.start();
}

main();
