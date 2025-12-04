let bubbles = [];
let LIFESPAN = 3000; // Lifespan in milliseconds (3 seconds)

function setup() {
  createCanvas(400, 400);
  // Add an initial bubble for demonstration
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(220);

  // Loop backwards when splicing to avoid skipping elements
  for (let i = bubbles.length - 1; i >= 0; i--) {
    let bubble = bubbles[i];
    bubble.update();
    bubble.display();

    // Check if the bubble's lifespan is over
    if (bubble.isDead()) {
      bubbles.splice(i, 1); // Remove 1 element at index i
    }
  }
}

// Function to add new bubbles on mouse press
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

// Bubble Class Definition
class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.birthTime = millis(); // Record the creation time
  }

  update() {
    this.y -= 1; // Example animation: move up
  }

  display() {
    fill(100, 100, 255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  isDead() {
    // Check if current time minus birth time exceeds the lifespan
    return millis() - this.birthTime > LIFESPAN;
  }
}