class Misc {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = "./img/spongbob.png"

    }
    drawMisc() {
        let misc = new Image()
        misc.src = this.img
        ctx.drawImage(misc, this.x, this.y, this.width, this.height)
    }

}





const spongeBob = new Misc(canvas.width / 2, 825, 100, 80)
// ctx.fillText("Help Me,I have been here for years!", spongeBob.x, spongeBob.y - 20)

ctx.font = "15px Arial"
let text = "Beware of the shark!!"

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





function decideIfMessage() {
    if (collectCoin(spongeBob)) {
        drawBubble(ctx, spongeBob.x, spongeBob.y - 50, ctx.measureText(text).width + 40, 50, 20, text)
    }
}











