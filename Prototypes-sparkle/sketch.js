let spk = []
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100)

  for (let i = 0; i < 50; i++) {
    spk[i].push(new sparkle(mouseX, mouseY, 100, 60))
  }
}
function draw() {
  background(0);
  spk[i].display()
  spk[i].update()
}

class sparkle {

  constructor(x, y, hue) {
    this.x = this.radius * cos(this.angle)
    this.y = this.radius * sin(this.angle)
    this.radius = 0.1 * frameCount
    this.hue = hue
    this.angle = frameCount

  }

  display() {
    circle(this.x, this.y, 1)

  }

  update() {
    this.x = this.radius * cos(this.angle)
    this.y = this.radius * sin(this.angle)
    this.hue = hue



  }


}
