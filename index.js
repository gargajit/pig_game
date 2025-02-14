'use strict';

// User to input names
// const p1 = prompt('Player 1:');
// const p2 = prompt('Player 2:');

// change default
// document.querySelector('#name--0').textContent = p1;
// document.querySelector('#name--1').textContent = p2;

const startTotal = 0;
const startCurrent = 0;

// Player 1 data assignment
let player1 = document.querySelector('.player--0');
let totalScoreP1 = Number(document.querySelector('#score--0').textContent);
let currentP1 = Number(document.querySelector('#current--0').textContent);

// Player 2 data assignment
let player2 = document.querySelector('.player--1');
let totalScoreP2 = Number(document.querySelector('#score--1').textContent);
let currentP2 = Number(document.querySelector('#current--1').textContent);

let dice = document.querySelector('.dice');
let rollDice = 5;

let diceSrc = dice.getAttribute('src');

// function to reset the Data - used when DOMContentLoaded and NewGame
const resetData = function () {
  console.log('New Game');
  document.querySelector('#score--0').textContent = startTotal;
  document.querySelector('#current--0').textContent = startCurrent;
  document.querySelector('#score--1').textContent = startTotal;
  document.querySelector('#current--1').textContent = startCurrent;
  totalScoreP1 = startTotal;
  currentP1 = startCurrent;
  totalScoreP2 = startTotal;
  currentP2 = startCurrent;

  // hide the dice
  if (!dice.classList.contains('hidden')) {
    document.querySelector('.dice').classList.add('hidden');
  }

  // make player 1 active
  if (!player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }

  // if player 1 was previous winner, remove the player--winner class
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  }

  // if player 2 was previous winner, remove the player--winner class
  if (player2.classList.contains('player--winner')) {
    player2.classList.remove('player--winner');
  }
};

// DOMContentLoaded Event - calls the resetData function
document.addEventListener('DOMContentLoaded', resetData);

// New Game Event Listener - calls the resetData function
document.querySelector('.btn--new').addEventListener('click', resetData);

// function to generate the Dice Number between 1-6
const generateDiceNumber = function () {
  return Math.floor(Math.random() * 6) + 1;
};

// Switch Players function
const switchPlayer = function (player) {
  // if the active player is Player 1, make Player 2 active
  if (player === 'player1') {
    currentP1 = startCurrent; // reset the current value
    document.querySelector('#current--0').textContent = currentP1; // display the reset value
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  }
  // if the active player is Player 2, make Player 1 active
  else if (player === 'player2') {
    currentP2 = startCurrent; // reset the current value
    document.querySelector('#current--1').textContent = currentP2; // display the reset value
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
};

// Dice Roll Event Listener
document.querySelector('.btn--roll').addEventListener('click', function () {
  // call the function and assign to variable rollDice
  rollDice = generateDiceNumber();

  // to display the hidden dice image element
  if (dice.classList.contains('hidden')) {
    document.querySelector('.dice').classList.remove('hidden');
  }

  // assigning the src of dice image that matches the rollDice number.
  diceSrc = `./assets/dice-${rollDice}.png`;

  // setting new value of src to the dice image.
  dice.setAttribute('src', diceSrc);

  // dice roll will be added to the active player's current score if rollDice is NOT 1
  if (player1.classList.contains('player--active') && rollDice !== 1) {
    currentP1 += rollDice;
    document.querySelector('#current--0').textContent = currentP1;
  } else if (player2.classList.contains('player--active') && rollDice !== 1) {
    currentP2 += rollDice;
    document.querySelector('#current--1').textContent = currentP2;
  }

  // if rollDice is 1, call switch player function
  else if (player1.classList.contains('player--active') && rollDice === 1) {
    switchPlayer('player1');
  } else if (player2.classList.contains('player--active') && rollDice === 1) {
    switchPlayer('player2');
  }

  // check if total score is >= 100, if yes stop the game with winner.
  if (totalScoreP1 >= 100) {
    player1.classList.add('player--winner');
    dice.classList.add('hidden');
    return; // Stop further execution
  }
  if (totalScoreP2 >= 100) {
    player2.classList.add('player--winner');
    dice.classList.add('hidden');
    return; // Stop further execution
  }
});

// Hold Event Listener
document.querySelector('.btn--hold').addEventListener('click', function () {
  console.log('Hold the score');

  if (player1.classList.contains('player--active')) {
    totalScoreP1 += currentP1;
    document.querySelector('#score--0').textContent = totalScoreP1;

    if (totalScoreP1 >= 100) {
      player1.classList.add('player--winner');
      dice.classList.add('hidden');
      return; // Stop further execution
    }

    // Switch to Player 2
    switchPlayer('player1');
  } else if (player2.classList.contains('player--active')) {
    totalScoreP2 += currentP2;
    document.querySelector('#score--1').textContent = totalScoreP2;

    if (totalScoreP2 >= 100) {
      player2.classList.add('player--winner');
      dice.classList.add('hidden');
      return; // Stop further execution
    }

    // Switch to Player 1
    switchPlayer('player2');
  }
});


// "About the Game" Modal

const modal = document.querySelector('.modal');
const hidden = document.querySelector('.hidden');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const showModal = document.querySelector('.show-modal');

// function to open the modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// function to close the modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// event handler to the button to open the modal
showModal.addEventListener('click', openModal);

// event handler to the button to close the modal
btnCloseModal.addEventListener('click', closeModal);

// event handler to close the modal when user clicks on the overlay screen
overlay.addEventListener('click', closeModal);

// event handler to close the modal when escape key is pressed
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

