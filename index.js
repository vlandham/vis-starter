/**
 * Entry Point into JS code.
 */
import Zdog from 'zdog';

let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  dragRotate: true,
});

// add circle
// new Zdog.Ellipse({
//   addTo: illo,
//   diameter: 80,
//   stroke: 20,
//   color: '#636',
//   translate: { z: 10 },
// });

let zAnchor = new Zdog.Anchor({
  addTo: illo,
  // scale: 1.5,
  translate: { z: 10, x: -330, y: -210 },
});

let zGroup = new Zdog.Group({
  addTo: illo,
  scale: 1.5,
  translate: { z: 10, x: -330, y: -210 },
});

const onZ = (x, y) => {
  if (y > 2 && y < 9 && x < 2) {
    return true;
  }

  if (y > 2 && y < 9 && x > 5) {
    return true;
  }

  if (y > 6 && y < 9 && (x > 1) & (x < 3)) {
    return true;
  }
  if (y > 4 && y < 7 && (x > 2) & (x < 5)) {
    return true;
  }
  if (y > 2 && y < 5 && (x > 4) & (x < 7)) {
    return true;
  }
  return false;
};

new Zdog.Rect({
  addTo: illo,
  width: 740,
  height: 500,
  stroke: 16,
  fill: true,
  color: '#C25',
});

const rows = 8;
const cols = 12;

const spacing = (500 - 20) / cols;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (onZ(i, j)) {
    }
    let dot = new Zdog.Shape({
      addTo: zGroup,
      stroke: 20,
      color: onZ(i, j) ? '#EA0' : '#821637',
      translate: { y: i * spacing, x: j * spacing },
    });
  }
}

// illo.rotate.x += 0.8;
// illo.rotate.y += -0.1;
// illo.rotate.z += 0.02;

// update & render
illo.updateRenderGraph();

function animate() {
  // rotate illo each frame
  illo.rotate.y += -0.03;
  illo.rotate.z += -0.001;
  // illo.rotate.z += 0.03;
  illo.updateRenderGraph();
  // animate next frame
  // requestAnimationFrame(animate);
}
// start animation
animate();
