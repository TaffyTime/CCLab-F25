let x, y;
let speedY
let cloud;
function setup() {
  //createCanvas(400, 400);
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
  cloud = new Cloud()
}

function draw() {
  background(220);
  c.display()
  c.move()
  // drawCloud(x, y, 100);
  // move()
}

function drawCloud(u, v, s) {
  push();
  translate(u, v);
  noStroke();
  circle(0, 0, s);
  //circles around the body
  for (let a = 0; a < 2 * PI; a += PI / 6) {
    push();
    rotate(a);
    circle(s * 0.5, s * 0.3, s * 0.5);
    pop();
  }
  //face
  fill(0);
  circle(-s * 0.3, 0, s * 0.05);
  circle(s * 0.3, 0, s * 0.05);
  arc(0, 0, s * 0.3, s * 0.3, 0, PI);
  pop();
}

function move() {
  y = height * noise(frameCount * 0.01)


}
class Cloud {
  //constructor is like the setup
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.s = 100
  }
  //methods are the functions
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    circle(0, 0, this.s);
    //circles around the body
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(s * 0.5, this.s * 0.3, this.s * 0.5);
      pop();
    }
    //face
    fill(0);
    circle(-this.s * 0.3, 0, this.s * 0.05);
    circle(this.s * 0.3, 0, this.s * 0.05);
    arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
    pop();
  }
  move() {
    //this.y = height * noise(frameCount * 0.01)
    this.x = 50 * cos(frameCount)
    this.y = 50 * sin(frameCount)
    this.s = map(sin(frameCount * 0.1), -1, 1, 70, 100)
  }
}
