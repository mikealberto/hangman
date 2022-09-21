/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
];
/*----- app's state (variables) -----*/
let hiddenWord, correctLetters;

/*----- cached element references -----*/
const messageDisplayEl = document.querySelector("h2");
const letterContainerEl = document.getElementById("letter-container");
const hiddenWordInputEl = document.getElementById("hidden-word-input");
// console.log(hiddenWordInputEl);

/*----- event listeners -----*/
letterContainerEl.addEventListener("click", handleLetterContainerClick);

/*----- functions -----*/
function init() {
  let hiddenWord = "";
  let correctLetters = [];
  console.log(correctLetters);
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to help reveal the hidden word!";
  hiddenWord = hiddenWordGenerator();
  console.log("init function ", hiddenWord);
  //   hiddenWordDisplay();
}

function handleLetterContainerClick(evt) {
  console.log(evt.target);
  const letterPlayerSelected = evt.target.innerText;
  if (hiddenWord.includes(letterPlayerSelected)) {
    // console.log("Right Letter");
  }
}

//Helper Function

//Elects Hidden Word for Game
function hiddenWordGenerator() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)].toUpperCase();
}

//display hidden word
//Has to be done dynamically because we yet don't know the length of the word
// function hiddenWordDisplay() {
//   hiddenWordCharArr = hiddenWord.split("");
//   console.log(hiddenWordCharArr);
//   hiddenWordCharArr.map(function (character) {
//     <span class="letter"></span>;
//   });
// }

//Game Initiated
init();
