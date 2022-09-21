/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
  "class",
  "compile",
];
/*----- app's state (variables) -----*/
let hiddenWord, correctLetters, wrongGuesses;

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
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to help reveal the hidden word!";
  hiddenWord = hiddenWordGenerator();
  console.log("init function ", hiddenWord);
  correctLetters = hiddenWord.split("");
  //display dashes
  inputSlotDisplay();
}

function handleLetterContainerClick(evt) {
  if (evt.target.id !== "letter-container") {
    const buttonClicked = evt.target;
    const letterPlayerSelected = evt.target.innerText;
    if (hiddenWord.includes(letterPlayerSelected)) {
      messageDisplayEl.innerText = "Correct! Try Again!";
      correctLetters.forEach(function (letter, idx) {
        if (letter === letterPlayerSelected) {
          guessInputSlotEl.childNodes[idx].innerText = letterPlayerSelected;
          buttonClicked.disabled = true;
        }
      });
      //check if you won
    } else {
      messageDisplayEl.innerText = "Wrong! Try again!";
      buttonClicked.disabled = true;
      wrongGuesses.push(letterPlayerSelected);
      console.log(wrongGuesses.length);
      //check if you lost
    }
  }
}

//Helper Functions

//Elects Hidden Word for Game
function hiddenWordGenerator() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)].toUpperCase();
}

//display slot
//Has to be done dynamically because we yet don't know the length of the word
function inputSlotDisplay() {
  for (let i = 0; i < hiddenWord.length; i++) {
    guessInputSlotEl.innerHTML += `<span class="line-dash"> _ </span>`;
  }
}

// function checkWin() {}
//function renderNotifications ()

//Game Initiated
init();
