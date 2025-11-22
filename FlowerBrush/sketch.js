//let x, y;
let cam
let counter = 0;
let brush = 1;
let reset = false
flower = []
function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");

  cam = createCapture(VIDEO)
  cam.hide()
  // flower = new brush2(mouseX, mouseY)

}

function draw() {
  background(220);
  image(cam, 0, 0);
  for (let i = 0; i < flower.length; i++) {
    flower[i].display()
  }
  // if (keyIsPressed()){
  //   if (key == 1) {
  //     brush = 1;
  //   } if (key == 2) {
  //     brush = 2;
  //   }
  // }
  if (mouseIsPressed) {
    counter++
    if (counter > 1000) {
      counter += 0
    }

    let size = map(counter, 0, 1000, 10, 20)
    //if (brush == 1) {
    flower.push(new brush2(mouseX, mouseY, size))
    // } else if (brush == 2) {
    // flower.push(new brush2(mouseX, mouseY))
    // }

    //flower[flower.length-1].s = counter;
    //counter++;

  }
  // fill(0);
  // circle(width / 2, height / 2, counter);

  // flower.x = mouseX;
  // flower.y = mouseY;
}

function mouseReleased() {
  reset = true
  //counter = 0;
}
function mousePressed() {
  // flower.push(new brush2(mouseX, mouseY))
}
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
