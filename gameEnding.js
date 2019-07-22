


class Win {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = "./img/victory.png"
    }
    drawWin() {
        const win = new Image()
        win.src = this.img

        ctx.drawImage(win, this.x, this.y, this.width, this.height)
    }
}

const allIdoIsWin = new Win()


function displayWinningImage() {
    allIdoIsWin.drawWin()
    $('.board').fadeOut(5000)
    $('.restart').fadeIn(6000)
}

class Lose extends Win {
    constructor() {
        super()
        this.img = "./img/gameOver.png"

    }

}

const Ilost = new Lose()


function lostImage() {
    Ilost.drawWin()
    $('.board').fadeOut(4000)
}