//----------- Imports ---------------//
import Universe from './classes/Universe.js';

//------------- Setup ---------------//
let universe = new Universe(innerWidth, innerHeight, document.getElementById('canvas'));

//------------- Rendering ---------------//
(function render() {
    universe.ctx.clearRect(0, 0, universe.canvas.width, universe.canvas.height);
    for (let i = 0; i < universe.stars.length; i++) {
        universe.stars[i]
            .update()
            .draw()
        ;
    }
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
addEventListener('resize', function() {
    universe = new Universe(innerWidth, innerHeight, document.getElementById('canvas'));
    universe.setSize();
});

//------------- Debugging ---------------//
// console.log(universe.stars.length)