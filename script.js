const startBtn = document.getElementById('start-btn');
const selectMenu = document.querySelector('.select-menu');
const startMenu = document.querySelector('.start');
const slideMsg = document.querySelector('.message');
const insects = document.querySelectorAll('.insect');
const timerEl = document.querySelector('.timer');
const gameContainer = document.querySelector('.game-container');
const scoreEl = document.getElementById('score');

let score = 0;
const insectImgs = {'fly': 'fly.png',
                    'roach': 'roach.png',
                    'mosquito': 'mosquito.png',
                    'spider': 'spider.png'};

var selectedInsect;
var timerInterval;
var totalSeconds = 0;

startBtn.addEventListener('click', () => {
    startMenu.classList.add('up');
});

insects.forEach(insect => {
    insect.addEventListener('click', () => {
        // start the game
        selectedInsect = insect.id;
        console.log(window.innerWidth + " " + window.innerWidth);
        selectMenu.classList.add('up');
        gameContainer.classList.add('active');
        setTimeout(createInsect, 1000);
        startTimer();
    });
})


function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    totalSeconds++;
  
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
  
    var timeString =
      "Time: " +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
  
      timerEl.innerHTML = timeString;
}

function createInsect() {
    const insect = document.createElement('img');
    insect.classList.add('game-insect');

    // set src and alt
    insect.src = insectImgs[selectedInsect];
    insect.alt = selectedInsect;

    // set x, y positions
    const { x, y } = getRandomPosition();
    insect.style.top = y + 'px';
    insect.style.left = x + 'px';

    // set rotation
    var rotationDegree = Math.random() * 360;
    insect.style.transform = "rotate(" + rotationDegree + "deg)";

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

function getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 100) + 100;
    const y = Math.random() * (height - 100) + 100;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    let transform = this.style.transform;
    let newTransform = transform + 'scale(0) translate(-30%, -30%)';
    this.style.transform = newTransform;
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1000);
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = score.toString();

    if (score === 20) {
        slideMsg.classList.add('visible');
    }
}