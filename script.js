let form = document.getElementById('playerForm');
let game = document.getElementById('game');
let message = document.querySelector('.message');
let cells = document.querySelectorAll('.cell');

let p1 = '';
let p2 = '';
let currPlayer = '';
let currSymbol = '';
let gameOver = false;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  p1 = document.getElementById('player1').value;
  p2 = document.getElementById('player2').value;

  form.style.display = 'none';
  game.style.display = 'block';

  currPlayer = p1;
  currSymbol = 'x';

  message.textContent = `${p1}, you're up`;
});

function tictactoe(event) {
  const cell = event.target;

  if (cell.textContent !== '' || gameOver) return;

  cell.textContent = currSymbol;

  // check win
  if (checkWin(currSymbol)) {
    message.textContent = `${currPlayer} congratulations you won!`;
    gameOver = true;
    return;
  }

  // check draw
  if (isDraw()) {
    message.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  // switch player
  if (currPlayer === p1) {
    currPlayer = p2;
    currSymbol = 'o';
  } else {
    currPlayer = p1;
    currSymbol = 'x';
  }

  message.textContent = `${currPlayer}, you're up`;
}

function checkWin(symbol) {
  return winCombos.some(combo => {
    return combo.every(index => {
      return document.getElementById(index + 1).textContent === symbol;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// attach listeners
cells.forEach(cell => {
  cell.addEventListener('click', tictactoe);
});