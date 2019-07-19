
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')


canvas.style.display = "none"

function startGame() {
    canvas.style.display = "block"
    let begin = document.querySelector('.begin')
    setTimeout(() => {
        begin.style.display = 'none'
    }, 400)

}


// restart the game

function restart() {
    location.reload()

}


// CREATES GAME OBJECT 

class Game {
    constructor() {
        this.platforms = []
        this.score = 0
        this.coins = []
        this.enemies = []
        this.lose = false;

    }

}

const game1 = new Game()

// CREATES THE PLATFORMS

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
// END OF MOVING PLATFORM











let x = 0

// CORDINATES TO PLACE BOTH PLATFORM AND COINS//
const xCord = [100, 200, 300, 400, 350, 220, 100]
const yCord = [830, 750, 670, 590, 350, 270, 190]
// END OF CORDINATES


// CREATES STATIC RED PLATFORMS 
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
// END OF STATIC RED PLATFORM CREATING

// CREATES THE BLACK BULLET
class Enemy {
    constructor(x, y, dx) {
        this.x = canvas.width
        this.y = y
        this.width = 50
        this.height = 50
        this.img = "./img/bullet.png"
        this.dx = dx
    }
    drawEnemy() {
        const enemy = new Image()
        enemy.src = this.img
        ctx.drawImage(enemy, this.x, this.y, this.width, this.height)
    }

    moveEnemy() {
        this.x += -this.dx
        if (this.x + this.width <= 0) {
            this.x = canvas.width + this.width
        }
    }
}
// END OF BLACK BULLET 




// CREATES SHARK

class Shark {
    constructor(x, y, dx) {
        this.x = x
        this.y = y
        this.width = 200
        this.height = 120
        this.dx = dx
        this.img = "./img/shark.png"
    }
    createShark() {
        const shark = new Image()
        shark.src = this.img
        ctx.drawImage(shark, this.x, this.y, this.width, this.height)
    }
    moveShark() {
        this.x += this.dx
        if (this.x > canvas.width) {
            this.x = 0 - this.width
            let min = Math.ceil(500)
            let max = Math.floor(700)
            this.y = Math.floor(Math.random() * (max - min)) + min;
        }

    }
}

const fish = new Shark(0, 700, 3)

// END OF SHARK

// SEAGULL


class SeaGull extends Shark {
    constructor(x, y, dx) {
        super(x, y, dx)
        this.img = "./img/seagull.png"
        this.width = 100
        this.height = 90
    }
    randomizeYAxis(max, min) {
        max = Math.floor(max)
        min = Math.ceil(min)
        this.y = Math.floor(Math.random() * (max - min)) + min;
    }

    moveSeaGull() {
        this.x += this.dx
        if (this.x > canvas.width) {
            this.x = 0 - this.width
            this.randomizeYAxis(50, 400)
            console.log(this.y)
        }
    }
}

const seagull = new SeaGull(0, 250, 3)


// END OF SEAFULL

let enem = 0

function renderEnemies() {
    enem++

    bullet1 = new Enemy(canvas.width, 100, 3)
    bullet4 = new Enemy(canvas.width, 250, 6)

    if (enem <= 10) {
        game1.enemies = []
        game1.enemies.push(bullet1, bullet4)
    }
    for (let i = 0; i < game1.enemies.length; i++) {
        game1.enemies[i].drawEnemy()
        game1.enemies[i].moveEnemy()
        bulletColission(game1.enemies[i])
    }


    seagull.createShark()
    seagull.moveSeaGull()
    fish.createShark()
    fish.moveShark()
    bulletColission(fish)
    bulletColission(seagull)
}



// THE MAIN CHARACTER IS A BLACK CIRCLE 

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
        ctx.fillStyle = "white"
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
// END OF MAIN CHARACTER CLASS 



// CREATES THE GOLD COINS

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
// END OF THE GOLD COINS 



// CREATES STAR ON GREEN PLATFORM
class Star extends Coin {
    constructor(x, y) {
        super(x, y)
        this.img = "./img/star.png"
    }

}
// END OF STAR CLASS


let i = 0



// THIS FUNCTION RENDER ALL THE STARS AT THE GIVEN X & Y CORDINATES, 
function createGameCoins() {
    const height = 30
    const width = 30
    i++;
    coin1 = new Coin(xCord[0] + width, yCord[0] - height)
    coin2 = new Coin(xCord[1] + width, yCord[1] - height)
    coin3 = new Coin(xCord[2] + width, yCord[2] - height)
    coin4 = new Coin(xCord[3] + width, yCord[3] - height)
    coin5 = new Coin(xCord[4] + width, yCord[4] - height)
    coin6 = new Coin(xCord[5] + width, yCord[5] - height)
    coin7 = new Coin(xCord[6] + width, yCord[6] - height)
    star = new Star(450, 30)
    if (i <= 10) {
        game1.coins = []
        game1.coins.push(coin1, coin2, coin3, coin4, coin5, coin6, coin7, star)
    }
    game1.coins.forEach(coin => {

        coin.renderCoin()

        if (collectCoin(coin)) {
            // REMOVES ONLY THE COIN AT THE GIVEN INDEX
            game1.coins.splice(game1.coins.indexOf(coin), 1)
        }
    })
    // IF THE COIN ARRAY IS EMPTY THEN CALL THE WIN FUNCTION
    if (!game1.coins.length) {
        win()
    }
}


function win() {
    alert('Victory')
}





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






// CREATES THE CIRCLE 
const theBall = new Circle(40, canvas.height, 15)
// END OF CREATES CIRCLE


// CREATES MOVING PLATFORM

const movingPlat = new MovingPlatForm(200, 450)

// END OF MOVING PLATFORM




// COLSSION DETECTION FOR STATIC PLATFORMS 

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

// COLISSION DETECTION FOR MOVING PLATFORM

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


// COLISSION DETECTION FOR MOVING COIN
function collectCoin(coin) {
    if (coin.x < theBall.x + theBall.r &&
        coin.x + coin.width > theBall.x &&
        coin.y < theBall.y + theBall.r &&
        coin.y + coin.height > theBall.y) {
        return true;
    }
}

// COLISSION DETECTION FOR BULLET
function bulletColission(bullet) {
    if (bullet.x < theBall.x + theBall.r &&
        bullet.x + bullet.width > theBall.x &&
        bullet.y < theBall.y + theBall.r &&
        bullet.y + bullet.height > theBall.y) {
        gameOver()
    }
}


// GAME OVER FUNCTION
function gameOver() {
    ctx.font = "50px Arial"
    ctx.fillText("Game Over", 120, 300)
    cancelAnimationFrame()
}




let requestID;

function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // CREATING ALL ELELEMNTS
    theBall.createBall()
    theBall.moveTheBall()


    createGameCoins()
    renderingGameElements()
    final.createPlatform()




    renderEnemies()

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
    detectIntersection(final)
    movingColission(movingPlat)




    // END OF COLISSION DETECTION
    requestID = requestAnimationFrame(drawLoop)
}



drawLoop()


