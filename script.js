// Get form and game elements
let form = document.getElementById('playerForm');
let game = document.getElementById('game');
let message = document.querySelector('.message');
let cells = document.querySelectorAll('.cell');

// Variables to track players and turns
let p1 = '';
let p2 = '';
let currPlayer = '';
let currSymbol = '';

// Winning combinations (indices of cells)
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  p1 = document.getElementById('player1').value;
  p2 = document.getElementById('player2').value;

  form.style.display = 'none';
  game.style.display = 'block';

  currPlayer = p1;
  currSymbol = 'O';
  message.textContent = `${p1}, you're up`;
});

// Handle cell clicks
function tictactoe(event) {
  const cell = event.target;

  // Ignore if cell already filled or game ended
  if (cell.textContent !== '' || gameOver) return;

  // Place symbol
  cell.textContent = currSymbol;

  // Check for win
  if (checkWin(currSymbol)) {
    message.textContent = `${currPlayer} congratulations you won!`;
    gameOver = true;
    return;
  }

  // Check for draw
  if (isDraw()) {
    message.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  // Switch turns
  if (currPlayer === p1) {
    currPlayer = p2;
    currSymbol = 'x';
  } else {
    currPlayer = p1;
    currSymbol = 'o';
  }
  message.textContent = `${currPlayer}, you're up`;
}

// Check win
function checkWin(symbol) {
  return winCombos.some(combo => {
    return combo.every(index => cells[index].textContent === symbol);
  });
}

// Check draw
function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Track game state
let gameOver = false;

// Attach listeners
cells.forEach(cell => {
  cell.addEventListener('click', tictactoe);
});
