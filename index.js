const mainBoard = (function() {
    const wrapper = document.querySelector('.wrapper');
    const table = document.querySelector('.table');
    const cpuBtn = document.querySelector('.cpu-btn');
    const playerBtn = document.querySelector('.player-btn');

    cpuBtn.addEventListener("click", () => {
        table.style.display = "block";
        wrapper.style.display = "none";
    });
    playerBtn.addEventListener("click", () => {
        table.style.display = "block";
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

const modalbox = (function() {
    let modal = document.getElementById('modal');
    let btn = document.getElementById('btn');
    btn.onclick = function() {
        modal.style.display = "flex";
    };
    window.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    }

}());
const modalbox2 = function() {
    let myModal = document.getElementById('my-modal');
    let btn = document.getElementById('btn-btn');
    btn.onclick = function() {
        myModal.style.display = "flex";
    };
    window.onclick = function(e) {
        if (e.target === myModal) {
            myModal.style.display = "none";
        }
    }

};

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

    return { setValue, getValue, reset }

}());


const displayController = (function() {
    const boardDivs = document.querySelectorAll('.board-box');
    boardDivs.forEach(boardDiv => boardDiv.addEventListener("click", (e) => {
        if (gameController.getIsOver() || e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateBoard();
    }));

    const updateBoard = () => {
        for (i = 0; i < boardDivs.length; i++) {
            boardDivs[i].textContent = gameBoard.getValue(i);
        }
    }


    const reset = document.getElementById("reset-btn");
    reset.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateBoard();
    });



}());

const gameController = (function() {
    const playerX = Player("X");
    const playerO = Player("O");
    let gameOver = false


    let round = 1;

    const playRound = (getIndex) => {
        gameBoard.setValue(getIndex, getPlayerSign());

        if (round === 9) {
            console.log("Is Over");
            gameOver = true;
        }
        round++;
    }


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
    return { getIsOver, playRound, reset }
}());