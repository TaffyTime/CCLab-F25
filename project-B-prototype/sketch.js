// plans
// - make three different scale functions that change the size of the paintbrush (scale, hand gestures, pitch )
// - makes music from the art
// - 

let cam
let paintbrush = 1
let mic
let flower = []
let rectangle = []
let pointer = []
let n = 0;
let pitch
let flowersize
let rectanglesizer = 400
let life = 15000

let shape = rectangle;
let a = 0;

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
function drawShape(shape, a) {
  for (let i = a; i < shape.length; i++) {
    shape[i].display();
    shape[i].update();
  }
  for (let i = shape.length - 1; i >= 0; i--) {
    if (shape[i].murder()) {
      shape.splice(i, 1)
    }
  }
}
function mousePressed() {
  a = shape.length;
}

function draw() {
  //frequency indicator - needs work or different method
  let spectrum = fft.analyze();
  n++;
  pitch = spectrum[n];
  if (n > spectrum.length - 1) {
    n = 0;
  }
  let rectpitch = map(spectrum[n], 0, 255, 0, 200);
  //console.log(pitch);

  //background(220);
  image(cam, 0, 0);
  //setting arrayed for loops for rectangle, flower, and then pointy brush
  for (let i = rectangle.length - 1; i >= 0; i--) {
    rectangle[i].display()
    rectangle[i].update()
    if (rectangle[i].murder()) {
      rectangle.splice(i, 1)
    }
  }

  for (let i = pointer.length - 1; i >= 0; i--) {
    pointer[i].display()
    pointer[i].update()
    if (pointer[i].murder()) {
      pointer.splice(i, 1)
    }
  }

  for (let i = flower.length - 1; i >= 0; i--) {
    flower[i].display()
    if (flower[i].murder()) {
      flower.splice(i, 1)
    }
  }

  //nested if statement to actually draw and splice and objects
  if (mouseIsPressed) {
    //rectangle brush
    if (paintbrush == 1) {
      let rctsize = map(rectanglesizer, 200, 400, 50, 10)
      rectangle.push(new brush1(mouseX, mouseY, rctsize))
      shape = rectangle;
    }
    //flower brush
    if (paintbrush == 2) {
      flowersize = map(pitch, 0, 255, 20, 200);
      flower.push(new brush2(mouseX, mouseY, flowersize))
      shape = flower;
    }
    //triangle brush
    if (paintbrush == 3) {
      pointer.push(new brush3(mouseX, mouseY, 10))
      shape = pointer;
    }

  }

  drawShape(shape, a);


  //screen frame
  noStroke()
  fill(0)
  //horizontal
  rect(0, 480, width, 20)
  //vertical
  rect(640, 0, 160, height)

  //brush buttons
  push()
  rectMode(CENTER)
  //hover interaction
  let scaler1 = 0
  let scaler2 = 0
  let scaler3 = 0
  if (mouseX > 660 && mouseX < 680 && mouseY > 20 && mouseY < 40) { scaler1 = 10 }
  if (mouseX > 660 && mouseX < 680 && mouseY > 70 && mouseY < 90) { scaler2 = 10 }
  if (mouseX > 660 && mouseX < 680 && mouseY > 120 && mouseY < 140) { scaler3 = 10 }
  //click interaction
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
  //brush button text
  fill(255)
  text("FLAT BRUSH", 695, 35)
  text("FLOWER BRUSH", 695, 85)
  text("SHARP BRUSH", 695, 135)

  //clear sketch button
  push()
  rectMode(CENTER)
  //hover interaction
  let scaler4 = 0
  if (mouseX > 650 && mouseX < 740 && mouseY > 440 && mouseY < 480) {
    scaler4 = 10
  }
  //click interaction
  if (mouseX > 650 && mouseX < 740 && mouseY > 440 && mouseY < 480 && mouseIsPressed) {
    scaler4 = 0
  }
  //actual clear button
  fill(255, 0, 0)
  rect(695, 460, scaler4 + 90, scaler4 + 40)
  fill(255)
  textAlign(CENTER, CENTER)
  let scaler5 = 15
  if (scaler4 == 10) { scaler5 = 20 }
  textSize(scaler5)
  text("CLEAR SKETCH", 695, 460, scaler4 + 90, scaler4 + 40)
  pop()

  //rect moving up and down
  push()
  rectMode(CENTER)
  fill(255)
  rect(670, 300, 10, 200)

  fill(255, 0, 0)
  rect(670, 400 - rectpitch, 40, 15);

  pop()

  //rectangle brush size scale - done, how can i make it easier to use
  rectanglesizer = constrain(rectanglesizer, 200, 400)
  if (mouseIsPressed && mouseX > 700 && mouseX < 740 && mouseY > rectanglesizer - 15 / 2 && mouseY < rectanglesizer + 15 / 2) {
    rectanglesizer = mouseY
  }
  push()
  rectMode(CENTER)
  rect(720, 300, 10, 200)

  fill(255, 0, 0)
  rect(720, rectanglesizer, 40, 15);
  pop()

  //clear function
  if (mouseX > 650 && mouseX < 740 && mouseY > 440 && mouseY < 480 && mouseIsPressed) {
    for (let i = rectangle.length - 1; i >= 0; i--) {
      rectangle.splice(i, 1);
    }
    for (let i = flower.length - 1; i >= 0; i--) {
      flower.splice(i, 1);
    }
    for (let i = pointer.length - 1; i >= 0; i--) {
      flower.splice(i, 1);
    }
  }

  //triangle sizer
  push()
  rectMode(CENTER)
  rect(720, 300, 10, 200)
  rect(720, 300, 10, 200)
  rect(720, 300, 10, 200)
  pop()

}

//rectangle brush
class brush1 {
  constructor(x, y, w) {
    this.x = x
    this.y = y
    this.w = w
    this.color = cam.get(mouseX, mouseY);
    this.var = dist(mouseX, mouseY, width / 2, height / 2)
    this.hyp = dist(width / 2, height / 2, 0, 0)
    this.angle = map(this.var, 0, this.hyp, 0, 10 * PI)
    this.born = millis()
  }
  display() {
    push()
    angleMode(RADIANS);
    translate(this.x, this.y)
    rectMode(CENTER)
    rotate(this.angle)
    noStroke()
    fill(this.color)
    rect(0, 0, this.w, this.w)
    pop()
  }
  update() {
    this.w = this.w + sin(0.1 * frameCount)
  }
  murder() {
    return millis() - this.born > life
  }
}

//flower brush
class brush2 {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.c = cam.get(mouseX, mouseY);
    this.s = s
    this.born = millis()
  }
  display() {

    push();
    angleMode(RADIANS);
    translate(this.x, this.y);
    noFill()
    stroke(this.c)
    beginShape();
    for (let angle = 0; angle < 2 * PI; angle += PI / 50) {
      push();
      rotate(angle);
      // this.s = map(pitch, 200, 0, 5, 100)
      let R = 0 + map(sin(frameCount * 0.1 + angle / 0.05), -1, 1, 0, this.s);
      let xc = R * cos(angle);
      let yc = R * sin(angle);
      curveVertex(xc, yc);
      pop();
    }
    endShape(CLOSE);
    pop();
  }
  update() {

  }
  murder() {
    return millis() - this.born > life
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
    this.born = millis()
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
  murder() {
    return millis() - this.born > life
  }
}
