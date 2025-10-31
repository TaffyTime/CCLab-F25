let x = []
let y = []
let s = []
let speedX = []
let n = x.length
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // for (let i = 0; i < 5; i++) {
  //   x[i] = width / 2
  //   y[i] = height / 2
  //   s[i] = random(50, 150)
  //   speedX[i] = map(s[i], 50, 150, 0.1, 0.5)
}
// x[1] = width / 2
// y[1]= height / 2
// s[1]= random(50, 150)
// speedX[1]= map(s[1], 50, 150, 3, 0.5)


function draw() {
  background(220);
  for (let i = 0; i < x.length; i++) {
    drawCloud(x[i], y[1], s[i])
    move()
  }
  function drawCloud(x, y, s) {
    fill(255, 230);
    push();
    noStroke();
    translate(x, y);
    //main circle
    circle(0, 0, s);
    //add circles around
    for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
      push();
      rotate(angle);
      let s2 = map(noise(angle), 0, 1, 0.1 * s, s)
      circle(s * 0.5, 0, s2);
      pop();
    }
    pop();

  }
  function move() {
    for (let i = 0; i < x.length; i++) {
      x[i] = x[i] + speedX[i]
      if (x[i] > width + 100) { x[i] = -100 }
      y[i] = height * noise(frameCount * 0.003)
    }
    // x[1] = x[1] + speedX[1]
    // if (x[1] > width + 100) { x[1] = -100 }
    // y[1] = height * noise(frameCount * 0.003)

  }

}
function mousePressed() {
  x.push(mouseX)
  y.push(mouseY)
  s.push(random(50, 150))
  speedX.push(map(100, 50, 150, 0.1, 0.5))
}