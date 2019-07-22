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

const fish = new Shark(0, 700, 1)

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

const seagull = new SeaGull(0, 250, 1)


// END OF SEAFULL




const bullet1 = new Enemy(canvas.width, 100, 1)
const bullet4 = new Enemy(canvas.width, 250, 1)
game1.enemies.push(bullet1, bullet4)

function renderEnemies() {
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
