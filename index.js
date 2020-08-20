const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = (canvas.width = 320);
const height = (canvas.height = 480);
const boxwidth = 30;
const boxheight = 40;
const gravity = 0.1;

// canvas centered in window
canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

// must name this box https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const box = {
    x: ((width / 2) - (boxwidth / 2)), 
    y: ((height / 2) - (boxwidth /2 )),
    w: boxwidth,
    h: boxheight,
    vel: { x: 0, y: 0},
    color: "purple"
};

// context is like the 'pen' on the canvas.
context.fillStyle = box.color;
context.fillRect(box.x, box.y, box.w, box.h);

// 'request animation frame' works to create a function that repeates itself over time. 
function update() {
    context.clearRect(0, 0, width, height);
    // velocity has magnitude and direction. We always need this to update the x and y axis with velocity.
    box.vel.y += gravity;
    box.y += box.vel.y;
    box.x += box.vel.x;

    if (box.x + box.w > width || box.x < 0) {
      box.vel.x *= -1;
    }
    
    if (box.y + box.h > height) {
      box.y = height - box.h;
      box.vel.y *= -1;
    }

    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.w, box.h);

    requestAnimationFrame(update);
} 

document.body.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
      box.vel.x = -1;
  } else if (e.keyCode === 39) {
      box.vel.x = 1;
  }
});

update();