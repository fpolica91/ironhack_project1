class FinalPlatform extends PlatForm {
    constructor(x, y, color) {
        super(x, y, color);
        this.width = 450
        this.height = 30
    }
}

const final = new FinalPlatform(350, 50, 'green')

export default platform;