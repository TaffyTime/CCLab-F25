// plans
// - make three different scale functions that change the size of the paintbrush (scale, hand gestures, pitch )
// - makes music from the art
// - 

let handPose;
let video
let hands = [];

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
let handnumber = 1

let shape = rectangle;
let a = 0;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //use videoera and hide image
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT()
  fft.setInput(mic)

  video = createCapture(VIDEO)
  video.size(640, 480)
  video.hide()
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

//functions to make the shapes to draw, depending on what brushnumber
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
  //console.log(handnumber)

  //frequency indicator mechanic and image
  let spectrum = fft.analyze();
  n++;
  pitch = spectrum[n];
  if (n > spectrum.length - 1) {
    n = 0;
  }
  let rectpitch = map(spectrum[n], 0, 255, 0, 200);


  image(video, 0, 0);
  filter(GRAY)

  //setting arrayed for loops for rectangle, flower, and then pointy brush, and splicing them
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

  //nested if statement to actually draw objects
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
      let trisize
      if (handnumber == 1) { trisize = 10 }
      if (handnumber == 2) { trisize = 15 }
      if (handnumber == 3) { trisize = 25 }
      pointer.push(new brush3(mouseX, mouseY, trisize))
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
  let rectstroke = 0
  let flowerstroke = 0
  let trianglestroke = 0
  if (paintbrush == 1) { rectstroke = 5 } else { rectstroke = 0 }
  if (paintbrush == 2) { flowerstroke = 5 } else { flowerstroke = 0 }
  if (paintbrush == 3) { trianglestroke = 5 } else { trianglestroke = 0 }

  //rectangle
  fill(255)
  stroke(236, 246, 148)
  strokeWeight(rectstroke)
  rect(670, 30, scaler1 + 20, scaler1 + 20)

  //flower
  stroke(255, 131, 175)
  strokeWeight(flowerstroke)
  rect(670, 80, scaler2 + 20, scaler2 + 20)

  //triangle
  stroke(145, 220, 255)
  strokeWeight(trianglestroke)
  rect(670, 130, scaler3 + 20, scaler3 + 20)
  pop()
  //brush button text
  fill(255)
  text("Flat Brush", 695, 35)
  text("Floral Brush", 695, 85)
  text("Triangle Brush", 695, 135)

  //pitch scale for flower brush
  push()
  rectMode(CENTER)
  fill(255)
  rect(670, 300, 10, 200)

  fill(255, 131, 175)
  rect(670, 400 - rectpitch, 40, 15);

  pop()

  //rectangle brush size scale 
  rectanglesizer = constrain(rectanglesizer, 200, 400)
  if (mouseIsPressed && mouseX > 700 && mouseX < 740 && mouseY > rectanglesizer - 15 / 2 && mouseY < rectanglesizer + 15 / 2) {
    rectanglesizer = mouseY
  }
  push()
  rectMode(CENTER)
  rect(720, 300, 10, 200)

  fill(236, 246, 148)
  rect(720, rectanglesizer, 40, 15);
  pop()

  //triangle sizer
  push()
  textAlign(CENTER, CENTER)
  rectMode(CENTER)
  let strokesize1 = 0
  let strokesize2 = 0
  let strokesize3 = 0
  if (handnumber == 1) { strokesize1 = 5 } else { strokesize1 = 0 }
  if (handnumber == 2) { strokesize2 = 5 } else { strokesize2 = 0 }
  if (handnumber == 3) { strokesize3 = 5 } else { strokesize3 = 0 }

  //handsign indicators 1, 2, 3
  strokeWeight(strokesize1)
  stroke(145, 220, 255)
  fill(255)
  rect(770, 210, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("1", 770, 210)

  strokeWeight(strokesize2)
  stroke(145, 220, 255)
  fill(255)
  rect(770, 300, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("2", 770, 300)

  strokeWeight(strokesize3)
  stroke(145, 220, 255)
  fill(255)
  rect(770, 390, 20, 20)
  noStroke()
  fill(0)
  textSize(15)
  text("3", 770, 390)
  pop()

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

  //clear function
  if (mouseX > 650 && mouseX < 740 && mouseY > 440 && mouseY < 480 && mouseIsPressed) {

    life = 0
  } else { life = 15000 }

  //info button
  push()
  rectMode(CENTER)
  textAlign(CENTER, CENTER)
  colorMode(HSB, 100)
  noFill()
  stroke(255, 0, 100)
  rect(775, 470, 40, 20)
  text("info", 775, 470)


  //info hover
  if (mouseX > 755 && mouseX < 795 && mouseY > 460 && mouseY < 480) {
    for (let x = 70; x <= 570; x += 5) {
      let color = map(x, 70, 570, 0, 100)
      fill(color, 50, 100)
      noStroke()
      rect(x, 480 / 2, 5, 100)
    }
    //rect(640 / 2, 480 / 2, 500, 100)
    fill(0)
    text("You all have lost touch with what it means to be human. Creation comes from you. Reclaim your humanity. You are connected to the art you create, don't worry about perfection or skill, just put something on the page. Alter the shape and size of your brush with your voice, your hands, and interacting with the interface of the program", 640 / 2, 480 / 2, 500, 100)
  }
  pop()

  //hands
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    push()
    let hand = hands[i];
    let p0 = hand.keypoints[0] //base of palm
    let pk1 = hand.keypoints[10] //first knuckle of middle finger
    let pk2 = hand.keypoints[14] // first knuckle of ring finger 
    let p1 = hand.keypoints[4] //thumb tip
    let p2 = hand.keypoints[8] //index tip 
    let p3 = hand.keypoints[12] //middle tip 
    let p4 = hand.keypoints[16] //ring tip 
    let p5 = hand.keypoints[20] //pinky tip 
    stroke(255, 0, 0);
    strokeWeight(5)
    // line(p3.x, p3.y, p0.x, p0.y); // middle
    // line(p4.x, p4.y, p0.x, p0.y); // ring
    // line(p5.x, p5.y, p0.x, p0.y); // pinky
    // line(p1.x, p1.y, pk2.x, pk2.y) // thumb to knuckle
    // line(p2.x, p2.y, p0.x, p0.y) // index to base

    let index1 = dist(p2.x, p2.y, p0.x, p0.y) // index tip to palm of base 
    let mid1 = dist(p3.x, p3.y, p0.x, p0.y); // middle tip to palm base 
    let ring1 = dist(p4.x, p4.y, p0.x, p0.y); // ringtip to palm base 
    let pink1 = dist(p5.x, p5.y, p0.x, p0.y); // pinky tip to palm base 
    let tk1 = dist(p1.x, p1.y, pk1.x, pk1.y) // thumb tip to middle knuckle 
    let tk2 = dist(p1.x, p1.y, pk2.x, pk2.y) // thumb tip to ring knuckle 
    let tp = dist(p1.x, p1.y, p5.x, p5.y) // thumb tip to pinky 

    if (mid1 < 75 && ring1 < 45 && pink1 < 50 && tk1 < 15 && index1 > 215) {
      handnumber = 1
    }
    if (index1 > 200 && mid1 > 200 && ring1 < 55 && pink1 < 50 && tk2 < 15) {
      handnumber = 2
    }
    if (index1 > 195 && mid1 > 195 && ring1 > 180 && tp < 12) {
      handnumber = 3
    }
    pop()
  }
}

//rectangle brush
class brush1 {
  constructor(x, y, w) {
    this.x = x
    this.y = y
    this.w = w
    this.color = video.get(mouseX, mouseY);
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
    this.c = video.get(mouseX, mouseY);
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
    this.color = video.get(mouseX, mouseY);
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
