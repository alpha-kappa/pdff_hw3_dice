/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 1;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const diceElements = [
  document.querySelector('.dice-1'), 
  document.querySelector('.dice-2'),
];

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElements.forEach(el => el.style.display = 'none');
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let diceValues = [
    getRandomDiceValue(),
    getRandomDiceValue(),
  ];

  diceElements.forEach((el, idx) => {
    el.src = `dice-${diceValues[idx]}.png`;
    el.style.display = 'block';
  })
  

  if (diceValues.includes(RESET_VALUE)) {
    changePlayer();
  } else {
    current += diceValues.reduce((a,b) => a + b);
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= 20) {
      alert(`Player ${activePlayer} won!!!`);
    }
    
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElements.forEach(el => el.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});


function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1
}