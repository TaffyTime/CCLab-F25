pointer = []
let cam

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO)
  cam.hide()
}

function draw() {
  background(220);
  image(cam, 0, 0);
  for (let i = 0; i < pointer.length; i++) {
    pointer[i].display()
    pointer[i].update()
  }
  if (mouseIsPressed) {
    pointer.push(new brush3(mouseX, mouseY, 10))
  }

}

class brush3 {

  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.hyp = s
    this.angle = 0
    this.anglebaby = 0
    this.color = cam.get(mouseX, mouseY);
  }
  display() {
    push()
    angleMode(DEGREES)
    translate(this.x, this.y)
    rotate(this.angle)
    noStroke()
    fill(this.color)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)

    //top baby triangle
    push()
    translate(0, -this.hyp)
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    //left baby triangle
    push()
    translate(-this.hyp * cos(30), this.hyp * sin(30))
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    //right baby triangle
    push()
    translate(this.hyp * cos(30), this.hyp * sin(30))
    rotate(this.anglebaby)
    triangle(-this.hyp * cos(30), this.hyp * sin(30), this.hyp * cos(30), this.hyp * sin(30), 0, -this.hyp)
    pop()

    pop()

  }
  update() {
    this.angle++
    this.anglebaby -= 1.75
  }

}