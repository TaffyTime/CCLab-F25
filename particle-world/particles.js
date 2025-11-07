class Particle {
    // constructor function
    constructor(startX, startY) {
        // properties (variables): particle's characteristics
        this.x = startX;
        this.y = startY;
        this.x0 = startX;
        this.y0 = startY;
        this.angle = 0;
        this.speedA = 0.1;
    }
    // methods (functions): particle's behaviors
    update() {
        // (add) 
        this.y = this.y0 + 50 * sin(2 * frameCount * 0.1);
        this.x = this.x0 + 50 * cos(frameCount * 0.1)
        this.angle = this.angle + this.speedA;
        if (mouseIsPressed) {
            this.speedA = -this.speedA;
        }
    }
    display() {
        // particle's appearance
        push();
        translate(this.x, this.y);

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
        // push()
        // translate(-20, -20)
        // fill(100)
        // circle(10 * cos(-frameCount * 0.1), 10 * sin(-frameCount * 0.1), 10)
        // pop()

        //left pupil
        push()
        translate(-20, -20);
        rotate(this.angle);
        fill(100)
        circle(10, 0, 10)
        pop();

        //right pupil
        push()
        translate(20, -20);
        rotate(-this.angle);
        fill(100)
        circle(10, 0, 10)
        pop();


        // //right pupil
        // push()
        // translate(20, -20)
        // fill(100)
        // circle(10 * cos(frameCount * 0.1), 10 * sin(frameCount * 0.1), 10)
        // pop()

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


        //circle(0, 0, this.dia)


        pop();
    }
}
