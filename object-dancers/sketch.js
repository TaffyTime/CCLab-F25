/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new PumpkinMan(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class PumpkinMan {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    //body 
    this.y = height / 2 + 50 * sin(2 * frameCount * 0.1);
    this.x = width / 2 + 50 * cos(frameCount * 0.1)
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️


    colorMode(HSB)
    //arms
    push()
    stroke(23, 88, 74)
    strokeWeight(5)
    //right side
    line(77, 0, 100, -50 * sin(frameCount * 0.1))
    //left side
    line(-77, 0, -100, 50 * sin(frameCount * 0.1))
    pop()

    //stem
    fill(30, 67, 40)
    beginShape()
    vertex(-10, -97 + 47)
    vertex(-7, -105 + 47)
    vertex(-10, -110 + 47)
    vertex(-7, -112 + 47)
    vertex(5, -105 + 47)
    vertex(10, -97 + 47)
    endShape()

    fill(23, 88, 74)

    //right side of pumpkin
    circle(30, 0, 95)
    circle(20, 0, 97)

    //left side of pumpkin
    circle(-30, 0, 95)
    circle(-20, 0, 97)

    //pumpkin
    circle(0, 0, 100)


    //expression
    //EyeBalls
    colorMode(HSB, 100)
    fill(0)
    circle(-20, -20, 30)
    circle(20, -20, 30)

    //left pupil
    push()
    translate(-20, -20)
    fill(100)
    circle(10 * cos(-frameCount * 0.1), 10 * sin(-frameCount * 0.1), 10)
    pop()

    //right pupil
    push()
    translate(20, -20)
    fill(100)
    circle(10 * cos(frameCount * 0.1), 10 * sin(frameCount * 0.1), 10)
    pop()

    //mouth
    // noFill()
    // strokeWeight(5)
    // let leftmouth = PI / 4;
    // let rightmouth = 3 * PI / 4;
    // arc(0, 0, 50, 50, leftmouth, rightmouth)

    //mouth

    fill(0)
    beginShape()
    vertex(0, 34 - 10)
    vertex(12, 26 - 10)
    vertex(18, 34 - 10)
    vertex(26, 22 - 10)
    vertex(32, 28 - 10)
    vertex(48, 14 - 10)
    vertex(32, 38 - 10)
    vertex(26, 34 - 10)
    vertex(20, 44 - 10)
    vertex(14, 42 - 10)
    vertex(0, 50 - 10)
    vertex(-14, 42 - 10)
    vertex(-20, 44 - 10)
    vertex(-26, 34 - 10)
    vertex(-32, 38 - 10)
    vertex(-48, 14 - 10)
    vertex(-32, 28 - 10)
    vertex(-26, 22 - 10)
    vertex(-18, 34 - 10)
    vertex(-12, 26 - 10)
    vertex(0, 34 - 10)
    endShape()




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()


    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/