rectangle = []
let counter
let cam
let countscale
function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO)
  cam.hide()
}

function draw() {
  background(220);
  image(cam, 0, 0);
  for (let i = 0; i < rectangle.length; i++) {
    rectangle[i].display()
    rectangle[i].update()
  }
  // rectangle[i].updatelifespan()

  // if (rectangle[i].isDone == true) {
  //   t.splice(i, 1);
  // }
  if (mouseIsPressed) {
    rectangle.push(new brush1(mouseX, mouseY, 15, 10))
  }
}


class brush1 {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.lifespan = 1.0
    // this.dying = map(this.w * this.h, 50, 450, 0.005, 0.001)
    // this.isDone = false
    this.color = cam.get(mouseX, mouseY);
    this.var = dist(mouseX, mouseY, width / 2, height / 2)
    this.hyp = dist(width / 2, height / 2, 0, 0)
    this.angle = map(this.var, 0, this.hyp, 0, 10 * PI)
  }
  display() {
    push()
    translate(this.x, this.y)
    rectMode(CENTER)
    rotate(this.angle)
    noStroke()
    fill(this.color)
    rect(0, 0, this.w, this.h)
    pop()
  }
  update() {
    this.w = this.w + 2 * sin(0.1 * frameCount)
    this.h = this.h + 2 * sin(0.1 * frameCount)

  }
}
