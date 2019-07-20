
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

let i = 0;


// RENDERS THE COINS AND THE STAR, ALSO PUSHES IT TO GAME.STARS
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
// END OF RENDERCOINS