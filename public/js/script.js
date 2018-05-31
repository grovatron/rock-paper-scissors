// select all display elements
let display = document.querySelector('.display');
let playerScore = document.querySelector('.player');
let computerScore = document.querySelector('.computer');

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
function RPSObject(strength, weakness) {
    this.strength = strength;
    this.weakness = weakness;
}

// map RPS choices to their corresponding objects
const rpsMap = new Map();
rpsMap.set(r, new RPSObject(s, p));
rpsMap.set(p, new RPSObject(r, s));
rpsMap.set(s, new RPSObject(p, r));

// player choice and array of choices for computer
let playerChoice = null;
const compChoices = Array.from(rpsMap.keys());

// set text content for display and choice buttons
display.textContent = defaultDisplay;
rBtn.textContent = r;
pBtn.textContent = p;
sBtn.textContent = s;
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
    displayChoice(this.textContent);
    playerChoice = rpsMap.get(this.textContent);
}

function displayChoice(choiceString) {
    display.textContent = `You are playing ${choiceString}!`;
}

function playRound(event) {
    console.log('playing round');
}

function reset(event) {
    console.log('resetting');
}
