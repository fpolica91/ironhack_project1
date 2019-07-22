
// GOLD COINS
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

// CREATES COINS AND PUSHES THEM INTO ARRAY
const height = 30
const width = 30
const coin1 = new Coin(xCord[0] + width, yCord[0] - height)
const coin2 = new Coin(xCord[1] + width, yCord[1] - height)
const coin3 = new Coin(xCord[2] + width, yCord[2] - height)
const coin4 = new Coin(xCord[3] + width, yCord[3] - height)
const coin5 = new Coin(xCord[4] + width, yCord[4] - height)
const coin6 = new Coin(xCord[5] + width, yCord[5] - height)
const coin7 = new Coin(xCord[6] + width, yCord[6] - height)
const coin8 = new Coin(xCord[8] + width, yCord[8] - height)
const coin9 = new Coin(xCord[9] + width, yCord[9] - height)
const coin10 = new Coin(xCord[10] + width, yCord[10] - height)
const coin11 = new Coin(xCord[11] + width, yCord[11] - height)
const star = new Star(450, 30)
const star2 = new Star(920, 770)
game1.coins.push(coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9, coin10, coin11, star, star2)
// END OF COINS ARRAY


// RENDERS THE COINS AND THE STAR, ALSO PUSHES IT TO GAME.STARS

let coinCollect = new Audio('./sound/coin.wav')

function createGameCoins() {

    game1.coins.forEach(coin => {
        coin.renderCoin()
        if (collectCoin(coin)) {
            coinCollect.play()
            game1.coins.splice(game1.coins.indexOf(coin), 1)
        }
    })

    if (!game1.coins.length) {
        success()
    }
}

let winSound = new Audio('./sound/cheers.wav');

function success() {
    game1.won = true;
    winSound.play()
}

// END OF RENDERCOINS
