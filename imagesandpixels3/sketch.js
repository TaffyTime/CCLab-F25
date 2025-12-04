let p = []
let d = 10
let back = false
let img
let p1 = 0
let p2 = 0
function preload() {
  img = loadImage("assets/hokusai.jpg")
  faceMesh = ml5.faceMesh(options);
}
//face
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: true };
let mouthOpen = false

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  img.loadPixels()
  for (let x = 0; x < img.width; x += d) {
    for (let y = 0; y < img.height; y += d) {
      let i = (y * img.width + x) * 4
      let r = img.pixels[i + 0]
      let g = img.pixels[i + 1]
      let b = img.pixels[i + 2]

      p.push(new particle(x, y, d, color(r, g, b)))
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < p.length; i++) {
    if (mouthOpen) {
      back = false;
      p[i].update()
    }
    if (back) {
      p[i].reset()
    }
    p[i].display()
  }
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let p1 = face.keypoints[13];
    let p2 = face.keypoints[14];
    fill(0, 255, 0);
    noStroke();
    circle(p1.x, p1.y, 5);
    let d = dist(p1.x, p1.y, p2.x, p2.y)
    if (d > 30) {
      mouthOpen = true
    } else {
      mouthOpen = false
    }
  }
}


function keyPressed() {
  if (key == "b") {
    back = true
  }
}
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
class particle {
  constructor(x, y, s, c) {
    this.x = x
    this.y = y
    this.x0 = x
    this.y0 = y
    this.s = s
    this.c = c
    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.away = 0.3; //change this to make it go further


  }
  display() {
    noStroke()
    fill(this.c)
    push()
    translate(this.s / 2, this.s / 2)
    circle(this.x, this.y, this.s)
    pop()

  }
  update() {
    let d = dist(p1.x, p1.y, this.x, this.y);

    if (d < 25) { //radius of the circle

      this.accX = (p1.x - this.x) * -this.away;
      this.accY = (p1.y - this.y) * -this.away;
      this.speedX += this.accX;
      this.speedY += this.accY;
    }
    this.speedX = this.speedX * 0.9; // 10% less per frame
    this.speedY = this.speedY * 0.9; // 10% less per frame

    this.x += this.speedX;
    this.y += this.speedY;

  }
  reset() {
    this.x = lerp(this.x, this.x0, 0.1)
    this.y = lerp(this.y, this.y0, 0.1)
    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
  }
}