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
  winStatus,
  lostStatus,
  correctLetterCount;

/*----- cached element references -----*/
const messageDisplayEl = document.querySelector("h2");
const letterContainerEl = document.getElementById("letter-container");
const guessInputSlotEl = document.getElementById("guess-input-slot");

/*----- event listeners -----*/
letterContainerEl.addEventListener("click", handleLetterContainerClick);

/*----- functions -----*/
function init() {
  hiddenWord = "";
  correctLetters = [];
  wrongGuesses = [];
  winStatus = false;
  lostStatus = false;
  correctLetterCount = 0;
  render();
}

function render() {
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to help reveal the hidden word!";
  hiddenWord = hiddenWordGenerator();
  // console.log("init function ", hiddenWord);
  correctLetters = hiddenWord.split("");
  inputSlotDisplay();
}

function handleLetterContainerClick(evt) {
  if (evt.target.id !== "letter-container") {
    const buttonClicked = evt.target;
    const letterPlayerSelected = evt.target.innerText;
    if (hiddenWord.includes(letterPlayerSelected)) {
      correctLetters.forEach(function (letter, idx) {
        if (letter === letterPlayerSelected) {
          ++correctLetterCount;
          console.log("correctLetterCount", correctLetterCount);
          guessInputSlotEl.childNodes[idx].innerText = letterPlayerSelected;
        }
        buttonClicked.disabled = true;
      });
      checkWin();
      if (winStatus) {
        messageDisplayEl.innerText =
          "Congrats, you won. Hit Reset to play again!";
      } else {
        messageDisplayEl.innerText = "Correct! Try Again!";
      }
    } else {
      buttonClicked.disabled = true;
      wrongGuesses.push(letterPlayerSelected);
      console.log("wrongGuesses", wrongGuesses.length);
      checkWin();
      if (lostStatus) {
        messageDisplayEl.innerText =
          "Sometimes you win ... sometimes you LOSE. Reset to try again";
      } else {
        messageDisplayEl.innerText = "Wrong! Try again!";
      }
    }
  }
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
    winStatus = true;
  }
  if (wrongGuesses.length === MAX_GUESSES) {
    lostStatus = true;
  }
}

//conclude game function
//function renderNotifications ()

//Game Initiated
init();
