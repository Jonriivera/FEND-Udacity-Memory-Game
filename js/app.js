let listOfCards = [ // cards array for symbols
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb',
  'fa-leaf',
  'fa-leaf',
  ];

let moveCounter = 0;
let starCount = 3;

function getRank() {
  let stars = document.querySelector('.stars');
  if(moveCounter >= 10 && moveCounter < 13) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    starCount--;
  } else if (moveCounter >= 13 && moveCounter < 16) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
    starCount = 1;
  } else if (moveCounter >= 18) {
    stars.innerHTML = '';
    starCount = 0;
  }
}

let deck = document.querySelector('.deck');

function createCards() { //function to shuffle cards and append to the deck.
  listOfCards = shuffle(listOfCards);
  for(let i = 0 ; i < listOfCards.length ; i++) {
    let HTMLToAdd = '<li class="card"><i class="fa ' +listOfCards[i]+ '"></i></li>';
    deck.insertAdjacentHTML('beforeend', HTMLToAdd);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let cardsOpen = []; // array for cards flipped to be placed into
let cardsMatched = []; //array for matched cards to be pushed into
let cardsUnmatched = []; //array for unmatched cards to be pushed into

function flipCards() {
  if(cardsUnmatched.length === 1) {
  cardsUnmatched[0][0].className = 'card';
  cardsUnmatched[0][1].className = 'card';
  cardsUnmatched = [];
  }
}
function showCard() { //Funtion to show card
  event.target.className += ' open show';
}

function matchedCards() { // function to add what matched cards do
  cardsOpen[0].className = 'card match';
  cardsOpen[1].className = 'card match';
  cardsMatched.push(cardsOpen[0]);
  cardsMatched.push(cardsOpen[1]);
  cardsOpen = [];
  if (cardsMatched.length === 16){
    alert('You won with ' +moveCounter+ ' moves!\nYou got ' +starCount+ " stars!!");
  }
}

function unmatchedCards() { // function to add what unmatched cards do
  cardsOpen[1].className = 'card unmatched';
  cardsOpen[0].className = 'card unmatched';
  cardsUnmatched.push(cardsOpen);
  cardsOpen = [];
}

function testCards() { // Function to add cards to array and to compare them
  cardsOpen.push(event.target);
  flipCards();
  getRank();
  if(cardsOpen.length === 2) {
    moveCounter++;
    if(cardsOpen[0].innerHTML == cardsOpen[1].innerHTML) {
      matchedCards();
    } else {
      unmatchedCards();
    }
  }
}

document.addEventListener("click", function(event) { // Event listener for click on card
  if(event.target && event.target.className === "card") {
  document.querySelector('.moves').innerHTML = moveCounter;
  showCard();
  testCards();
  }
});

createCards();
