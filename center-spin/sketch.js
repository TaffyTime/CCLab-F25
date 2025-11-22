tron = []
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
  for (let i = 0; i < tron.length; i++) {
    tron[i].display()
    tron[i].update()
  }
  if (mouseIsPressed) {
    tron.push(new Mermaid(mouseX, mouseY, 10))
  }
}

class Mermaid {
  constructor(startX, startY, eliwi) {
    //setup, add new variables and such
    this.x = startX;
    this.y = startY;
    this.angle0 = 0
    this.angle1 = 0
    this.angle2 = 0
    this.angle3 = 0
    this.color = cam.get(mouseX, mouseY);
    this.eliwi = eliwi
    this.elihi = eliwi / 3
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



    //center
    push()
    translate(this.x, this.y)
    rotate(this.angle0)
    noStroke()
    fill(this.color)
    ellipse(0, 0, this.eliwi, this.elihi)
    pop()

    //layer 1
    push()
    translate(this.x, this.y)
    rotate(this.angle1)
    for (let ang1 = 0; ang1 < 75; ang1 += PI / 8) {
      noStroke()
      fill(this.color)
      ellipse(this.eliwi * cos(ang1), this.elihi * sin(ang1), this.eliwi, this.elihi / 5)
    }
    pop()

    //layer 2
    push()
    translate(this.x, this.y)
    rotate(this.angle2)
    for (let ang2 = 0; ang2 < 75; ang2 += PI / 8) {
      noStroke()
      fill(this.color)
      ellipse(2 * this.eliwi * cos(ang2), 2 * this.elihi * sin(ang2), this.eliwi * (4 / 3), this.elihi / 5)
    }
    pop()

    //layer 3
    push()
    translate(this.x, this.y)
    rotate(this.angle3)
    for (let ang3 = 0; ang3 < 75; ang3 += PI / 8) {
      noStroke()
      fill(this.color)
      ellipse(3 * this.eliwi * cos(ang3), 3 * this.elihi * sin(ang3), this.eliwi * (5 / 3), this.elihi / 5)
    }
    pop()











  }
}