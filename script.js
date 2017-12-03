// FUNCTIONS
function setGameElements() {
  switch(gameState) {
    case 'started':
      newGameDiv.style.display = 'none';
      playerPickDiv.style.display = 'block';
      currentResultDiv.style.display = 'block';
      break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
      playerSelectionSpan.innerHTML = 
      computerSelectionSpan.innerHTML = 
      playerResultSpan.innerHTML = 
      computerResultSpan.innerHTML = '';
    case 'notStarted':
    default:
      newGameDiv.style.display = 'block';
      playerPickDiv.style.display = 'none';
      currentResultDiv.style.display = 'none';
  }
}

function setGamePoints() {
  playerPointsSpan.innerHTML = player.score;
  computerPointsSpan.innerHTML = computer.score;
}

function startNewGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameSpan.innerHTML = player.name;
    setGamePoints();
  }
}

function getComputerPick() {
  var possiblePicks = ['Rock', 'Paper', 'Scissors'];
  return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultSpan.innerHTML = computerResultSpan.innerHTML = '';
  playerResultSpan.className = computerResultSpan.className = '';

  var winner = 'Player';

    if (playerPick == computerPick) {
        winner = 'none';
    } else if (
      (computerPick == 'Rock' &&  playerPick == 'Scissors') ||
      (computerPick == 'Scissors' &&  playerPick == 'Paper') ||
      (computerPick == 'Paper' &&  playerPick == 'Rock')) {
        winner = 'Computer';
    }

    if (winner == 'Player') {
      playerResultSpan.innerHTML = "Win!";
      playerResultSpan.className = 'win';
      computerResultSpan.innerHTML = "Loss";
      player.score++;
    } else if (winner == 'Computer') {
      playerResultSpan.innerHTML = "Loss";
      computerResultSpan.innerHTML = "Win!";
      computerResultSpan.className = 'win';
      computer.score++;
    } else {
      playerResultSpan.innerHTML = "Tie";
      computerResultSpan.innerHTML = "Tie";
    }

    setGamePoints();
}

function checkGameEnd() {
  if (player.score === endGameResult || computer.score === endGameResult) {
    gameState = 'ended';
    setGameElements();
    var winner = '';
    if (player.score === endGameResult) {
      winner = player.name;
    }
    else {
      winner = 'Computer';
    }
    alert('The winner is: '+winner);
  }
}

function getResultClass(playerPick) {
  var className = '';
  if (playerPick == 'Rock') {
    className = 'label label-success';
  } else if (playerPick == 'Paper') {
    className = 'label label-warning';
  } else if (playerPick == 'Scissors') {
    className = 'label label-danger';
  } else {
    className = '';
  }
  return className;
}

function registerPlayersPicks(playerPick) {
  var computerPick = getComputerPick();

  playerSelectionSpan.innerHTML = playerPick;
  playerSelectionSpan.className = getResultClass(playerPick);
  computerSelectionSpan.innerHTML = computerPick;
  computerSelectionSpan.className = getResultClass(computerPick);

  checkRoundWinner(playerPick, computerPick);
  checkGameEnd();
}

// HTML VARIABLES
var newGameDiv = document.getElementById('newGameDiv');
var newGameBtn = document.getElementById('newGameBtn');

var playerPickDiv = document.getElementById('playerPickDiv');
var playerPickBtnRock = document.getElementById('playerPickBtnRock');
var playerPickBtnPaper = document.getElementById('playerPickBtnPaper');
var playerPickBtnScissors = document.getElementById('playerPickBtnScissors');

var currentResultDiv = document.getElementById('currentResultDiv');
var playerNameSpan = document.getElementById('playerNameSpan');

var playerPointsSpan = document.getElementById('playerPointsSpan');
var computerPointsSpan = document.getElementById('computerPointsSpan');

var playerSelectionSpan = document.getElementById('playerSelectionSpan');
var computerSelectionSpan = document.getElementById('computerSelectionSpan');

var playerResultSpan = document.getElementById('playerResultSpan');
var computerResultSpan = document.getElementById('computerResultSpan');

// LISTENERS
newGameBtn.addEventListener('click', startNewGame);

// playerPickBtnRock.addEventListener('click', registerPlayersPicks('rock'));
playerPickBtnRock.addEventListener('click', function() { registerPlayersPicks('Rock') });
playerPickBtnPaper.addEventListener('click', function() { registerPlayersPicks('Paper') });
playerPickBtnScissors.addEventListener('click', function() { registerPlayersPicks('Scissors') });

// MAIN
var gameState = 'notStarted';  //started // ended
var endGameResult = 10;
var player = {
  name: '',
  score: 0
};
var computer = {
  score: 0
};

setGameElements();
