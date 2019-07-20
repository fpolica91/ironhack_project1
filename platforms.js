


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
        this.movingUp = true
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
    movePlatformUp() {
        if (this.y + this.height > 0 && this.movingUp) {
            this.y -= 1.5;
        } else if (this.y < 0) {
            this.movingUp = false;
            this.y += 1.5
        } else {
            this.y += 1.5
            if (this.y >= canvas.height) {
                this.movingUp = true
                this.y -= 1.5
            }
        }
    }
}


// CREATES PLATFORMS

const xCord = [100, 200, 300, 400, 350, 220, 100, 900, 800, 700, 700, 850]
const yCord = [830, 750, 670, 590, 350, 270, 190, 800, 700, 600, 350, 220]

const movingPlat = new MovingPlatForm(200, 450)
const elevatorPlatform = new MovingPlatForm(700, 350)
const platform1 = new PlatForm(xCord[0], yCord[0], "red")
const platform2 = new PlatForm(xCord[1], yCord[1], "red")
const platform3 = new PlatForm(xCord[2], yCord[2], "red")
const platform4 = new PlatForm(xCord[3], yCord[3], "red")
const platform5 = new PlatForm(xCord[4], yCord[4], "red")
const platform6 = new PlatForm(xCord[5], yCord[5], "red")
const platform7 = new PlatForm(xCord[6], yCord[6], "red")
const rightPlatform1 = new PlatForm(xCord[7], yCord[7], "aqua")
const rightPlatform2 = new PlatForm(xCord[8], yCord[8], "aqua")
const rightPlatform3 = new PlatForm(xCord[9], yCord[9], "purple")
const rightPlatform4 = new PlatForm(xCord[10], yCord[10], "gold")
const rightPlatform5 = new PlatForm(xCord[11], yCord[11], "darkblue")
const final = new FinalPlatform(250, 60, 'green')

game1.platforms.push(platform1, platform2,
    platform3, platform4,
    platform5, platform6, platform7,
    rightPlatform1, rightPlatform2,
    rightPlatform3, rightPlatform4,
    rightPlatform5, final)

// END OF PLATFORM CREATION


function renderingGameElements() {
    game1.platforms.forEach(platform => {
        platform.createPlatform()
    })

    movingPlat.createPlatform()
    elevatorPlatform.createPlatform()
    movingPlat.movePlatForm()
    elevatorPlatform.movePlatformUp()


}



// END OF MOVING PLATFORM