let cam
let paintbrush = 1
let mic
let flower = []
let rectangle = []
let pointer = []
let n = 0;
let pitch
let flowersize

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //use camera and hide image
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT()
  fft.setInput(mic)
  cam = createCapture(VIDEO)
  cam.hide()
}

function draw() {
  background(220);
  image(cam, 0, 0);
  console.log(paintbrush);

  //rectangle brush
  for (let i = 0; i < rectangle.length; i++) {
    rectangle[i].display()
    rectangle[i].update()
  }
  if (mouseIsPressed && paintbrush == 1) {
    rectangle.push(new brush1(mouseX, mouseY, 15, 5))
  }

  //flower brush
  for (let i = 0; i < flower.length; i++) {
    flower[i].display()
  }
  if (mouseIsPressed && paintbrush == 2) {
    flowersize = map(pitch, 200, 0, 5, 20)
    flower.push(new brush2(mouseX, mouseY, flowersize))
  }

  //triangle brush
  for (let i = 0; i < pointer.length; i++) {
    pointer[i].display()
    pointer[i].update()
  }
  if (mouseIsPressed && paintbrush == 3) {
    pointer.push(new brush3(mouseX, mouseY, 10))
  }




  //screen frame
  noStroke()
  fill(0)
  //horizontals
  rect(0, 480, width, 20)
  //verticals
  rect(640, 0, 160, height)

  //brush buttons
  push()
  rectMode(CENTER)
  //button size interaction
  let scaler1 = 0
  let scaler2 = 0
  let scaler3 = 0
  if (mouseX > 660 && mouseX < 680 && mouseY > 20 && mouseY < 40) { scaler1 = 10 }
  if (mouseX > 660 && mouseX < 680 && mouseY > 70 && mouseY < 90) { scaler2 = 10 }
  if (mouseX > 660 && mouseX < 680 && mouseY > 120 && mouseY < 140) { scaler3 = 10 }
  //button click interaction
  if (mouseX > 660 && mouseX < 680 && mouseY > 20 && mouseY < 40 && mouseIsPressed) {
    scaler1 = 0
    paintbrush = 1
  }
  if (mouseX > 660 && mouseX < 680 && mouseY > 70 && mouseY < 90 && mouseIsPressed) {
    scaler2 = 0
    paintbrush = 2
  }
  if (mouseX > 660 && mouseX < 680 && mouseY > 120 && mouseY < 140 && mouseIsPressed) {
    scaler3 = 0
    paintbrush = 3
  }
  //actual buttons
  fill(255)
  rect(670, 30, scaler1 + 20, scaler1 + 20)
  rect(670, 80, scaler2 + 20, scaler2 + 20)
  rect(670, 130, scaler3 + 20, scaler3 + 20)
  pop()
  //text
  fill(255)
  text("FLAT BRUSH", 695, 35)
  text("DRY BRUSH", 695, 85)
  text("SHARP BRUSH", 695, 135)

  //frequency indicator!!!HELP
  let spectrum = fft.analyze();
  n++;
  pitch = map(spectrum[n], 0, 255, 200, 0);
  if (n > spectrum.length - 1) {
    n = 0;
  }
  push()
  rectMode(CENTER)
  fill(255)
  rect(670, 300, 10, 200)

  fill(255, 0, 0)
  rect(670, 400 - pitch, 40, 15);

  pop()
}

//rectangle brush
class brush1 {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
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

//flower brush
class brush2 {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.c = cam.get(mouseX, mouseY);
    this.s = s
  }
  display() {
    push();
    translate(this.x, this.y);
    noFill()
    stroke(this.c)
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 50) {
      push();
      rotate(angle);
      let R = this.s + map(sin(frameCount * 0.1 + angle / 0.05), -1, 1, 0, 50);
      let xc = R * cos(angle);
      let yc = R * sin(angle);
      curveVertex(xc, yc);
      pop();
    }
    endShape(CLOSE);
    pop();
  }
}

//triangle brush
class brush3 {

  constructor(x, y, hyp) {
    this.x = x
    this.y = y
    this.hyp = hyp
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
