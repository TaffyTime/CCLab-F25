let x, y;
let s = 50;
let b = 0.05;
let g = 10;
let angle = 0;
let l = 20;
let counter = 0;
let brightness = 100;
let cnv
let doSomething = false
function changeVar() {
  doSomething = true;}
function changeVarBack() {
  doSomething = false;}
  
function setup() {
  colorMode(HSB, 100);
  //cnv = createCanvas(800, 500);
  let cnv = createCanvas(800, 500);
cnv.parent("p5-canvas-container");
  x = random(width);
  y = random(height);
  cnv.mouseOut(changeVar);
  cnv.mouseOver(changeVarBack);
}

function draw() {
  background(0);
//console.log(doSomething);
  MoldOrb();

  rectMode(CENTER);
  for (let xb = l / 2; xb < width; xb += l) {
    for (let yb = l / 2; yb < height; yb += l) {
      let dia = dist(x, y, xb, yb);
      let dis = dist(l / 2, l / 2, width, height);
      let f = map(dia, 0, dis, 0.1, 3);
      angle = map(dia, 0, dis, 0, 2 * PI);
      let h = map(noise(xb*yb), 0, 1, 30, 60);
      let w = map(dia, 0, dis, 1, 5);
      push();
      colorMode(HSB, 100);
      stroke(h, 100, 50, 50);
      strokeWeight(w);
      translate(xb, yb);
      rotate(angle);
      scale(f);
      line(0, 0, l, l);
      pop();
    }
  }
  sun(x, y);
}

function MoldOrb() {
  for (let i = 400; i > 0; i -= s) {
    let off = map(noise(frameCount * 0.0001 * i), 0, 1, -250, 250);
    let d = lerp(i, i + off, 0.1);
    let ho = map(off, -250, 250, 0, 100);
    let diam = map(sin(frameCount * b), -1, 1, 0.8, 1);
    let diagonal = dist(width / 2, height / 2, 1, 1);
    mouseX = constrain(mouseX, 0, width);
    mouseY = constrain(mouseY, 0, height);
    x = constrain(x,0,width)
    y = constrain(y,0,height)
    if(doSomething){
      x = lerp(x, width * noise(frameCount * 0.005), 0.01);
        y = lerp(y, height * noise(frameCount * 0.01), 0.01)}else{
         x = lerp(x, pmouseX, 0.001);
       y = lerp(y, pmouseY, 0.001);
       }
//     if ((mouseX > 0) && (mouseX < width) && (mouseY > 0) && (mouseY < height)) {
//       x = lerp(x, pmouseX, 0.001);
//       y = lerp(y, pmouseY, 0.001);
      
//     } else {
//       x = lerp(x, width * noise(frameCount * 0.005), 0.01);
//       y = lerp(y, height * noise(frameCount * 0.01), 0.01);
//       //console.log("out")
//     }
    
    let opacity = map(dist(x, y, width / 2, height / 2), 0, diagonal, 20, 100);
    
   
    noStroke();
    if(counter>500 && counter<750){brightness = lerp(100,25,0.1)}
    if(counter>750 && counter<1000){brightness = lerp(25,100,0.1)}else{
      brightness = 100;}
    fill(ho, 100, brightness, opacity);

    circle(x, y, d * diam);
    console.log(brightness)
    
    //BREATHING and DYING
    counter++;
    if (mouseIsPressed && (mouseX > x-150) && (mouseX < x+150) && (mouseY > y-150) && (mouseY < y+150)){counter = 0}
    if(counter<500){b = lerp(0.05,0.3,0.1)}
    if(counter>500 && counter<1000){b = lerp(0.3,0.05,0.1) }
    else{b=0.05}
     
    
  }
}
function sun(a, b){
  push();
  translate(a, b);
  for (let angsq = 0; angsq < 2 * PI; angsq += (2 * PI) / 100) {
    rotate(angsq);
    // translate(x, y);
    noFill();
    beginShape();
    let lineLength = 250;
    let hs = map(noise(frameCount * 0.0001), 0, 1, 0, 100)
    strokeWeight(1);
    for (let i = 0; i <= lineLength; i += lineLength / 100) {
      let v = 10 * sin(frameCount * 0.08 - i * 0.1);
      stroke(map(noise(0.2*v),0,1,0,100),100,100,45)
      vertex(i, v);
    }
    endShape();
  }
  pop();
}
