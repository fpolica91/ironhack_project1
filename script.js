
const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
canvas.style.display = "none"



function startGame() {
    canvas.style.display = "block"
    let begin = $('.jumbotron')
    begin.hide(3000)
    $('.restart').fadeOut(1000)
}

// RESTARTS GAME

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
        this.won = false;
        this.lost = false;

    }

}

const game1 = new Game()

// ****-------------------------*//////




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

// THIS SECTION CREATES CONTROLS

document.onkeydown = (e) => {
    console.log(e.keyCode)
    let num = -.05
    if (e.keyCode === 38) {
        theBall.accerlerate(num)

    } else if (e.keyCode === 39) {
        theBall.moveAcross()
    } else if (e.keyCode === 37) {
        theBall.moveBack()
    } else if (e.keyCode === 65) {
        theBall.x += 20
        theBall.accerlerate(-.02)

    } else if (e.keyCode === 68) {
        theBall.x -= 20
        theBall.accerlerate(-.02)
    }

}

document.onkeyup = function () {
    let num = .5;
    theBall.accerlerate(num)
}

// END OF CONTROLS


const theBall = new Circle(40, canvas.height, 15)

let sound = new Audio("./sound/sound.wav");


// GAME OVER FUNCTION
function gameOver() {
    game1.lost = true;
    sound.play()
    $('.restart').show(5000)
}






