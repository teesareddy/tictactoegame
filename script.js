document.addEventListener("DOMContentLoaded", function() {
    const humanVsHumanBtn = document.getElementById("human-vs-human");
    const humanVsComputerBtn = document.getElementById("human-vs-computer");
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart-btn");

    let currentPlayer = "X";
    let gameActive = true;
    let cells = [];

    humanVsHumanBtn.addEventListener("click", startHumanVsHumanGame);
    humanVsComputerBtn.addEventListener("click", startHumanVsComputerGame);

    function startHumanVsHumanGame() {
        resetGame();
        setCellsEventListener();
    }

    function startHumanVsComputerGame() {
        resetGame();
        setCellsEventListenerForComputer();
    }

    function resetGame() {
        cells = Array.from(document.querySelectorAll(".cell"));
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        status.textContent = "";
        currentPlayer = "X";
        gameActive = true;
    }

    function setCellsEventListener() {
        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });
    }

    function setCellsEventListenerForComputer() {
        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClickForComputer);
        });
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        if (!gameActive || clickedCell.textContent !== "") return;
        placeMark(clickedCell);
        if (checkWin() || checkDraw()) {
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function handleCellClickForComputer(event) {
        const clickedCell = event.target;
        if (!gameActive || clickedCell.textContent !== "") return;
        placeMark(clickedCell);
        if (checkWin() || checkDraw()) {
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
            if (currentPlayer === "O") {
                setTimeout(computerMove, 500);
            }
        }
    }

    function placeMark(cell) {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            cell.classList.add("winner");
            status.textContent = `Player ${currentPlayer} wins!`;
        }
    }

    function checkWin() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningConditions.some(condition => {
            return condition.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return cells.every(cell => {
            return cell.textContent !== "";
        });
    }

    function computerMove() {
        const emptyCells = cells.filter(cell => cell.textContent === "");
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cell = emptyCells[randomIndex];
        placeMark(cell);
        if (checkWin() || checkDraw()) {
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    restartButton.addEventListener("click", resetGame);
});
