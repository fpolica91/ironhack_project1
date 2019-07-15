
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')


// CREATES GAME OBJECT 

class Game {
    constructor() {
        this.platforms = []
        this.score = 0
    }
}

const game1 = new Game()

// CREATES THE PLATFORMS

class PlatForm {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 200
        this.height = 30
    }
    createPlatform() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, 100, 20)
    }
}




// function renderingGameElements() {
//     platform1 = new PlatForm(canvas.width / 2, canvas.height / 2)
//     platform2 = new PlatForm(canvas.width / 3, 330)
//     platform3 = new PlatForm(100, 400)
//     platform4 = new PlatForm(350, 180)


//     game1.platforms.push(platform1, platform2, platform3, platform4)
//     game1.platforms.forEach(platform => {
//         platform.createPlatform()
//         detectIntersection(platform)

//     })
// }






class Circle {
    constructor(x, y, r) {
        this.jumping = false;
        this.x = x
        this.y = y
        this.r = r
        this.speedY = 0
        this.gravity = .05
        this.gravitySpeed = 0
        this.bottom = canvas.height - this.r

    }
    createBall() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = "blue"
        ctx.fill()
    }

    moveTheBall() {
        this.gravitySpeed += this.gravity
        this.y += this.speedY + this.gravitySpeed
        this.hitBottom()

    }
    hitBottom() {
        if (this.y > this.bottom) {
            this.y = this.bottom
            this.gravitySpeed = 0
        }



    }
    accerlerate(n) {
        this.gravity = n
    }
    moveAcross() {
        this.x += 10
    }
    moveBack() {
        this.x -= 10;
    }

}


// THIS SECTION CREATES CONTROLS

document.onkeydown = (e) => {
    let num = -.2
    if (e.keyCode === 38) {
        theBall.accerlerate(num)

    } else if (e.keyCode === 39) {
        theBall.moveAcross()
    } else if (e.keyCode === 37) {
        theBall.moveBack()
    }

}

document.onkeyup = function () {
    let num = .2;
    theBall.accerlerate(num)
}

// END OF CONTROLS


//COLISSION DETECTION
const theBall = new Circle(40, canvas.height, 10)
const platform = new PlatForm(250, 250)


function detectIntersection(platform) {
    if (platform.x < theBall.x + theBall.r &&
        platform.x + platform.width > theBall.x &&
        platform.y < theBall.y + theBall.r &&
        platform.y + platform.height > theBall.y) {
        theBall.y = platform.y - theBall.r
        theBall.gravitySpeed = 0
    } else {
        console.log('fall')
        theBall.gravitySpeed += theBall.gravity
    }
}




//END OF COLISSION DETECTION




function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    theBall.createBall()
    theBall.moveTheBall()
    theBall.moveTheBall()
    // renderingGameElements()
    platform.createPlatform()
    detectIntersection(platform)


    requestAnimationFrame(drawLoop)
}

drawLoop()

