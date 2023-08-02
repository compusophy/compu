

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 16), 16);
      let c = parseInt(uint128Hex.substring(16, 24), 16);
      let d = parseInt(uint128Hex.substring(24, 32), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substring(2, 34));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substring(34, 66));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}

  let R = new Random();

  const fib = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const layerOneChoices = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  
  const L1 = R.random_choice(layerOneChoices);
  const L2 = R.random_choice(fib);
  const L3 = R.random_choice(fib);
  const L4 = R.random_choice(fib);
  const L5 = R.random_choice(fib);
  const L6 = R.random_choice(fib);
  const L7 = R.random_choice(fib);
  const L8 = R.random_choice(fib); 

  const layers = [L1, L2, L3, L4, L5, L6, L7, L8];

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  background(0);
  fill(255);
  noStroke();
  
  let centerX = width / 2;
  let centerY = height / 2;
  translate(centerX, centerY);
  
  let size = min(windowWidth, windowHeight) / 6.103;
  let yPosition = 0;

  for (let i = 0; i < 8; i++) {

    polarEllipses(
      layers[i],
      size / 2,
      size / 2,
      yPosition
    );
    
    let nextSize = size * 0.61803;
    yPosition = yPosition - size / 2 - nextSize * 0.61803 - nextSize / 2;
    size = nextSize;
    
  }
}

function polarEllipses(t, s, i, o) {
  const n = 360 / t;
  for (let e = 1; e <= t; e++) {
    const angle = radians(90 - e * n);
    const x = cos(angle) * o;
    const y = sin(angle) * o;
    push();
    translate(x, y);
    rotate(angle);
    ellipse(0, 0, 2 * s, 2 * i);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
