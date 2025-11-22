let bubble = [];
let n = 30;
function setup() {
  createCanvas(400, 600);
  for (let i = 0; i < n; i++) {
    bubble[i] = new Bubble();
  }
}

function draw() {
  background(0, 0, 255);
  for (let i = 0; i < n; i++) {
    bubble[i].display();
    bubble[i].update();
  }
}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height * 2);
    this.s = random(10, 50);
    this.speedY = map(this.s, 10, 50, 5, 0.5);
    this.osc = new p5.SinOsc();
    //freq according to their sizes
    this.f = map(this.s, 5, 50, 800, 40);
    this.osc.amp(0);
    this.osc.start();

  }
  display() {
    fill(255, 200);
    noStroke();
    circle(this.x, this.y, this.s);
  }
  update() {
    this.y = this.y - this.speedY;
  }
  checkBoundaries() {
    if (this.y < 0 + this.s) {
      this.x = random(width);
      this.y = random(2 * height);
      this.osc.freq(this.f);
      this.osc.amp(1, 0.1);
    } else {
      this.osc.amp(0, 0.1);
    }
  }

}
