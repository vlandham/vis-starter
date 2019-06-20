/**
 * Entry Point into JS code.
 */
import * as d3 from 'd3';

const selector = '.text-canvas';
const fontPath = 'data/fonts/MonteCarloMedium.bdf';

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

class SimplePixel {
  constructor(ctx, x, y, size) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.target = { x: x, y: y };
  }

  render() {
    this.ctx.rect(this.x, this.y, this.size, this.size);
  }

  setTarget(target, marginX) {
    target.x = marginX + target.x * this.size;
    target.y = target.y * this.size;
    this.target = target;
  }

  move(index, allPixels) {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;

    const diff = Math.abs(dx) - Math.abs(dy);

    if (dx === 0 && dy === 0) {
      return true;
    }

    const speed = 10;
    const angle = Math.atan2(dy, dx);

    const xVelocity = speed * Math.cos(angle);
    const yVelocity = speed * Math.sin(angle);

    if (Math.abs(dx) < this.size / 2) {
      this.x = this.target.x;
    } else {
      this.x += diff > 0 ? xVelocity : 0;
    }

    if (Math.abs(dy) < this.size / 2) {
      this.y = this.target.y;
    } else {
      this.y += diff <= 0 ? yVelocity : 0;
    }
    return false;
  }
}

class Display {
  constructor(canvas, width, height, size = 30) {
    this.pixRatio = 1.0;
    if (window.devicePixelRatio) {
      this.pixRatio = window.devicePixelRatio;
    }

    this._width = width;
    this._height = height;

    canvas.width = this.pixRatio * width;
    canvas.height = this.pixRatio * height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.pixRatio, this.pixRatio);
    this.pixels = [];
    this.size = size;
    const PIXEL_COUNT = 200;

    for (let i = 0; i < PIXEL_COUNT; i++) {
      const x = generateRandomInteger(0, width);
      // const y = generateRandomInteger(0, height);
      // const x = 0;
      const y = 0;
      const pixel = new SimplePixel(this.ctx, x, y, this.size);
      this.pixels.push(pixel);
    }
  }

  setTargets(font, text) {
    let locations = font.getPixels(text);

    const maxX = d3.max(locations, d => d.x);
    console.log(maxX * this.size, this._width);
    let marginX = (this._width - maxX * this.size) / 2;
    console.log(marginX);
    marginX = Math.max(marginX, 0);

    console.log(locations);
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      this.pixels[i].setTarget(location, marginX);
    }

    for (let i = locations.length; i < this.pixels.length; i++) {
      const pixel = this.pixels[i];
      pixel.target = { x: pixel.x, y: this._height + pixel.size };
      // const x = generateRandomInteger(0, this._width / this.pixels[i].size);
      // const y = this._height / this.pixels[i].size + this.pixels[i].size;
      // this.pixels[i].setTarget({ x: x, y: y });
    }
  }

  display(font, text) {
    this.setTargets(font, text);
    const that = this;

    return new Promise((resolve, reject) => {
      const t = d3.timer(function(elapsed) {
        const allDone = that.move(elapsed);
        that.render();

        if (allDone) {
          console.log('stop');
          t.stop();
          resolve(true);
        }
      });
    });
  }

  move() {
    const pixelCount = this.pixels.length;
    let allMoved = true;
    for (let i = 0; i < pixelCount; i++) {
      const pixFinished = this.pixels[i].move(i, this.pixels);
      if (!pixFinished) {
        allMoved = false;
      }
    }
    return allMoved;
  }

  render() {
    this.clear();
    this.ctx.beginPath();
    this.ctx.fillStyle = rgba(255, 0, 0, 0.8);
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i].render();
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  clear() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.clearRect(0, 0, this._width, this._height);
    this.ctx.fill();
  }
}

function rgba(r, g, b, a) {
  return 'rgba(' + ~~r + ',' + ~~g + ',' + ~~b + ',' + a + ')';
}

function led(ctx, px, py, size, alpha) {
  ctx.fillStyle = rgba(255, 0, 0, alpha);
  var x = size + px * size;
  var y = size + py * size;
  ctx.beginPath();
  ctx.arc(x * 1.2, y * 1.4, size / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// function square(ctx, px, py, size, alpha) {
//   ctx.fillStyle = '#ff6';
//   var x = size + px * size;
//   var y = size + py * size;
//   ctx.rect(x, y, size, size);
//   ctx.fill();
// }

function drawText(font) {
  console.log('font loaded');
  const canvas = document.querySelector(selector);
  const display = new Display(canvas, 1200, 400, 20);
  display
    .display(font, 'Hello')
    .then(() => {
      return display.display(font, 'World');
    })
    .then(() => {
      return display.display(font, 'How');
    })
    .then(() => {
      return display.display(font, 'Are');
    })
    .then(() => {
      return display.display(font, 'You?');
    })
    .then(() => {
      return display.display(font, 'Wünderbar');
    });
}

Pxxl.LoadFont(fontPath, drawText);
