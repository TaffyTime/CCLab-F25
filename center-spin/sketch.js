function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  dancer = new Mermaid(width / 2, height / 2)
}

function draw() {
  background(0);
  dancer.update()
  dancer.display()
}

class Mermaid {
  constructor(startX, startY) {
    //setup, add new variables and such
    this.x = startX;
    this.y = startY;
    this.h = random(100)
    this.angle0 = 0
    this.angle1 = 0
    this.angle2 = 0
    this.angle3 = 0
  }
  update() {
    //updating variables to making things move
    this.angle0 += 0.1
    this.angle1 += -0.1
    this.angle2 += 0.1
    this.angle3 += -0.1

  }
  display() {
    //where you actually create the function for your creature
    colorMode(HSB, 100)

    //center
    push()
    translate(this.x, this.y)
    rotate(this.angle0)
    noStroke()
    fill(this.h, 30, 100)
    ellipse(0, 0, 30, 10)
    pop()

    //layer 1
    push()
    translate(this.x, this.y)
    rotate(this.angle1)
    for (let ang1 = 0; ang1 < 75; ang1 += PI / 8) {
      noStroke()
      fill(this.h, 30, 100)
      ellipse(40 * cos(ang1), 40 * sin(ang1), 30, 2)
    }
    pop()

    //layer 2
    push()
    translate(this.x, this.y)
    rotate(this.angle2)
    for (let ang2 = 0; ang2 < 75; ang2 += PI / 8) {
      noStroke()
      fill(this.h, 30, 100)
      ellipse(70 * cos(ang2), 50 * sin(ang2), 40, 2)
    }
    pop()

    //layer 3
    push()
    translate(this.x, this.y)
    rotate(this.angle3)
    for (let ang3 = 0; ang3 < 75; ang3 += PI / 8) {
      noStroke()
      fill(this.h, 30, 100)
      ellipse(80 * cos(ang3), 120 * sin(ang3), 50, 2)
    }
    pop()











  }
}