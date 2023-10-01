import config from "../config.js";
import colors from "../colors.js";

class DistantGalaxy {
    constructor(universe, x, y, z) {
        this.x = x;
        this.y = y;
        this.universe = universe;
        this.scale = 0;
        this.z = z;
        this.x2d = 0;
        this.y2d = 0;
        this.height = Math.random() * 0.05;
        this.width = Math.random() * 0.5;
        this.maxWidth = Math.random() * 5 + 4;
        this.maxHeight = Math.random() + 0.5;
        this.newSize = this.maxWidth * (Math.random() * 0.6 + 0.4);
        this.sizeIncrement = Math.random() * 0.0025 + 0.00075;
        this.movementIncrement = 0.025;
        this.randomColor = null;
        this.rotationValue = Math.random() * Math.PI * 2;
        this.speedModifier = (Math.random() * (1 - 0.05)) + 0.05;
    }
    draw() {
        this.scale = (config.fov*1.1) / ((config.fov*1.1) + this.z);
        this.x2d = (this.x * (this.scale * 1.75)) + this.universe.windowHalfWidth;
        this.y2d = (this.y * (this.scale * 1.75)) + this.universe.windowHalfHeight;

        // Draw the oval
        let [r, g, b] = this.randomColor;
        this.universe.ctx.beginPath();
        this.universe.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        this.universe.ctx.ellipse(this.x2d, this.y2d, this.width, this.height, this.rotationValue, 0, 2 * Math.PI);
        this.universe.ctx.shadowColor = `rgb(255,255,255)`;
        this.universe.ctx.shadowBlur = this.width + this.height;
        this.universe.ctx.fill();

        this.universe.ctx.shadowColor = 'transparent';
        this.universe.ctx.shadowBlur = 0;

        return this;
    }
    update() {
        let speed = config.speed * this.movementIncrement;
        this.z -= speed * this.speedModifier;
        this.movementIncrement *= 1.00075;
        if (this.width < this.maxWidth) this.width += (this.sizeIncrement*speed);
        if (this.height < this.maxHeight) this.height += ((this.sizeIncrement*0.25)*speed);
        if (this.z < -config.fov) {
            this.y = (Math.random()*this.universe.height) - (this.universe.height*0.5);
            this.z = (Math.random()*this.universe.width) - (this.universe.width*0.5);
            this.x = (Math.random()*this.universe.width) - (this.universe.width*0.5);
            this.height = Math.random() * 0.25;
            this.width = Math.random() * 0.25;
            this.rotationValue = Math.random() * Math.PI * 2;
            this.setRandomColor();
            this.movementIncrement = 0.025;
        }
        return this;
    }
    setRandomColor() {
        const keys = Object.keys(colors.galaxies);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomColorKey = keys[randomIndex];
        this.randomColor = colors.galaxies[randomColorKey];
    }
}
export default DistantGalaxy;