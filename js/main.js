/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
  "class",
  "compile",
];
const MAX_GUESSES = 7;
/*----- app's state (variables) -----*/
let hiddenWord,
  correctLetters,
  wrongGuesses,
  correctLetterCount,
  correctGuess,
  buttonClicked,
  letterPlayerSelected;

/*----- cached element references -----*/
const messageDisplayEl = document.querySelector("h2");
const letterContainerEl = document.getElementById("letter-container");
const guessInputSlotEl = document.getElementById("guess-input-slot");
const resetButtonEl = document.getElementById("reset-button");

/*----- event listeners -----*/
letterContainerEl.addEventListener("click", handleLetterContainerClick);
resetButtonEl.addEventListener("click", handleResetButtonClick);

/*----- functions -----*/
function init() {
  hiddenWord = "";
  correctLetters = [];
  wrongGuesses = [];
  gameStatus = 0;
  correctGuess = false;
  correctLetterCount = 0;
  buttonClicked = null;
  letterPlayerSelected = null;
  guessInputSlotEl.innerHTML = "";
  toggleAllLetters(false);
  console.log("init", hiddenWord.length);
  render();
  console.log("init function ", hiddenWord);
  startTemplate();
}

function render() {
  if (hiddenWord.length === 0) {
    messageDisplayEl.innerText =
      "Welcome! Enter a letter to help reveal the hidden word!";
    hiddenWord = hiddenWordGenerator();
    correctLetters = hiddenWord.split("");
    inputSlotDisplay();
  } else if (hiddenWord.length > 0 && correctGuess === true) {
    if (gameStatus === 1) {
      messageDisplayEl.innerText =
        "Congrats, you won. Hit Reset to play again!";
      toggleAllLetters(true);
    } else {
      messageDisplayEl.innerText = "Correct! Try Again!";
      buttonClicked.disabled = true;
    }
  } else {
    if (gameStatus === -1) {
      messageDisplayEl.innerText =
        "Sometimes you win ... sometimes you LOSE. Reset to try again";
      toggleAllLetters(true);
    } else {
      messageDisplayEl.innerText = "Wrong! Try again!";
      buttonClicked.disabled = true;
    }
  }
}

function handleLetterContainerClick(evt) {
  if (evt.target.id !== "letter-container") {
    buttonClicked = evt.target;
    letterPlayerSelected = evt.target.innerText;
    if (hiddenWord.includes(letterPlayerSelected)) {
      correctLetters.forEach(function (letter, idx) {
        correctGuess = true;
        if (letter === letterPlayerSelected) {
          ++correctLetterCount;
          console.log("correctLetterCount", correctLetterCount);
          guessInputSlotEl.childNodes[idx].innerText = letterPlayerSelected;
        }
      });
      checkWin();
      render();
    } else {
      correctGuess = false;
      wrongGuesses.push(letterPlayerSelected);
      console.log("wrongGuesses", wrongGuesses.length);
      checkWin();
      render();
    }
  }
}

function handleResetButtonClick(evt) {
  console.log("reset click");
  init();
}

//Helper Functions

//Elects Hidden Word for Game
function hiddenWordGenerator() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)].toUpperCase();
}

//display dashes that are allocated for correct guesses
//Has to be done dynamically because we yet don't know the length of the word
function inputSlotDisplay() {
  for (let i = 0; i < hiddenWord.length; i++) {
    guessInputSlotEl.innerHTML += `<span class="line-dash"> _ </span>`;
  }
}

function checkWin() {
  if (hiddenWord.length === correctLetterCount) {
    // console.log(
    //   "hiddenWord.length",
    //   hiddenWord.length,
    //   "correctLetterCount",
    //   correctLetterCount
    // );
    gameStatus = 1;
  }
  if (wrongGuesses.length === MAX_GUESSES) {
    gameStatus = -1;
  }
}

//function to enable/disable all letter-buttons in the letter container when the game has concluded and reset
function toggleAllLetters(value) {
  allLetterButtons = document.querySelectorAll(".letter");
  allLetterButtons.forEach(function (button) {
    button.disabled = value;
  });
}

//Hangman Design
const canvas = document.getElementById("hangman-canvas");
console.log(canvas);
// Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document.
const context = canvas.getContext("2d");
console.log(context);

function startTemplate() {
  cleanCanvas();
  //bottom line
  lineDesign(10, 130, 130, 130);
  //middle line
  lineDesign(65, 10, 65, 130);
  //top line
  lineDesign(65, 10, 150, 10);
}

function hangmanConstruction(wrongGuessNum) {
  switch (wrongGuessNum) {
    //head
    case 1:
      context.beginPath();
      context.arc(150, 45, 10, 0, Math.PI * 2, true);
      context.stroke();
      break;
    //body
    case 2:
      lineDesign(150, 55, 150, 95);
      break;
    //left arm
    case 3:
      lineDesign(150, 65, 135, 70);
      break;
    //right arm
    case 4:
      lineDesign(150, 65, 165, 70);
      break;
    //left leg
    case 5:
      lineDesign(150, 95, 140, 118);
      break;
    //right leg
    case 6:
      lineDesign(150, 95, 160, 118);
      break;
    //rope
    case 7:
      lineDesign(150, 10, 150, 35);
      break;
  }
}
//function to assist with designing line
function lineDesign(startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

//function to clean canvas
function cleanCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
//Game Initiated
init();
