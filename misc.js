class Misc {
    constructor(img, x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = img
        this.rain = false;
        this.lights = false;

    }
    drawMisc() {
        let misc = new Image()
        misc.src = this.img
        ctx.drawImage(misc, this.x, this.y, this.width, this.height)
    }
    moveMisc() {
        this.y += 4
        if (this.y + this.width > canvas.height) {
            this.y = 0 - this.width
            this.x = Math.floor(Math.random() * canvas.width - this.width)
        }
    }

}





const spongeBob = new Misc("./img/spongbob.png", canvas.width / 2, 825, 100, 80)
const thePebble = new Misc("./img/pebble.png", canvas.width / 2, 100, 60, 60)
const flashLight = new Misc('./img/lightbulb.png', 1000, 870, 40, 40)

ctx.font = "15px Arial"
let text = "WATCH OUT!!!!"

// CREATES BUBBLE

function drawBubble(ctx, x, y, w, h, radius, text) {
    let r = x + w;
    let b = y + h;

    ctx.beginPath();
    ctx.fillStyle = "white";

    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";
    ctx.moveTo(x + radius, y);

    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.fillText(text, x + 20, y + 30);
}


let shot = new Audio('./sound/shot.flac')





function decideIfMessage() {
    if (collectCoin(spongeBob)) {
        drawBubble(ctx, spongeBob.x, spongeBob.y - 50, ctx.measureText(text).width + 40, 50, 20, text)
        spongeBob.rain = true;

    }
    if (spongeBob.rain) {
        thePebble.drawMisc()
        thePebble.moveMisc()
        flashLight.drawMisc()
        canvas.style.opacity = 0.1
        if (collectCoin(flashLight)) {
            flashLight.lights = true;
        } if (flashLight.lights) {
            canvas.style.opacity = .5
        }

        if (collectCoin(thePebble)) {
            sound.play()
            gameOver()
        }
    }
}











