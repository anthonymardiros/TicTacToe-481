const board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
const winStates = [
  // rows
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // columns
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

let player = 'X';
let gameover = false;

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function checkWin() {
  for (let i = 0; i < winStates.length; i++) {
    const state = winStates[i];
    if (board[state[0]] === player &&
        board[state[1]] === player &&
        board[state[2]] === player &&
        board[state[3]] === player) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return board.indexOf('') === -1;
}

function switchPlayer() {
  player = player === 'X' ? 'O' : 'X';
}

function render() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = board[i];
  }
}

function setMessage(msg) {
  message.textContent = msg;
}

function restart() {
  board.fill('');
  player = 'X';
  gameover = false;
  setMessage('');
  render();
}

function handleClick() {
  const row = parseInt(this.dataset.row);
  const col = parseInt(this.dataset.col);
  const idx = row * 4 + col;

  if (gameover || board[idx] !== '') {
    return;
  }

  board[idx] = player;
  render();

  if (checkWin()) {
    gameover = true;
    setMessage(`Player ${player} wins!`);
    return;
  }

  if (checkTie()) {
    gameover = true;
    setMessage('Tie game!');
    return;
  }

  switchPlayer();
  setMessage(`Player ${player}'s turn`);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
document.getElementById('restart').addEventListener('click', restart);
