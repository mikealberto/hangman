/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
  "class",
  "compile",
];
const MAX_GUESSES = 8;
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
  console.log("init", hiddenWord.length);
  render();
  console.log("init function ", hiddenWord);
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
      disableAllLetters();
    } else {
      messageDisplayEl.innerText = "Correct! Try Again!";
      buttonClicked.disabled = true;
    }
  } else {
    if (gameStatus === -1) {
      messageDisplayEl.innerText =
        "Sometimes you win ... sometimes you LOSE. Reset to try again";
      disableAllLetters();
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
  console.log((guessInputSlotEl.innerHTML = ""));
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

//function to disable all button in the letter container when the game has concluded
//Game concludes when the game has been won or lost
function disableAllLetters() {
  // console.log(letterContainerEl.childElementCount);
  allLetterButtons = document.querySelectorAll(".letter");
  allLetterButtons.forEach(function (button) {
    button.disabled = true;
  });
  // console.log(allLetterButtons);
}

//conclude game function
//Game Initiated
init();
