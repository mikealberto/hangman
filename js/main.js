/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
];
/*----- app's state (variables) -----*/
let hiddenWord = "";

/*----- cached element references -----*/
const messageDisplayEl = document.querySelector("h2");
const letterContainerEl = document.getElementById("letter-container");

/*----- event listeners -----*/
letterContainerEl.addEventListener("click", handleLetterContainerClick);

/*----- functions -----*/
function init() {
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to help reveal the hidden word!";
  hiddenWord = hiddenWordGenerator();
  console.log(hiddenWord);
}

function handleLetterContainerClick(evt) {
  console.log(evt.target);
}

//Helper Function

//Elects Hidden Word for Game
function hiddenWordGenerator() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)].toUpperCase();
}

//display hidden word
//Has to be done dynamically because we yet don't know the length of the word
function hiddenWordDisplay() {}

//Game Initiated
init();
