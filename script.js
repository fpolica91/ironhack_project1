
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
canvas.style.display = "none"



function startGame() {
    canvas.style.display = "block"
    let begin = document.querySelector('.jumbotron')
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

// PLATFORM USED TO BE HERE

// MOVED TO PLATFORM.JS




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




let i = 0

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






// DRAWLOOP USED TO BE HERE NOW MOVED TO NEW FILE


