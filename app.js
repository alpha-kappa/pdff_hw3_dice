/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 2 on one of dices or has a double value, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach score limit (default is 100) points on GLOBAL score wins the game

*/

const Gamer = function() {
  this.getName = function getName() {
    const name = prompt('Enter player name', 'player ') || getName();
    return name;
  }
  
  this.setScore = function(score) {
    this.score = score;
  }

  this.getScore = function() {
    return this.score;
  }

  this.resetScore = function() {
    this.setScore(0);
  }
}

const Player = function() {
  this.name = this.getName();
  this.score = 0;
}

Player.prototype = new Gamer();

const RESET_VALUE = 2;
const checkChangePlayerCondition = diceValues => (diceValues[0] === diceValues[1]) || diceValues.includes(RESET_VALUE);
const SCORE_LIMIT_DEFAULT = 100; 

let players = [];
let activePlayer = 0;
let current = 0;
let scoreLimit = SCORE_LIMIT_DEFAULT;
const diceElements = [
  document.querySelector('.dice-1'), 
  document.querySelector('.dice-2'),
];
const scoreLimitEl = document.getElementById('score-limit-input');

const initGame = () => {
  players = [
    new Player(), 
    new Player(),
  ]; 

  console.log(players);

  document.querySelector('#name-0').textContent = players[0].name;
  document.querySelector('#name-1').textContent = players[1].name;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = players[0].getScore();
  document.querySelector('#score-1').textContent = players[1].getScore();
  diceElements.forEach(el => el.style.display = 'none');
  scoreLimitEl.value = SCORE_LIMIT_DEFAULT;
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
  

  if (checkChangePlayerCondition(diceValues)) {
    changePlayer();
  } else {
    current += diceValues.reduce((a,b) => a + b);
    document.getElementById('current-'+activePlayer).textContent = current;

    if (players[activePlayer].getScore() + current >= scoreLimit) {
      alert(`${players[activePlayer].name} won!!!`);
    }
    
  }
});

scoreLimitEl.addEventListener('input', function(e) {
  scoreLimit = Math.max(0, parseInt(e.currentTarget.value)) || SCORE_LIMIT_DEFAULT;
})

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElements.forEach(el => el.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  players[activePlayer].setScore(players[activePlayer].getScore() + current);
  document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});


function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1
}