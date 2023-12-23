const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameWon = false;
let darkMode = false;

function initializeBoard() {
    board = [];
    gameWon = false;

    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = null;
        }
    }

    drawBoard();
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (board[row][col]) {
                cell.style.backgroundColor = board[row][col];
            }

            boardElement.appendChild(cell);
        }
    }

    updateDarkMode();
}

function handleCellClick(event) {
    if (gameWon) return;

    const clickedCell = event.target;
    const col = clickedCell.dataset.col;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            checkForWin(row, col);
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            drawBoard();
            break;
        }
    }
}

function checkForWin(row, col) {
    if (
        checkDirection(row, col, 0, 1) ||  // Horizontal
        checkDirection(row, col, 1, 0) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal /
        checkDirection(row, col, 1, -1)    // Diagonal \
    ) {
        gameWon = true;
        alert(`${currentPlayer.toUpperCase()} wins!`);
    }
}

function checkDirection(row, col, rowChange, colChange) {
    const player = board[row][col];
    let count = 1;

    // Check in the positive direction
    for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowChange;
        const newCol = col + i * colChange;

        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== player) {
            break;
        }

        count++;
    }

    // Check in the negative direction
    for (let i = 1; i < 4; i++) {
        const newRow = row - i * rowChange;
        const newCol = col - i * colChange;

        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== player) {
            break;
        }

        count++;
    }

    return count >= 4;
}

function restartGame() {
    initializeBoard();
    currentPlayer = 'red';
}

function toggleDarkMode() {
    darkMode = !darkMode;
    updateDarkMode();
}

function updateDarkMode() {
    document.body.style.backgroundColor = darkMode ? '#222' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
}

initializeBoard();