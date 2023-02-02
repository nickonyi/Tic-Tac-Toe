const mainBoard = (function() {
    const wrapper = document.querySelector('.wrapper');
    const table = document.querySelector('.table');
    const tableAI = document.querySelector('.table-ai');
    const board2 = document.querySelector('#board-2');
    const cpuBtn = document.querySelector('.cpu-btn');
    const playerBtn = document.querySelector('.player-btn');

    console.log(tableAI);
    cpuBtn.addEventListener("click", () => {
        tableAI.style.display = "block";
        wrapper.style.display = "none";
    });
    playerBtn.addEventListener("click", () => {
        tableAI.style.display = "block";
        wrapper.style.display = "none";
    });
}());

const selectMarker = (function() {
    const xMark = document.querySelector('.x-mark');
    const circleMark = document.querySelector('.circle-mark');
    xMark.addEventListener('click', () => {
        if (xMark.classList.contains('circle-mark')) {
            xMark.classList.remove('circle-mark');
            circleMark.classList.add('circle-mark');
        } else {
            xMark.classList.add('circle-mark');
            circleMark.classList.remove('circle-mark');
        }
    });
    circleMark.addEventListener('click', () => {
        if (circleMark.classList.contains('circle-mark')) {
            circleMark.classList.remove('circle-mark');
            xMark.classList.add('circle-mark');
        } else {
            circleMark.classList.add('circle-mark');
            xMark.classList.remove('circle-mark');

        }
    });
}());

const Player = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return { getSign }
}

const gameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];
    const setValue = (index, sign) => {
        board[index] = sign;
    }
    const getValue = (index) => {
        return board[index];
    }
    const reset = () => {
        for (i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { setValue, getValue, reset, board }

}());

const computerBoard = (function() {
    const prototype = gameBoard;
    return Object.assign({}, prototype);
})();
console.log(computerBoard.board);

const displayController = (function() {
    const boardDivs = document.querySelectorAll('.board-box');
    let messageElement = document.querySelector('.turn-sign');
    let alertMessage = document.querySelector('.modal-box-content');
    let modalHeader = document.querySelector('.modal-box-header');
    let myModal = document.getElementById('my-modal');
    let modal = document.getElementById('modal');
    const btnRestart = document.getElementById('btn-restart');
    const btnCancel = document.getElementById('btn-cancel');
    const reset = document.getElementById("reset-btn");
    const numberX = document.querySelector('.number-X');
    const numberO = document.querySelector('.number-O');
    const numberTie = document.querySelector('.number-tie');

    boardDivs.forEach(boardDiv => boardDiv.addEventListener("click", (e) => {
        if (gameController.getIsOver() || e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateBoard();
        markerColor();
    }));


    const markerColor = () => {
        const turnSign = document.querySelectorAll(".board-box");

        for (i = 0; i < turnSign.length; i++) {
            if (gameBoard.getValue(i) == "X") {
                turnSign[i].style.color = "rgb(43, 196, 196)";
            } else {
                turnSign[i].style.color = "rgb(243, 148, 25)";
            }
        }
    };

    const updateBoard = () => {
        for (i = 0; i < boardDivs.length; i++) {

            boardDivs[i].textContent = gameBoard.getValue(i);

        }
    }

    const quit = () => {
        btnRestart.onclick = function() {
            gameBoard.reset();
            gameController.reset();
            updateBoard();
            gameController.resetCounter();
            resetCounter();
            setMessage(`X'S turn`);
            myModal.style.display = "none";
        }
    }

    reset.addEventListener("click", (e) => {
        modalRestart();
        quit();
        btnCancel.onclick = function() {
            myModal.style.display = "none";
        }

    });


    const modalbox = () => {
        setResultMessage(gameController.getPlayerSign());
        modal.style.display = "flex";


        window.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        }

    };

    const modalBoxDraw = () => {
        let modal = document.getElementById('modal');
        setResultMessage('draw');
        modal.style.display = "flex";

        window.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        }

    };

    const modalRestart = function() {
        let myModal = document.getElementById('my-modal');
        myModal.style.display = "flex";
        window.onclick = function(e) {
            if (e.target === myModal) {
                myModal.style.display = "none";
            }
        }

    };

    const resetCounter = () => {
        gameController.resetCounter();
        numberX.textContent = gameController.winnerX;
        numberO.textContent = gameController.winnerO;
        numberTie.textContent = gameController.draw;


    }
    const roundQuit = (function() {
        const quit = document.getElementById("btn-quit");
        const nextRound = document.getElementById("btn-round");
        const wrapper = document.querySelector('.wrapper');
        const table = document.querySelector('.table');

        quit.onclick = function() {
            gameBoard.reset();
            gameController.reset();
            updateBoard();
            resetCounter();
            setMessage(`X'S turn`);
            table.style.display = "none";
            wrapper.style.display = "block";
            modal.style.display = "none";


        }
    }());

    const nextRound = (function() {
        const btnRound = document.getElementById('btn-round');
        btnRound.onclick = function() {
            gameBoard.reset();
            gameController.reset();
            updateBoard();
            modal.style.display = "none";
        }
    }());

    const setResultMessage = (winner) => {
        if (winner === "draw") {
            setDrawMessage("It's a tie yoh!")
        } else {
            setModalMessage(` ${winner} takes the round`);
        }
    }

    const setMessage = (message) => {
        messageElement.textContent = message;
    }

    const setModalMessage = (message) => {

        alertMessage.textContent = message;
    }

    const setDrawMessage = (message) => {
        modalHeader.style.display = "none";
        alertMessage.textContent = message;
    }

    return { setMessage, modalbox, modalBoxDraw }

}());

const gameController = (function() {
    const playerX = Player("X");
    const playerO = Player("O");
    const numberX = document.querySelector('.number-X');
    const numberO = document.querySelector('.number-O');
    const numberTie = document.querySelector('.number-tie');
    let gameOver = false;
    let round = 1;
    let winnerX = 0;
    let draw = 0;
    let winnerO = 0;



    const playRound = (getIndex) => {
        gameBoard.setValue(getIndex, getPlayerSign());
        if (checkWinner(getIndex)) {
            displayController.modalbox();
            if (getPlayerSign() === "X") {
                winnerX++;
                numberX.textContent = winnerX;
            } else {
                winnerO++
                numberO.textContent = winnerO;
            }
            gameOver = true;
            return;
        }


        if (round === 9) {
            displayController.modalBoxDraw();
            draw++;
            numberTie.textContent = draw;
            gameOver = true;
            return;
        }
        round++;
        displayController.setMessage(`${getPlayerSign()}'s turn`);
    }


    const checkWinner = (index) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        return winConditions
            .filter((combination) => combination.includes(index))
            .some((possibleCombinations =>
                possibleCombinations.every(
                    (index) => gameBoard.getValue(index) === getPlayerSign()
                )));

    };


    const getPlayerSign = () => {

        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }


    const getIsOver = () => {
        return gameOver;
    }
    const reset = () => {
        round = 1;
        gameOver = false;
    }
    const resetCounter = () => {
        winnerX = 0;
        winnerO = 0;
        draw = 0;
    }
    return { getIsOver, playRound, reset, getPlayerSign, resetCounter, winnerX, winnerO, draw }
}());