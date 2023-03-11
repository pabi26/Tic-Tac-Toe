let squares = document.querySelectorAll('.square');
let result = document.querySelector('#result');
let restartBtn = document.querySelector('#restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;

function checkWin() {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] && board[i] === board[i+1] && board[i] === board[i+2]) {
      gameWon = true;
      break;
    }
  }
  
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] && board[i] === board[i+3] && board[i] === board[i+6]) {
      gameWon = true;
      break;
    }
  }
  
  // Check diagonals
  if (board[0] && board[0] === board[4] && board[0] === board[8]) {
    gameWon = true;
  } else if (board[2] && board[2] === board[4] && board[2] === board[6]) {
    gameWon = true;
  }
  
  if (gameWon) {
    result.textContent = `Player ${currentPlayer} has won!`;
    squares.forEach(square => square.removeEventListener('click', handleClick));
  } else if (board.every(square => square)) {
    result.textContent = "It's a tie!";
  }
}

function handleClick(e) {
  let squareIndex = Array.from(squares).indexOf(e.target);
  
  if (board[squareIndex] || gameWon) {
    return;
  }
  
  board[squareIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  checkWin();
  
  if (!gameWon) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameWon = false;
  result.textContent = '';
  squares.forEach(square => {
    square.textContent = '';
    square.addEventListener('click', handleClick);
  });
}

squares.forEach(square => square.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);