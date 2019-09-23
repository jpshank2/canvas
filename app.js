var canvas = document.querySelector("canvas");

//Setting canvas size
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

//Canvas context
var c = canvas.getContext("2d");

//Drawing Rectangles
// c.fillStyle = "rgba(255, 0, 0, 0.5";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5";
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5";
// c.fillRect(300, 300, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5";
// c.fillRect(400, 200, 100, 100);
// c.fillStyle = "rgba(255, 0, 0, 0.5";
// c.fillRect(500, 100, 100, 100);

//Drawing Lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.closePath();
// c.strokeStyle = "black";
// c.stroke();

//Arcs and Circles

// for (let i = 0; i < 2000; i++) {
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;
//     let r = Math.random() * 30; 
//     let red = Math.trunc(Math.random() * 255);
//     let green = Math.trunc(Math.random() * 255);
//     let blue = Math.trunc(Math.random() * 255);
//     let alpha = Math.random();
//     c.beginPath();
//     c.arc(x, y, r, 0, Math.PI * 2, false);
//     c.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 60;
//var minRadius = 10;

class Circle {
    constructor(x, y, r, dx, dy, red, green, blue, alpha) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.minRadius = r
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = `rgb(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        c.stroke();
        c.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        c.fill();
    }

    update() {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();

        //Mouse move interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.r < maxRadius) {
                this.r += 1;
            }
        } else if (this.r > this.minRadius) {
            this.r -= 1;
        }
    }
}

var circles = [];

for (let i = 0; i < 300; i++) {
    var r = Math.floor(Math.random() * 50);
    var x = Math.random() * (canvas.width - r * 2) + r;
    var y = Math.random() * (canvas.height - r * 2) + r;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    let red = Math.trunc(Math.random() * 255);
    let green = Math.trunc(Math.random() * 255);
    let blue = Math.trunc(Math.random() * 255);
    let alpha = Math.random() * 1.5;
    circles.push(new Circle(x, y, r, dx, dy, red, green, blue, alpha));
}

function init() {
    circles = [];

    for (let i = 0; i < 500; i++) {
        var r = Math.floor(Math.random() * 50);
        var x = Math.random() * (canvas.width - r * 2) + r;
        var y = Math.random() * (canvas.height - r * 2) + r;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        let red = Math.trunc(Math.random() * 255);
        let green = Math.trunc(Math.random() * 255);
        let blue = Math.trunc(Math.random() * 255);
        let alpha = Math.random() * 1.5;
        circles.push(new Circle(x, y, r, dx, dy, red, green, blue, alpha));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth - 6;
    canvas.height = window.innerHeight - 6;
    init();
});