var celebs = [
  "shakira",
  "zayn-malik",
  "the-weeknd",
  "kendrick-lamar",
  "jezz-bezos",
  "elon-musk",
  "zuckerberg",
  "selena-gomez",
  "justin-bieber",
  "rihanna",
  "bill-gates",
  "mukesh-ambani",
  "akon",
  "post-malone",
  "rabindra-nath-tagore"
];

var hints = [
  "this time for africa",
  "pillowtalk",
  "starboy",
  "BE HUMBLE! SIT DOWN!",
  "amazon",
  "TESLA",
  "facebook",
  "Come and get it na na na na!",
  "Most disliked video on youtube",
  "yellow diamonds in the light",
  "microsoft",
  "Jio",
  "Chammak Challo",
  "Rockstar",
  "jan-gan-man"
];

let answer = "";
let hint = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  let index = Math.floor(Math.random() * celebs.length);
  answer = celebs[index];
  hint = hints[index];
  const ele = document.getElementById("hint");
  ele.innerHTML = `<h5> Hint : ${hint} </h6>`;
}

function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
      <button
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".svg";
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!!";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "The answer was: " + answer;
    document.getElementById("keyboard").innerHTML = "You Lost!!!";
  }
}

function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : "_"))
    .join("");
  let current = "";
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === "-") {
      current = current + answer[i] + " ";
      wordStatus[i] = answer[i];
      //console.log("word =" + wordStatus[i]);
    } else {
      current = current + wordStatus[i] + " ";
    }
  }
  wordStatus = current.split(" ").join("");
  console.log(wordStatus);
  document.getElementById("wordSpotlight").innerHTML = current;
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.svg";

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
