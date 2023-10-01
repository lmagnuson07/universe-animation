import Dot from "./Dot.js";
import Star from "./Star.js";
import DistantGalaxy from "./DistantGalaxy.js";

class Universe {
    constructor(width, height, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dots = [];
        this.stars = [];
        this.distantGalaxies = [];
        this.dotsCount = (width+height)/20;
        this.starsCount = (width+height)/500 < 2 ? 2 : (width+height)/500;
        this.distantGalaxyCount = (width+height)/150 < 2 ? 2 : (width+height)/150;
        this.width = width;
        this.height = height;
        this.windowHalfWidth = this.width*0.5;
        this.windowHalfHeight = this.height*0.5;
    }
    setSize() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.windowHalfWidth = (this.width*0.5);
        this.windowHalfHeight = (this.height*0.5);
        this.initDots();
        this.initStars();
        this.initDistantGalaxies();
        // this.ctx.fillStyle = '#ffffff';
        /*if (innerWidth < 800) {
            ctx.globalAlpha = Math.random() * 0.3;
        } else {
            ctx.globalAlpha = Math.random() * 0.8;
        }*/
    }
    /**
     * Initializes the dots on the screen.
     * Function runs once when the page loads or is resized.
     *
     * @return {void} This function does not return anything.
     */
    initDots() {
        this.dots = [];
        let x, y, z;
        for (let i = 0; i < this.dotsCount; i++) {
            // Example: (0.58323 * 1920) - (1920/2)
            //                      1119 - 960
            //                         = 159 (result can be negative or positive)
            x = (Math.random()*this.width) - this.windowHalfWidth;
            // Example: (0.8136 * 1080) - (1080/2)
            //                      878 - 540
            //                         = 338 (result can be negative or positive)
            y = (Math.random()*this.height) - this.windowHalfHeight;
            // Example: (0.34284 * 1920) - (1920/2)
            //                      658 - 960
            //                         = -301 (result can be negative or positive)
            z = (Math.random()*this.width) - this.windowHalfWidth;
            this.dots.push(new Dot(this, x, y, z));

            //------------- Debugging ---------------//
            // console.log(`x: ${x}, y: ${y}, z: ${z}`);
        }
    }
    initStars() {
        this.stars = [];
        let x, y, z, star;
        for (let i = 0; i < this.starsCount; i++) {
            y = (Math.random()*this.height) - this.windowHalfHeight;
            x = (Math.random()*this.width) - this.windowHalfWidth;
            z = (Math.random()*this.width) - this.windowHalfWidth;
            star = new Star(this, x, y, z);
            star.setRandomColor();
            this.stars.push(star);

            //------------- Debugging ---------------//
            // console.log(`x: ${x}, y: ${y}, z: ${z}`);
        }
    }
    initDistantGalaxies() {
        this.distantGalaxies = [];
        let x, y, z, galaxy;
        for (let i = 0; i < this.distantGalaxyCount; i++) {
            x = (Math.random() * this.width) - (this.width * 0.75);
            y = (Math.random() * this.height) - (this.height * 0.75);
            z = (Math.random() * this.width) - (this.width * 0.75);
            galaxy = new DistantGalaxy(this, x, y, z);
            galaxy.setRandomColor();
            this.distantGalaxies.push(galaxy);
        }
    }
    /*getEdgeCoordinates(width, height) {
        // 0 = top, 1 = right, 2 = bottom, 3 = left
        const edge = Math.floor(Math.random() * 4);
        let x, y, min, max;

        switch (edge) {
            case 0:
                max = (height - 500)*0.5;
                x = (Math.random()*width) - (width*0.5);
                y = Math.random() * max;
                break;
            case 1:
                min = width - ((width - 500)*0.5)
                x = Math.random() * (width - min) + min;
                y = (Math.random()*height) - (height*0.5);
                break;
            case 2:
                min = height - ((height - 500)*0.5)
                x = (Math.random()*width) - (width*0.5);
                y = Math.random() * (height - min) + min;
                break;
            case 3:
                max = (width - 500)*0.5;
                x = Math.random() * max;
                y = (Math.random()*height) - (height*0.5);
                break;
        }
        return [x, y];
    }*/
}
export default Universe;