// getting the div containing the images to add to addEventListener
const blackSquares = document.querySelector("#blank");
blackSquares.addEventListener("click", onCardClick);
console.log(blackSquares);

// Array with doubles of the numbers from 1-6 being fed to shuffleArray
const pictures = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Variable containing the returned shuffled Array form shuffleArray
const shufflePictureArray = shuffleArray(pictures);
console.log(shufflePictureArray);

// Variiable to hold the img elements to be added to the innerHtml of the div with id blank
const grid = [];
for (let i = 0; i < shufflePictureArray.length; i++) {
  grid.push(
    `<img src ='blank.png' style = "" class ="${shufflePictureArray[i]}" data-index=${i} alt =''>`
  );
  if (i == 0) {
    continue;
  }
}

// joining grid array and adding it to innerHtml
blackSquares.innerHTML = grid.join(" ");

/*Array containing false 12 times to be switched to true 
if the cards with same index in shufflePictureArray were matched */
let burnedCards = [];
for (let i = 0; i < shufflePictureArray.length; i++) {
  burnedCards.push(false);
}
console.log(burnedCards);

// array containing all the index which were clicked to count the amount of moves the player made
let cardCounter = [];
// retreiving the h4 where the total number of moves will be injected
const movesCounter = document.querySelector(".moves");
let cardClass = [];
// array to temporarily old the 2 cards the player clicked on
let openCards = [];
// to start time on start of play
let startPlay;
//to inject modal on finiדh of of game
var modalBtn = document.querySelector(".modal-bg");
var modal = document.querySelector(".modal");
// function to be activated by clicking on div#blank
function onCardClick(event) {
  // variable holding the number to be added to each picture to switch it
  const number = event.target.dataset.index;

  console.log(number);

  // stopping the function if the click wasn't on oe of the images
  if (event.target.tagName !== "IMG") {
    return;
  }
  // switching the images
  else {
    event.target.attributes.src.nodeValue = `${shufflePictureArray[number]}.png`;
  }
  cardCounter.push(number);
  if (cardCounter.length == 1) {
    startPlay = setInterval(GameTimer, 1000);
  }
  else if (gamePaused.length == 1) {
    startPlay = setInterval(GameTimer, 1000);
    gamePaused.pop();
  }
  // adding the count of moves to innerHtml
  movesCounter.innerHTML = cardCounter.length;
  console.log(cardCounter);
  // Returing the function if the card that was clicked was already matched
  if (openCards.indexOf(number) > -1) {
    return;
  }
  if (burnedCards[number] === true) {
    return;
  }

  //variable containg the src of the 2 clicked cards to be pushed into openCards array
  const currentCard = event.target.attributes.src.nodeValue;
  openCards.push(currentCard);

  cardClass.push(shufflePictureArray[number]);
  // comparing the 2 open card and if they don't match calling the function switchBack to close them
  if (openCards.length == 2) {
    if (openCards[0] !== openCards[1]) {
      setTimeout(switchBack, 1000);
    } else {
      for (let i = 0; i < openCards.length; i++) {
        document.getElementsByClassName(`${cardClass[0]}`)[
          i
        ].attributes.style.nodeValue = "margin: 0px; padding: 3px; ";
      }
      openCards = [];
      cardClass = [];
      burnedCards[cardCounter[cardCounter.length - 1]] = true;
      burnedCards[cardCounter[cardCounter.length - 2]] = true;
    }
  }
  cardClass = [];
  if (burnedCards.includes(false) === false) {
    clearInterval(startPlay);

    modal.innerHTML += `<h3>Congratulions!! You Won!!<h/3> <br>Time: ${gameTime} <br> Moves: ${
      cardCounter.length
    } <br> You got: ${
      seconds <= 30 && cardCounter.length <= 30
        ? "&#11088;&#11088;&#11088;"
        : seconds <= 45 && cardCounter.length <= 40
        ? "&#11088;&#11088;"
        : minutes == 1 || seconds <=59 && cardCounter.length <= 50
        ? "&#11088;"
        : "0 stars try again"
    }`;
    modalBtn.classList.add("bg-active");
  }
  console.log(openCards);
  console.log(event.target.attributes.src.nodeValue);
}

modal.addEventListener("click", restartButton);

function switchBack() {
  for (let i = 0; i < openCards.length; i++) {
    console.log(`#blank img[src="${openCards[i]}"]`);

    document.querySelector(`#blank img[src="${openCards[i]}"]`).src =
      "blank.png";
  }
  openCards = [];
}

const button = document.getElementById("restart");

function restartButton() {
  modal.innerHTML = ` <button id="playAgain">Play Again</button>`;
  cardCounter = [];
  movesCounter.innerHTML = "0";
  clearInterval(startPlay);
  openCards = [];
  cardClass = [];
  timer.innerHTML = "00: 00: 00";
  [seconds, minutes, hours] = [0, 0, 0];
  for (let i = 0; i < shufflePictureArray.length; i++) {
    var classes = document.querySelector(`img:nth-child(${i + 1})`);
    classes.classList.remove(shufflePictureArray[i]);
  }

  shuffleArray(pictures);
  burnedCards = [];
  for (let i = 0; i < shufflePictureArray.length; i++) {
    let dataSet = document.querySelector(`img[data-index='${i}']`);
    burnedCards.push(false);
    document.querySelector(`img:nth-child(${i + 1})`).src = "blank.png";
    document.querySelector(`img:nth-child(${i + 1})`).style = "";
    classes = document.querySelector(`img:nth-child(${i + 1})`);
    classes.classList.add(`${shufflePictureArray[dataSet.dataset.index]}`);
  }
  modalBtn.classList.remove("bg-active");
}
button.addEventListener("click", restartButton);

const timer = document.querySelector(".timer");
timer.innerHTML = "00: 00: 00";
let [seconds, minutes, hours] = [0, 0, 0];
let gameTime = new Array();

console.log(timer);
function GameTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }
  let s = seconds < 10 ? "0" + seconds : seconds;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let h = hours < 10 ? "0" + hours : hours;

  gameTime = timer.innerHTML = `${h}:${m}:${s}`;
  console.log(gameTime);
}
let gamePaused = [];
const pause = document.getElementById("pause");
function pauseGame() {
  clearInterval(startPlay);
  gamePaused.push(1);
}
pause.addEventListener("click", pauseGame);