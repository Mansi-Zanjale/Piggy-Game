'use strict';

// Selecting elements and store them in variables
const player0El = document.querySelector('.player--0'); //later use to change the background
const player1El = document.querySelector('.player--1'); //later use to switch the background
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0'); // later use to know the current player
const current1El = document.getElementById('current--1'); // later use to know the current player

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');





let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0]; // start with 0 points for bothe the players
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // set values to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //to hide the dice
  diceEl.classList.add('hidden'); // it hide the dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();






const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; // make the score 0 before switching the player
  activePlayer = activePlayer === 0 ? 1 : 0; // if the player is 0 then switch to 1 else switch to 0
  player0El.classList.toggle('player--active'); //switch the backgroung
  player1El.classList.toggle('player--active'); //switch the backgroung
};






// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // use the variable in swtiching dice images

    // 2. Display dice
    // remove hidden calss
    diceEl.classList.remove('hidden');
    // to change the dice image
    diceEl.src = `dice-${dice}.png`; // change the dice image

    // 3. Check for rolled 1
    if (dice !== 1) {
      // add to current score
      currentScore += dice; // currentScore= currentScore + dice
      document.getElementById(  `current--${activePlayer}` ).textContent = currentScore;// line no 8 & 9 & 43
    } else {
      // Switch to next player
      switchPlayer();
      }
  }
});





btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // line 20
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false; // stop the game aftr one of the player is win
      diceEl.classList.add('hidden'); // hide the dice

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player after holding the score
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
