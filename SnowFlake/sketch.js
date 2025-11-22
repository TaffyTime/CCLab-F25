let sf = [];
let n = 50;
let mic;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // Create an Audio input
  mic = new p5.AudioIn();
  mic.start();
  for (let i = 0; i < n; i++) {
    sf[i] = new SnowFlake(random(width), random(-150, -height), random(10, 100))
  }
  // function mousePressed() {
  //   SF.push(new SnowFlake(mouseX, mouseY, random(50, 100)));
  // }
}

function draw() {
  background(0, 100, 0);
  for (let i = 0; i < sf.length; i++) {
    sf[i].update()

    sf[i].display()
  }
}

class SnowFlake {
  constructor(x, y, s) {
    //setup, add new variables and such
    this.x = x;
    this.x0 = x
    this.y = y;
    this.s = s
    this.angle = frameCount
    this.swayX = map(this.s, 10, 100, 0.1, 0.05)
    this.speedY = map(this.s, 10, 100, 0.8, 2)
    this.ampY = map(this.s, 10, 100, 10, 20)
    //this.sq = map(this.s, 10, 100, 5, 15)
    this.opacity = map(this.s, 10, 100, 20, 100)
  }

  display() {
    //where you actually create the function for your creature
    colorMode(HSB, 100);
    push()
    translate(this.x, this.y);
    rotate(frameCount * 0.05);
    stroke(0, 0, 100, this.opacity)


    //lines

    //vertical lines
    line(0, 0, 0, -this.s)
    line(0, 0, 0, this.s)
    //horizontal lines
    line(0, 0, this.s, 0)
    line(0, 0, -this.s, 0)
    //diagonal lines
    line(0, 0, 1 / 2 * this.s, -1 / 2 * this.s)
    line(0, 0, 1 / 2 * this.s, 1 / 2 * this.s)
    line(0, 0, -1 / 2 * this.s, -1 / 2 * this.s)
    line(0, 0, -1 / 2 * this.s, 1 / 2 * this.s)

    //squares

    //north
    fill(0, 0, 100, this.opacity)
    push()
    translate(0, -this.s)
    rectMode(CENTER)
    rotate(PI / 4)
    rect(0, 0, this.s * 0.15, this.s * 0.15)
    pop()

    //northeast
    push()
    translate(1 / 2 * this.s, -1 / 2 * this.s)
    rectMode(CENTER)
    rect(0, 0, this.s * 0.2, this.s * 0.2)
    pop()

    //east
    push()
    translate(this.s, 0)
    rectMode(CENTER)
    rotate(PI / 4)
    rect(0, 0, this.s * 0.15, this.s * 0.15)
    pop()

    //southeast
    push()
    translate(1 / 2 * this.s, 1 / 2 * this.s)
    rectMode(CENTER)
    rect(0, 0, this.s * 0.2, this.s * 0.2)
    pop()

    //south
    push()
    translate(0, this.s)
    rectMode(CENTER)
    rotate(PI / 4)
    rect(0, 0, this.s * 0.15, this.s * 0.15)
    pop()

    //southwest
    push()
    translate(-1 / 2 * this.s, 1 / 2 * this.s)
    rectMode(CENTER)
    rect(0, 0, this.s * 0.2, this.s * 0.2)
    pop()

    //west
    push()
    translate(-this.s, 0)
    rectMode(CENTER)
    rotate(PI / 4)
    rect(0, 0, this.s * 0.15, this.s * 0.15)
    pop()

    //northwest
    push()
    translate(-1 / 2 * this.s, -1 / 2 * this.s)
    rectMode(CENTER)
    rect(0, 0, this.s * 0.2, this.s * 0.2)
    pop()
    pop();
  }

  update() {
    //updating variables to making things move

    let vol = mic.getLevel()
    let f = map(vol, 0, 1, 1, 30);
    // let fx;
    // if (this.x < width / 2) {
    //   fx = map(vol, 0, 1, 0, -500);
    // } else {
    //   fx = map(vol, 0, 1, 0, 500);
    // }
    // console.log(fx);

    this.x = this.x0 + this.ampY * sin(frameCount * this.swayX)
    this.y = this.y + this.speedY * f

    if (this.y > height + this.s * 2) {
      this.isOut = true;
      this.x = random(width)
      this.y = random(-height, -height * 0.3)
      this.x0 = this.x
      this.s = random(10, 100)
      this.speedY = map(this.s, 10, 100, 0.8, 2)
    }



  }
  isOut() {
    if (this.y > height + this.s * 2) {
      return true;
    } else {
      return false;
    }
  }
}


//questions for marcela
//why are the snowflake opacities not aligning with what I coded? Why is the mic function not working?
