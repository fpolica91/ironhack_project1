


// CREATES STATIC RED PLATFORMS
class PlatForm {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 20
        this.color = color
    }
    createPlatform() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// END OF STATIC RED PLATFORMS


// FINAL PLATFORM EXTENDS PLATFORM

class FinalPlatform extends PlatForm {
    constructor(x, y, color) {
        super(x, y, color);
        this.width = 450
        this.height = 30
    }
}


// CREATES A MOVING PLATFORM, THIS PLATFORMS MOVES ACCROSS THE CANVAS


class MovingPlatForm {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 90
        this.height = 20
        this.dx = 2
        this.movingRight = true
    }
    createPlatform() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    movePlatForm() {
        if (this.x < canvas.width - this.width && this.movingRight === true) {
            this.x += this.dx;
        } else if (this.x + this.width >= canvas.width) {
            this.movingRight = false;
            this.x += -this.dx;
        } else {
            this.x += -this.dx;
            if (this.x < 0) {
                this.movingRight = true;
            }
        }
    }
}
const movingPlat = new MovingPlatForm(200, 450)

const xCord = [100, 200, 300, 400, 350, 220, 100]
const yCord = [830, 750, 670, 590, 350, 270, 190]


let x = 0

function renderingGameElements() {
    x++;

    // CREATES THE PLATFORMS
    platform1 = new PlatForm(xCord[0], yCord[0], "red")
    platform2 = new PlatForm(xCord[1], yCord[1], "red")
    platform3 = new PlatForm(xCord[2], yCord[2], "red")
    platform4 = new PlatForm(xCord[3], yCord[3], "red")
    platform5 = new PlatForm(xCord[4], yCord[4], "red")
    platform6 = new PlatForm(xCord[5], yCord[5], "red")
    platform7 = new PlatForm(xCord[6], yCord[6], "red")
    final = new FinalPlatform(250, 60, 'green')

    // END OF CREATING PLATFORMS

    // ITERATES OVER PLATFORMS AND CALLS RENDER FUNCTION
    if (x <= 10) {
        game1.platforms = []
        game1.platforms.push(platform1, platform2, platform3, platform4, platform5, platform6, platform7, final)

    }

    game1.platforms.forEach(platform => {
        platform.createPlatform()
    })

}



// END OF MOVING PLATFORM