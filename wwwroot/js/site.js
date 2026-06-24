// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const paddleWidth = 10;
const paddleHeight = 100;

const leftPaddle = {
    x: 20,
    y: canvas.height / 2 - paddleHeight / 2
};

const rightPaddle = {
    x: canvas.width - 30,
    y: canvas.height / 2 - paddleHeight / 2
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 3,
    dy: 2,
    radius: 8
};

const maxSpeed = 8;
const speed = Math.min(
    Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * 1.01,
    maxSpeed
);

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom walls
    if (ball.y < ball.radius ||
        ball.y > canvas.height - ball.radius) {
        ball.dy *= -1;
    }

    // Simple AI
    leftPaddle.y += (ball.y - (leftPaddle.y + paddleHeight / 2)) * 0.08;
    rightPaddle.y += (ball.y - (rightPaddle.y + paddleHeight / 2)) * 0.08;

    // Left paddle collision
    if (
        ball.x - ball.radius <= leftPaddle.x + paddleWidth &&
        ball.x + ball.radius >= leftPaddle.x &&
        ball.y + ball.radius >= leftPaddle.y &&
        ball.y - ball.radius <= leftPaddle.y + paddleHeight &&
        ball.dx < 0
    ) {
        const hitPos =
            (ball.y - (leftPaddle.y + paddleHeight / 2))
            / (paddleHeight / 2);

        const maxAngle = Math.PI / 4; // 45 degrees
        const angle = hitPos * maxAngle;

        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

        ball.dx = speed * Math.cos(angle);
        ball.dy = speed * Math.sin(angle);

        ball.x = leftPaddle.x + paddleWidth + ball.radius;
    }

    // Right paddle collision
    if (
        ball.x + ball.radius >= rightPaddle.x &&
        ball.x - ball.radius <= rightPaddle.x + paddleWidth &&
        ball.y + ball.radius >= rightPaddle.y &&
        ball.y - ball.radius <= rightPaddle.y + paddleHeight &&
        ball.dx > 0
    ) {
        const hitPos =
            (ball.y - (rightPaddle.y + paddleHeight / 2))
            / (paddleHeight / 2);

        const maxAngle = Math.PI / 4; // 45 degrees
        const angle = hitPos * maxAngle;

        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

        ball.dx = -speed * Math.cos(angle);
        ball.dy = speed * Math.sin(angle);

        ball.x = rightPaddle.x - ball.radius;
    }

    // Reset ball
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    ctx.fillRect(
        leftPaddle.x,
        leftPaddle.y,
        paddleWidth,
        paddleHeight
    );

    ctx.fillRect(
        rightPaddle.x,
        rightPaddle.y,
        paddleWidth,
        paddleHeight
    );

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();