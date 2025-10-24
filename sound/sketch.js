let mySound1;
let mySound2;
function preload() {
  mySound1 = loadSound("assets/beat.mp3");
  mySound2 = loadSound("assets/kick.mp3")
}
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");

}
let x = 25;
let xs = 5;
let y = 25
let ys = 6

function draw() {
  background(220);
  fill(0)
  circle(x, y, 50)
  x = x + xs
  y = y + ys
  if (x < 0 + 25 || x > width - 25) {
    xs = -xs
    mySound1.play()
  }
  if (y < 0 + 25 || y > height - 25) {
    ys = -ys
    mySound2.play()
  }

}
function mousePressed() {
  if (mySound.isPlaying() == false) {
    mySound.play()
  } else {
    mySound.pause()
  }
}