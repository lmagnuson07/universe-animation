import config from "../config.js";
import colors from "../colors.js";

class Star {
    constructor(universe, x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.universe = universe;
        this.scale = 0;
        this.x2d = 0;
        this.y2d = 0;
        this.height = 0.25;
        this.width = 0.25;
        this.maxWidth = 20;
        this.maxHeight = 20;
        this.newSize = this.maxWidth * (Math.random() * 0.6 + 0.4);
        this.sizeIncrement = Math.random() * 0.0025 + 0.00075;
        this.movementIncrement = 0.25;
        this.randomColor = null;
    }
    draw() {
        this.scale = (config.fov*1.05) / ((config.fov*1.05) + this.z);
        this.x2d = (this.x * (this.scale * 1.5)) + this.universe.windowHalfWidth;
        this.y2d = (this.y * (this.scale * 1.5)) + this.universe.windowHalfHeight;

        // The circle
        this.universe.ctx.beginPath();
        this.universe.ctx.fillStyle = this.createGradient(this.width, this.randomColor);
        this.universe.ctx.lineWidth = 2; // Updated this line
        this.universe.ctx.arc(this.x2d, this.y2d, this.width, 0, 2 * Math.PI);
        this.universe.ctx.fill();
        this.universe.ctx.closePath();

        // The cross
        this.universe.ctx.beginPath();
        this.universe.ctx.strokeStyle = this.createGradient(this.width * 2, this.randomColor);
        this.universe.ctx.moveTo(this.x2d - (this.width * 6), this.y2d);
        this.universe.ctx.lineTo(this.x2d + (this.width * 6), this.y2d);
        this.universe.ctx.moveTo(this.x2d, this.y2d - (this.height * 6));
        this.universe.ctx.lineTo(this.x2d, this.y2d + (this.height * 6));
        this.universe.ctx.stroke();

        return this;
    }
    update() {
        let speed = config.speed * this.movementIncrement;
        this.z -= speed * (Math.random() * 0.02 + 0.04);
        this.movementIncrement *= 1.0075;
        if (this.width < this.newSize) this.width += (this.sizeIncrement*speed);
        if (this.height < this.newSize) this.height += (this.sizeIncrement*speed);
        if (this.z < -config.fov) {
            this.z = (Math.random()*this.universe.width) - (this.universe.width*0.5);
            this.x = (Math.random()*this.universe.width) - (this.universe.width*0.5);
            this.y = (Math.random()*this.universe.height) - (this.universe.height*0.5);
            this.setRandomColor();
            this.width = 0.25;
            this.height = 0.25;
            this.movementIncrement = 0.25;
        }
        return this;
    }
    createGradient(radius, color) {
        const gradient = this.universe.ctx.createRadialGradient(
            this.x2d, this.y2d, 0, this.x2d, this.y2d, radius
        );
        const [r, g, b] = color.map(Number);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`); // Darker color at the center
        gradient.addColorStop(0.25, `rgba(${Math.floor(r*0.75)}, ${Math.floor(g*0.75)}, ${Math.floor(b*0.75)}, 0.4)`); // Fading color towards the edge
        gradient.addColorStop(0.5, `rgba(${Math.floor(r*0.5)}, ${Math.floor(g*0.5)}, ${Math.floor(b*0.5)}, 0.1)`); // Fading color towards the edge
        gradient.addColorStop(0.75, `rgba(${Math.floor(r*0.05)}, ${Math.floor(g*0.05)}, ${Math.floor(b*0.05)}, 0.05)`); // Fading color towards the edge
        gradient.addColorStop(1, 'transparent');
        return gradient;
    }
    setRandomColor() {
        const keys = Object.keys(colors.stars);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomColorKey = keys[randomIndex];
        this.randomColor = colors.stars[randomColorKey];
    }
}
export default Star;