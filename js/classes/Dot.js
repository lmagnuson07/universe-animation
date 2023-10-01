import config from "../config.js";
import colors from "../colors.js";

class Dot {
    constructor(universe, x, y, z) {
        this.universe = universe;
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = 0;
        this.x2d = 0;
        this.y2d = 0;
        this.width = Math.random() * 0.2;
        this.alpha = 0;
    }

    draw() {
        // This scales the dot as its z value increases each animation frame
        // Example: 150 / (150 + -784.30708) = -0.236593
        this.scale = config.fov / (config.fov + this.z);
        // Adding (innerWidth/2) or (innerHeight/2) ensures that x2d and y2d are always relative to the canvas
        // and initially positive on the first draw
        // (since we used (innerWidth/2) and (innerHeight/2) to initialize the x and y values)
        this.x2d = (this.x * this.scale) + this.universe.windowHalfWidth;
        this.y2d = (this.y * this.scale) + this.universe.windowHalfHeight;
        this.width += ((this.scale * 0.5) * (config.sizeIncrement * config.speed));

        const [r, g, b] = colors.stars.rgbWhite.map(Number);
        this.universe.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
        this.universe.ctx.fillRect(this.x2d, this.y2d, this.width, this.width);
        //------------- Debugging ---------------//
        // console.log(this.scale)

        return this;
    }
    update() {
        this.z -= config.speed;
        this.alpha += Math.random() * (0.002 * config.speed);
        if (this.z < -config.fov) {
            this.z += (innerWidth+innerHeight)*0.5;
            this.width = Math.random() * 2;
            this.alpha = 0;
        }
        return this;
    }
}
export default Dot;