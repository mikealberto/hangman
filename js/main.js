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
let hiddenWord, correctLetters;

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
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to help reveal the hidden word!";
  hiddenWord = hiddenWordGenerator();
  console.log("init function ", hiddenWord);
  inputSlotDisplay();
}

function handleLetterContainerClick(evt) {
  console.log(evt.target);
  const letterPlayerSelected = evt.target.innerText;
  //   if (hiddenWord.includes(letterPlayerSelected)) {
  //     // console.log("Right Letter");
  //   }
}

//Helper Function

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

//Game Initiated
init();
