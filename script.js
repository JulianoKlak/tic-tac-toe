const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameIsActive = true;

const winPatterns = [
    [0, 1, 2], //linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonais
    [2, 4, 6]
];

function checkWin() {
    return winPatterns.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

function checkDraw() {
    return board.every((cell) => cell !== '');
}

function updatePlayerPosition(index) {
        board[index] = currentPlayer;
}

function showMove(cell, index) {
    cell.textContent = board[index];
}

function playTurn(cell, index) {
    updatePlayerPosition(index);
    showMove(cell, index);
}

function showStatusMessage(message) {
    statusText.textContent = message;
}

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    showStatusMessage(`É a vez do Jogador ${currentPlayer}`);
}

function endGame(message) {
    gameIsActive = false;
    showStatusMessage(message);
}

function checkGameResult() {
    if (checkWin()) {
        endGame(`O Jogador ${currentPlayer} ganhou a partida!`);
    } else if (checkDraw()) {
        endGame("O jogo empatou!");
    } else {
        switchPlayer();
    }
}

function isMoveAllowed(index) {
    return board[index] === '' && gameIsActive;
}

function onCellClick(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    if (!isMoveAllowed(index)) return;
    playTurn(event.target, index);
    checkGameResult();  
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameIsActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    showStatusMessage(`É a vez do Jogador ${currentPlayer}`);
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', onCellClick);
});
resetButton.addEventListener('click', resetGame);

// Mostrar status inicial
showStatusMessage(`É a vez do Jogador ${currentPlayer}`);