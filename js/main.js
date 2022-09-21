/*----- constants -----*/
const WORD_BANK = [
  "encapsulation",
  "inheritance",
  "constructor",
  "asynchronous",
];
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
const messageDisplayEl = document.querySelector("h2");
const letterContainerEl = document.getElementById("letter-container");

/*----- event listeners -----*/
letterContainerEl.addEventListener("click", handleLetterContainerClick);

/*----- functions -----*/
function init() {
  messageDisplayEl.innerText =
    "Welcome! Enter a letter to reveal the hidden word!";
}

function handleLetterContainerClick(evt) {
  //   console.log("Say Hello");
  console.log(evt);
}

//Game Initiated
init();
