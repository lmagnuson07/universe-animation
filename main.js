// External global variables
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const fov = 150;
const speed = 4;
const sizeIncrement = 0.005;

class Universe {
    constructor(width, height) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dots = [];
        this.dotsCount = (innerWidth+innerHeight)/20;
        this.width = width;
        this.height = height;
        this.windowHalfWidth = this.width*0.5;
        this.windowHalfHeight = this.height*0.5;
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
            x = (Math.random()*innerWidth) - this.windowHalfWidth;
            // Example: (0.8136 * 1080) - (1080/2)
            //                      878 - 540
            //                         = 338 (result can be negative or positive)
            y = (Math.random()*innerHeight) - this.windowHalfHeight;
            // Example: (0.34284 * 1920) - (1920/2)
            //                      658 - 960
            //                         = -301 (result can be negative or positive)
            z = (Math.random()*innerWidth) - this.windowHalfWidth;
            this.dots.push(new Dot(x, y, z));

            //------------- Debugging ---------------//
            console.log(`x: ${x}, y: ${y}, z: ${z}`);
        }
    }
    setSize() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.windowHalfWidth = (this.width*0.5);
        this.windowHalfHeight = (this.height*0.5);
        this.initDots();
        this.ctx.fillStyle = '#ffffff';
        /*if (innerWidth < 800) {
            ctx.globalAlpha = Math.random() * 0.3;
        } else {
            ctx.globalAlpha = Math.random() * 0.8;
        }*/
    }
}
const universe = new Universe(innerWidth, innerHeight);

class Dot {
    constructor(x, y, z) {
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
        this.scale = fov / (fov + this.z);
        // Adding (innerWidth/2) or (innerHeight/2) ensures that x2d and y2d are always relative to the canvas
        // and initially positive on the first draw
        // (since we used (innerWidth/2) and (innerHeight/2) to initialize the x and y values)
        this.x2d = (this.x * this.scale) + universe.windowHalfWidth;
        this.y2d = (this.y * this.scale) + universe.windowHalfHeight;
        this.width += ((this.scale * 0.5) * (sizeIncrement * speed));
        universe.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        universe.ctx.fillRect(this.x2d, this.y2d, this.width, this.width);
        //------------- Debugging ---------------//
        // console.log(this.scale)

        return this;
    }
    update() {
        this.z -= speed;
        this.alpha += Math.random() * (0.002 * speed);
        if (this.z < -fov) {
            this.z += (innerWidth+innerHeight)*0.5;
            this.width = Math.random() * 2;
            this.alpha = 0;
        }
        return this;
    }
}

//------------- Rendering ---------------//
(function render() {
    universe.ctx.clearRect(0, 0, universe.canvas.width, universe.canvas.height);
    for (let i = 0; i < universe.dots.length; i++) {
        universe.dots[i]
            .update()
            .draw()
        ;

    }
    requestAnimationFrame(render);
})();

//------------- Initialization ---------------//
universe.setSize();
addEventListener('resize', universe.setSize);
