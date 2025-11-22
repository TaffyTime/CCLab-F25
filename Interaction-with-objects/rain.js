class Rain {
    constructor(x, y, h) {
        this.x = x + random(-20, 20)
        this.y = y
        this.speedY = 10
        this.h = h
    }
    display() {
        strokeWeight(5)
        stroke(this.h, 20, 100)
        line(this.x, this.y, this.x, this.y + 5)
    }
    update() {
        this.y = this.y + this.speedY
    }
    isOut() {
        if (this.y > height + 10) {
            return true
        } else { return false }
    }
}
