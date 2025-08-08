const ball = document.getElementById("ball");
const bounceSound = document.getElementById("bounceSound");

let posX = window.innerWidth / 2 - 60;
let posY = window.innerHeight - 150;
let velX = 0;
let velY = 0;
const gravity = 0.8;
const damping = 0.78;
const bouncePower = 25;

function updatePhysics() {
    velY += gravity;
    posY += velY;
    posX += velX;

    // Bottom collision
    const floorY = window.innerHeight - 30 - 120;
    if (posY >= floorY) {
        posY = floorY;
        velY *= -damping;
        if (Math.abs(velY) > 3) bounceSound.play();
    }

    // Walls
    if (posX <= 0 || posX + 120 >= window.innerWidth) {
        velX *= -0.7;
        posX = Math.max(0, Math.min(posX, window.innerWidth - 120));
    }

    velX *= 0.99; // Friction

    ball.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(updatePhysics);
}

updatePhysics();

// Bounce on click or touch
function bounce() {
    velY = -bouncePower;
    velX = (Math.random() - 0.5) * 16;
}

ball.addEventListener("click", bounce);
ball.addEventListener("touchstart", bounce);

// Window resize safety
window.addEventListener("resize", () => {
    posX = Math.min(posX, window.innerWidth - 120);
    posY = Math.min(posY, window.innerHeight - 150);
});
