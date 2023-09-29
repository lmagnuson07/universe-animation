const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const fov = 150;
const speed = 4;
const sizeIncrement = 0.005;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let dots = [];
let windowHalfWidth = (innerWidth / 2);
let windowHalfHeight = (innerHeight / 2);

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
        this.x2d = (this.x * this.scale) + windowHalfWidth;
        this.y2d = (this.y * this.scale) + windowHalfHeight;
        this.width += ((this.scale * 0.5) * (sizeIncrement * speed));
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fillRect(this.x2d, this.y2d, this.width, this.width);
        //------------- Debugging ---------------//
        // console.log(this.scale)

        return this;
    }
    update() {
        this.z -= speed;
        this.alpha += Math.random() * (0.002 * speed);
        if (this.z < -fov) {
            this.z += (innerWidth+innerHeight)/2;
            this.width = Math.random() * 2;
            this.alpha = 0;
        }
        return this;
    }
}

function setSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    windowHalfWidth = (innerWidth / 2);
    windowHalfHeight = (innerHeight / 2);
    initDots();
    ctx.fillStyle = '#ffffff';
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
function initDots() {
    dots = [];
    let dotsCount = (innerWidth+innerHeight)/20;
    let x, y, z;
    for (let i = 0; i < dotsCount; i++) {
        // Example: (0.58323 * 1920) - (1920/2)
        //                      1119 - 960
        //                         = 159 (result can be negative or positive)
        x = (Math.random()*innerWidth) - windowHalfWidth;
        // Example: (0.8136 * 1080) - (1080/2)
        //                      878 - 540
        //                         = 338 (result can be negative or positive)
        y = (Math.random()*innerHeight) - windowHalfHeight;
        // Example: (0.34284 * 1920) - (1920/2)
        //                      658 - 960
        //                         = -301 (result can be negative or positive)
        z = (Math.random()*innerWidth) - windowHalfWidth;
        dots.push(new Dot(x, y, z));

        //------------- Debugging ---------------//
        console.log(`x: ${x}, y: ${y}, z: ${z}`);
    }
}

(function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
        dots[i]
            .update()
            .draw()
        ;

    }
    requestAnimationFrame(render);
})();

//------------- Initialization ---------------//
setSize();
addEventListener('resize', setSize);
