const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const selection = document.getElementById('selection');
const selectXButton = document.getElementById('selectX');
const selectOButton = document.getElementById('selectO');
let oTurn;
let playerClass;
let opponentClass;

selectXButton.addEventListener('click', () => startGame(X_CLASS, O_CLASS));
selectOButton.addEventListener('click', () => startGame(O_CLASS, X_CLASS));
restartButton.addEventListener('click', resetGame);

function startGame(player, opponent) {
    playerClass = player;
    opponentClass = opponent;
    oTurn = player === O_CLASS;
    selection.classList.add('hidden');
    board.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    messageElement.innerText = '';
}

function resetGame() {
    selection.classList.remove('hidden');
    board.classList.add('hidden');
    restartButton.classList.add('hidden');
    messageElement.innerText = '';
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? opponentClass : playerClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        messageElement.innerText = 'Draw!';
    } else {
        messageElement.innerText = `${oTurn ? opponentClass : playerClass} Wins!`;
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(opponentClass);
    } else {
        board.classList.add(playerClass);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
