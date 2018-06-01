// select all display elements
let display = document.querySelector('.display');
let playerScore = document.querySelector('.player');
let computerScore = document.querySelector('.computer');
let bestOfDisplay = document.querySelector('.best-of');

// select all buttons
const choiceBtns = document.querySelectorAll('.choice-btns .btn');
const rBtn = document.querySelector('.r');
const pBtn = document.querySelector('.p');
const sBtn = document.querySelector('.s');
const playBtn = document.querySelector('.play');
const resetBtn = document.querySelector('.reset');

// define RPS choices as constants
// useful if you wish to change the name of the choices later
const r = 'rock';
const p = 'paper';
const s = 'scissors';
const defaultDisplay = `${r}, ${p}, ${s}!`;

// define RPSObject to make comparing choices easier
function RPSObject(type, strength, weakness) {
    this.type = type;
    this.strength = strength;
    this.weakness = weakness;
}

// map RPS choices to their corresponding objects
const rpsMap = new Map();
rpsMap.set(r, new RPSObject(r, s, p));
rpsMap.set(p, new RPSObject(p, r, s));
rpsMap.set(s, new RPSObject(s, p, r));

// player choice and array of choices for computer
let playerChoice = null;
let compChoice = null;
const compChoices = Array.from(rpsMap.keys());
const bestOutOf = 5;
const winCondition = Math.floor(bestOutOf / 2) + 1;
let gameOver = false;

// set text content for display and choice buttons
display.textContent = defaultDisplay;
rBtn.textContent = r;
pBtn.textContent = p;
sBtn.textContent = s;
bestOfDisplay.textContent = bestOutOf;
capitalizeText(display, rBtn, pBtn, sBtn);

// add event listeners for buttons
choiceBtns.forEach(button => button.addEventListener('click', makeChoice));
playBtn.addEventListener('click', playRound);
resetBtn.addEventListener('click', reset);

function capitalizeText() {
    if (arguments.length === 0) {
        return;
    }
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].style.textTransform = 'capitalize';
    }
}

function makeChoice(event) {
    if (gameOver) {
        return;
    }
    displayChoice(this.textContent);
    playerChoice = rpsMap.get(this.textContent);
}

function displayChoice(choiceString) {
    display.textContent = `You are playing ${choiceString}!`;
}

function playRound(event) {
    if(gameOver) {
        return;
    } else if (playerChoice === null) {
        display.textContent = "make a choice!"
        return;
    }
    getCompChoice();
    const result = compareChoices();
    handleResult(result);
    checkGameOver();
    playerChoice = null;
    console.log('playing a round');
}

function getCompChoice() {
    const index = Math.floor(Math.random() * compChoices.length);
    console.log('computer chose: ' + compChoices[index]);
    compChoice = rpsMap.get(compChoices[index]);
}

function compareChoices() {
    let result;
    if (playerChoice.strength === compChoice.type) {
        result = 'win';
    } else if (playerChoice.weakness === compChoice.type) {
        result = 'lose';
    } else {
        result = 'tie';
    }
    console.log(`result: ${result}`);
    return result;
}

function handleResult(result) {
    if (result === 'tie') {
        displayResult(result);
        return;
    }
    displayResult(result);
    incrementScore(result);
}

function displayResult(result) {
    let resultString;
    if (result === 'win') {
        resultString = `${playerChoice.type} beats ${compChoice.type}!`;
    } else if (result === 'lose') {
        resultString = `${playerChoice.type} loses to ${compChoice.type}!`;
    } else {
        resultString = "This round is a tie!";
    }
    display.textContent = resultString;
}

function incrementScore(result) {
    if (result === 'win') {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else if (result === 'lose') {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
}

function checkGameOver() {
    if (!(playerScore.textContent == winCondition || computerScore.textContent == winCondition)) {
        return;
    }
    gameOver = true;
    displayGameResults();
    choiceBtns.forEach(button=>{button.classList.remove('choice-btn-hover'); button.classList.add('game-over')});
    playBtn.classList.remove('play-hover');
    playBtn.classList.add('game-over');
    console.log('game over');
}

function displayGameResults() {
    let gameResultString;
    if (playerScore.textContent == winCondition) {
        gameResultString = 'You win!';
    } else {
        gameResultString = 'You lose!';
    }
    display.textContent = gameResultString;
}

function reset(event) {
    gameOver = false;
    playerScore.textContent = 0;
    computerScore.textContent = 0;
    display.textContent = defaultDisplay;
    choiceBtns.forEach(button=>{button.classList.remove('game-over'); button.classList.add('choice-btn-hover')});
    playBtn.classList.remove('game-over');
    playBtn.classList.add('play-hover');
    console.log('resetting');
}
