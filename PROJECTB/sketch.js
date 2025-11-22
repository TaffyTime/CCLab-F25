let cam
let paintbrush = 1
let mic

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

function draw() {
  background(220);
  image(cam, 150, 10);
  console.log(paintbrush)

  //screen frame
  noStroke()
  fill(0)
  //horizontals
  rect(0, 0, width, 10)
  rect(0, 490, width, 10)
  //verticals
  rect(0, 0, 150, height)
  rect(790, 0, 10, height)

  //brush buttons
  push()
  rectMode(CENTER)
  //button size interaction
  let scaler1 = 0
  let scaler2 = 0
  let scaler3 = 0
  if (mouseX > 10 && mouseX < 30 && mouseY > 20 && mouseY < 40) { scaler1 = 10 }
  if (mouseX > 10 && mouseX < 30 && mouseY > 70 && mouseY < 90) { scaler2 = 10 }
  if (mouseX > 10 && mouseX < 30 && mouseY > 120 && mouseY < 140) { scaler3 = 10 }
  //button click interaction
  if (mouseX > 10 && mouseX < 30 && mouseY > 20 && mouseY < 40 && mouseIsPressed) {
    scaler1 = 0
    paintbrush = 1
  }
  if (mouseX > 10 && mouseX < 30 && mouseY > 70 && mouseY < 90 && mouseIsPressed) {
    scaler2 = 0
    paintbrush = 2
  }
  if (mouseX > 10 && mouseX < 30 && mouseY > 120 && mouseY < 140 && mouseIsPressed) {
    scaler3 = 0
    paintbrush = 3
  }
  //actual buttons
  fill(255)
  rect(20, 30, scaler1 + 20, scaler1 + 20)
  rect(20, 80, scaler2 + 20, scaler2 + 20)
  rect(20, 130, scaler3 + 20, scaler3 + 20)
  pop()
  //text
  fill(255)
  text("RECTANGULAR BRUSH", 45, 35)
  text("FLORAL BRUSH", 45, 85)
  text("SHARP BRUSH", 45, 135)

  //frequency indicator!!!HELP
  let spectrum = fft.analyze();
  // console.log(mic.getLevel());
  for (let i = 0; i < spectrum.length; i++) {
    //let pitch = map(i, 0, spectrum.length, 0, height);
    let pitch = -height + map(spectrum[i], 0, 255, 600, 0);


    fill(255)
    rect(75, 200, 10, 200)
    push()

    fill(255, 0, 0)
    //rect(80, 400, 50, 10)
    rect(55, 400, 50, pitch);
    pop()
  }
}