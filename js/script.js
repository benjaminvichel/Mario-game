const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const bird = document.querySelector('.bird');

let gameOver = false; // Control variable for the game state
let restoreTimer; // Declaration of the restoreTimer variable

const jump = () => {
    if (gameOver) return;

    mario.classList.add('jump');
    mario.src = 'images/mario-jump.png';

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500);

    // Set up a new timer to restore the image after 2 seconds
    restoreTimer = setTimeout(() => {
        restoreImage();
    }, 500);

}

const lower = () => {
    if (gameOver) return;

    mario.classList.add('lower');
    mario.src = 'images/mario-lower.png';
    setTimeout(() => {
        mario.classList.remove('lower')
    }, 500);

    // Cancel the previous timer, if it exists
    clearTimeout(restoreTimer);

    // Set up a new timer to restore the image after 2 seconds
    restoreTimer = setTimeout(() => {
        restoreImage();
    }, 500);
};

const restoreImage = () => {
    if (gameOver) return; // Check if the game is in "game over" state
    mario.src = 'images/mario.gif';
    mario.style.width = ''; // Remove width style to revert to default
    mario.style.marginLeft = ''; // Remove margin style to revert to default
    const marioImageSrc = mario.src;
};

const loop = setInterval(() => {
    const birdPosition = bird.offsetLeft;
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const marioImageSrc = mario.src;

    if ((pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) || (birdPosition <= 120 && birdPosition > 0 && marioImageSrc.endsWith('images/mario.gif')) || (birdPosition <= 120 && birdPosition > 0 && marioPosition < 130 && !marioImageSrc.endsWith('images/mario-lower.png'))) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        bird.style.animation = 'none';
        bird.style.left = `${birdPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        gameOverFunction(); // Calls the function to indicate the game is over
    }
}, 100);

document.addEventListener('keydown', function (event) {
    // Check if the pressed key is the up arrow key ("ArrowUp" code)
    if (event.key === "ArrowUp") {
        jump(); // Calls the jump function
    }
    else if (event.key === "ArrowDown") {
        lower(); // Calls the lower function
    }
});

//logic random display pipe and bird//

// Random selection of the initial element (pip or bird)
const randomNumber = Math.random();// Generates a random number between 0 and 1
if (randomNumber < 0.5) {
    pipe.style.display = 'block'; // Shows the pipe
    bird.style.display = 'none'; // Hides the bird
} else {
    pipe.style.display = 'none'; // Hides the pipe
    bird.style.display = 'block'; // Shows the bird
}

const toggleElement = () => {
    if (gameOver) return; // Check if the game is in "game over" state
    const randomNumber = Math.random();// Generates a random number between 0 and 1

    if (randomNumber < 0.5) {
        pipe.style.display = 'block'; // Shows the pipe
        bird.style.display = 'none'; // Hides the bird
    } else {
        pipe.style.display = 'none'; // Hides the pipe
        bird.style.display = 'block'; // Shows the bird
    }
};
// Set interval to switch between pipe and bird
setInterval(toggleElement, 2000); // Every 2 seconds

// Function to indicate the game is over
function gameOverFunction() {
    gameOver = true;
    clearInterval(intervalId); // Stops the image switching
}