
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')


// CREATES GAME OBJECT 

class Game {
    constructor() {
        this.platforms = []
        this.score = 0
        this.coins = []
    }
}

const game1 = new Game()

// CREATES THE PLATFORMS

class PlatForm {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 20
    }
    createPlatform() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
// END OF MOVING PLATFORM



let x = 0

function renderingGameElements() {

    x++;
    // CREATES THE PLATFORMS
    platform1 = new PlatForm(100, 600)
    platform2 = new PlatForm(180, 530)
    platform3 = new PlatForm(250, 470)
    platform4 = new PlatForm(330, 400)
    platform5 = new PlatForm(230, 180)
    platform6 = new PlatForm(150, 130)
    platform7 = new PlatForm(70, 80)
    // END OF CREATING PLATFORMS

    // ITERATES OVER PLATFORMS AND CALLS RENDER FUNCTION
    if (x <= 10) {
        game1.platforms.push(platform1, platform2, platform3, platform4, platform5, platform6, platform7)
    }

    game1.platforms.forEach(platform => {
        platform.createPlatform()
    })
    // END OF PLATFORM ITERATION
}






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



// COIN CLASS E

class Coin {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.img = "./coin/coin.png"
        this.width = 30
        this.height = 30
    }
    renderCoin() {
        const coin = new Image()
        coin.src = this.img
        ctx.drawImage(coin, this.x, this.y, this.width, this.height)
    }

}


let i = 0


function createGameCoins() {
    i++;
    coin1 = new Coin((120), (600 - 27))
    coin2 = new Coin((200), (530 - 27))
    coin3 = new Coin(280, (470 - 27))
    coin4 = new Coin(350, (400 - 27))
    if (i <= 10) {
        game1.coins.push(coin1, coin2, coin3, coin4)
    }
    game1.coins.forEach(coin => {
        coin.renderCoin()
        if (collectCoin(coin)) {
            coin.img = null;
        }
    })
}






// END OF COIN CLASS

// THIS SECTION CREATES CONTROLS

document.onkeydown = (e) => {
    let num = -.05
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



// CREATES THE CIRCLE 
const theBall = new Circle(40, canvas.height, 15)
// END OF CREATES CIRCLE


// CREATES MOVING PLATOFORM

const movingPlat = new MovingPlatForm(200, 330)

// END OF MOVING PLATFORM

// CREATES COINS




function detectIntersection(platform) {
    if (platform.x < theBall.x + theBall.r &&
        platform.x + platform.width > theBall.x &&
        platform.y < theBall.y + theBall.r &&
        platform.y + platform.height > theBall.y) {
        theBall.y = platform.y - theBall.r
        theBall.gravitySpeed = 0
    } else {

        theBall.gravitySpeed += theBall.gravity
    }
}

function movingColission(platform) {
    if (platform.x < theBall.x + theBall.r &&
        platform.x + platform.width > theBall.x &&
        platform.y < theBall.y + theBall.r &&
        platform.y + platform.height > theBall.y) {
        theBall.y = platform.y - theBall.r
        theBall.x = (platform.x + platform.width / 2)
        theBall.gravitySpeed = 0

    } else {
        theBall.gravitySpeed += theBall.gravity
    }
}

function collectCoin(coin) {
    if (coin.x < theBall.x + theBall.r &&
        coin.x + coin.width > theBall.x &&
        coin.y < theBall.y + theBall.r &&
        coin.y + coin.height > theBall.y) {
        return true;
    }
}




//END OF COLISSION DETECTION




function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // CREATING ALL ELELEMNTS
    theBall.createBall()
    theBall.moveTheBall()
    theBall.moveTheBall()
    createGameCoins()
    renderingGameElements()
    // END OF CREATING ELEMENTS

    // CREATES MOVING BLACK PLATFORM
    movingPlat.createPlatform()
    movingPlat.movePlatForm()
    // END OF BLACK PLATFORM

    // DETECTS COLISSION
    detectIntersection(platform1)
    detectIntersection(platform2)
    detectIntersection(platform3)
    detectIntersection(platform4)
    detectIntersection(platform5)
    detectIntersection(platform6)
    detectIntersection(platform7)
    movingColission(movingPlat)




    // END OF COLISSION DETECTION


    requestAnimationFrame(drawLoop)
}

drawLoop()

