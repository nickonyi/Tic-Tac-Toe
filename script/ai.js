//GLOBAL VARIABLES
let moves = 0;
let winner = 0;
let x = 1;
let o = 3;
let player = x;
let computer = o;
let whoseTurn = x;
let gameOver = false;
let score = {
    computer: 0,
    player: 0,
    ties: 0
}
let xText = "<span class=\"x\">&times;</class>";
let oText = "<span class=\"o\">o</class>";
let playerText = xText;
let computerText = oText;
let difficulty = 1;
let myGrid = null;
let modal = document.getElementById('modal');
let modal2 = document.getElementById('my-modal');



//==================================
// HELPER FUNCTIONS
//==================================
const sumArray = (array) => {
    let sum = 0;
    for (i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

const isInArray = (element, array) => {
    if (array.indexOf(element) > -1) {
        return true
    }
    return false;
}

const shuffleArray = (array) => {
    let counter = array.length;
    let temp;
    let index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

const intRandom = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//GRID FUNCTION
function Grid() {
    this.cells = new Array(9);

}

//grid methods
Grid.prototype.getFreeCellIndices = function() {
    var i = 0,
        resultArray = [];
    for (i = 0; i < this.cells.length; i++) {
        if (this.cells[i] === 0) {
            resultArray.push(i);
        }
    }
    // console.log("resultArray: " + resultArray.toString());
    // debugger;
    return resultArray;
};

// Get a row (accepts 0, 1, or 2 as argument).
// Returns the values of the elements.
Grid.prototype.getRowValues = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowValues!");
        return undefined;
    }
    var i = index * 3;
    return this.cells.slice(i, i + 3);
};

// Get a row (accepts 0, 1, or 2 as argument).
// Returns an array with the indices, not their values.
Grid.prototype.getRowIndices = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowIndices!");
        return undefined;
    }
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row;
};

// get a column (values)
Grid.prototype.getColumnValues = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumnValues!");
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(this.cells[i]);
    }
    return column;
};

// get a column (indices)
Grid.prototype.getColumnIndices = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumnIndices!");
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(i);
    }
    return column;
};

// get diagonal cells
// arg 0: from top-left
// arg 1: from top-right
Grid.prototype.getDiagValues = function(arg) {
    var cells = [];
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagValues!");
        return undefined;
    } else if (arg === 0) {
        cells.push(this.cells[0]);
        cells.push(this.cells[4]);
        cells.push(this.cells[8]);
    } else {
        cells.push(this.cells[2]);
        cells.push(this.cells[4]);
        cells.push(this.cells[6]);
    }
    return cells;
};

// get diagonal cells
// arg 0: from top-left
// arg 1: from top-right
Grid.prototype.getDiagIndices = function(arg) {
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    } else if (arg === 0) {
        return [0, 4, 8];
    } else {
        return [2, 4, 6];
    }
};

// Get first index with two in a row (accepts computer or player as argument)
Grid.prototype.getFirstWithTwoInARow = function(agent) {
    if (agent !== computer && agent !== player) {
        console.error("Function getFirstWithTwoInARow accepts only player or computer as argument.");
        return undefined;
    }
    var sum = agent * 2,
        freeCells = shuffleArray(this.getFreeCellIndices());
    for (var i = 0; i < freeCells.length; i++) {
        for (var j = 0; j < 3; j++) {
            var rowV = this.getRowValues(j);
            var rowI = this.getRowIndices(j);
            var colV = this.getColumnValues(j);
            var colI = this.getColumnIndices(j);
            if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
                return freeCells[i];
            } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
                return freeCells[i];
            }
        }
        for (j = 0; j < 2; j++) {
            var diagV = this.getDiagValues(j);
            var diagI = this.getDiagIndices(j);
            if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
                return freeCells[i];
            }
        }
    }
    return false;
};

Grid.prototype.reset = function() {
    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = 0;
    }
    return true;
};

function initialize() {
    myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = player;

    for (i = 0; i <= myGrid.cells.length - 1; i++) {
        myGrid.cells[i] = 0;
    }

    //setTimeout(showOptions, 500);



}

const cellClicked = (id) => {
    let idName = id.toString();
    let cell = parseInt(idName[idName.length - 1]);
    let cellId = document.getElementById(id);


    if (myGrid.cells[cell] > 0 || whoseTurn !== player || gameOver || cellId.textContent != "") {

        return false;
    }
    myGrid.cells[cell] = player;

    moves++;
    cellId.innerHTML = playerText;


    if (moves >= 5) {
        winner = checkWin();
    }
    if (winner === 0) {
        whoseTurn = computer;
        makeComputerMove();
    }
    return true;
}

const makeComputerMove = () => {
    // debugger;
    if (gameOver) {
        return false;
    }
    var cell = -1,
        myArr = [],
        corners = [0, 2, 6, 8];
    if (moves >= 3) {
        cell = myGrid.getFirstWithTwoInARow(computer);

        if (cell === false) {
            cell = myGrid.getFirstWithTwoInARow(player);

        }
        if (cell === false) {
            if (myGrid.cells[4] === 0 && difficulty == 1) {
                cell = 4;
            } else {
                myArr = myGrid.getFreeCellIndices();
                cell = myArr[intRandom(0, myArr.length - 1)];
            }
        }
        // Avoid a catch-22 situation:
        if (moves == 3 && myGrid.cells[4] == computer && player == x && difficulty == 1) {
            if (myGrid.cells[7] == player && (myGrid.cells[0] == player || myGrid.cells[2] == player)) {
                myArr = [6, 8];
                cell = myArr[intRandom(0, 1)];
            } else if (myGrid.cells[5] == player && (myGrid.cells[0] == player || myGrid.cells[6] == player)) {
                myArr = [2, 8];
                cell = myArr[intRandom(0, 1)];
            } else if (myGrid.cells[3] == player && (myGrid.cells[2] == player || myGrid.cells[8] == player)) {
                myArr = [0, 6];
                cell = myArr[intRandom(0, 1)];
            } else if (myGrid.cells[1] == player && (myGrid.cells[6] == player || myGrid.cells[8] == player)) {
                myArr = [0, 2];
                cell = myArr[intRandom(0, 1)];
            }
        } else if (moves == 3 && myGrid.cells[4] == player && player == x && difficulty == 1) {
            if (myGrid.cells[2] == player && myGrid.cells[6] == computer) {
                cell = 8;
            } else if (myGrid.cells[0] == player && myGrid.cells[8] == computer) {
                cell = 6;
            } else if (myGrid.cells[8] == player && myGrid.cells[0] == computer) {
                cell = 2;
            } else if (myGrid.cells[6] == player && myGrid.cells[2] == computer) {
                cell = 0;
            }
        }
    } else if (moves === 1 && myGrid.cells[4] == player && difficulty == 1) {
        // if player is X and played center, play one of the corners
        cell = corners[intRandom(0, 3)];
    } else if (moves === 2 && myGrid.cells[4] == player && computer == x && difficulty == 1) {
        // if player is O and played center, take two opposite corners
        if (myGrid.cells[0] == computer) {
            cell = 8;
        } else if (myGrid.cells[2] == computer) {
            cell = 6;
        } else if (myGrid.cells[6] == computer) {
            cell = 2;
        } else if (myGrid.cells[8] == computer) {
            cell = 0;
        }
    } else if (moves === 0 && intRandom(1, 10) < 8) {
        // if computer is X, start with one of the corners sometimes
        cell = corners[intRandom(0, 3)];
    } else {
        // choose the center of the board if possible
        if (myGrid.cells[4] === 0 && difficulty == 1) {
            cell = 4;
        } else {
            myArr = myGrid.getFreeCellIndices();
            cell = myArr[intRandom(0, myArr.length - 1)];
        }
    }
    var id = "cell" + cell.toString();
    console.log("computer chooses " + id);
    document.getElementById(id).innerHTML = computerText;
    document.getElementById(id).style.cursor = "default";


    myGrid.cells[cell] = computer;
    moves++;
    if (moves >= 5) {
        winner = checkWin();
    }
    if (winner === 0 && !gameOver) {
        whoseTurn = player;
    }
    return true;
}

function checkWin() {
    winner = 0;

    // rows
    for (var i = 0; i <= 2; i++) {
        var row = myGrid.getRowValues(i);
        if (row[0] > 0 && row[0] == row[1] && row[0] == row[2]) {
            if (row[0] == computer) {
                score.computer++;
                winner = computer;
                console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                console.log("player wins");
            }

            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // columns
    for (i = 0; i <= 2; i++) {
        var col = myGrid.getColumnValues(i);
        if (col[0] > 0 && col[0] == col[1] && col[0] == col[2]) {
            if (col[0] == computer) {
                score.computer++;
                winner = computer;
                // console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                // console.log("player wins");
            }

            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // diagonals
    for (i = 0; i <= 1; i++) {
        var diagonal = myGrid.getDiagValues(i);
        if (diagonal[0] > 0 && diagonal[0] == diagonal[1] && diagonal[0] == diagonal[2]) {
            if (diagonal[0] == computer) {
                score.computer++;
                winner = computer;
                // console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                // console.log("player wins");
            }

            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // If we haven't returned a winner by now, if the board is full, it's a tie
    var myArr = myGrid.getFreeCellIndices();
    if (myArr.length === 0) {
        winner = 10;
        score.ties++;
        endGame(winner);
        return winner;
    }

    return winner;
}

function announceWinner(text) {
    const modal = document.getElementById("modal");
    const modalHeader = document.querySelector(".modal-box-header");
    const winningMessage = document.querySelector(".winning-message");


    modal.style.display = "block";
    modalHeader.textContent = text;
    if (winner == computer) {
        winningMessage.textContent = `O takes the round`;
    } else if (winner == player) {
        winningMessage.textContent = `X takes the round`;
    } else {
        winningMessage.textContent = `Looks like you have locked horns!`;
    }



    //setTimeout(closeModal, 1400, "winAnnounce");
}


function endGame(who) {
    if (who == player) {
        announceWinner("Congratulations, you won!");
    } else if (who == computer) {
        announceWinner("Computer wins!");
    } else {
        announceWinner("It's a tie!");
    }
    gameOver = true;
    whoseTurn = 0;
    moves = 0;
    winner = 0;
    document.getElementById("computer_score").innerHTML = score.computer;
    document.getElementById("tie_score").innerHTML = score.ties;
    document.getElementById("player_score").innerHTML = score.player;
    for (var i = 0; i <= 8; i++) {
        var id = "cell" + i.toString();
        document.getElementById(id).style.cursor = "default";
    }
    nextRound();

    // setTimeout(restartGame, 800);
}

function update() {
    const boardBxs = document.querySelectorAll('.board-box');
    for (i = 0; i < boardBxs.length; i++) {
        boardBxs[i].innerHTML = "";
    }

}


const nextRound = function() {
    const btnRound = document.getElementById("btn-round");

    btnRound.addEventListener("click", () => {
        myGrid.reset();
        update();
        modal.style.display = "none";
    })
    initialize();
};

const quit = (function() {
    const quitBtn = document.getElementById("btn-quit");
    quitBtn.onclick = function() {
        initialize();
        update();
        modal.style.display = "none";
        window.location.href = "index.html"
    }
}());


const exit = (function() {
    window.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    }
}());

const gameRestart = (function() {
    const resetBtn = document.getElementById("reset-btn");
    resetBtn.onclick = function() {
        modal2.style.display = "block";
    }
}());
const resetScore = () => {
    score.computer = 0;
    score.player = 0;
    score.ties = 0;
}
const updateScore = () => {
    document.getElementById("computer_score").innerHTML = score.computer;
    document.getElementById("tie_score").innerHTML = score.ties;
    document.getElementById("player_score").innerHTML = score.player;
}



const gameReset = (function() {
    const btnRestart = document.getElementById("btn-restart");
    btnRestart.onclick = function() {
        initialize();
        resetScore();
        updateScore();
        update();
        modal2.style.display = "none";
    }
}());

const cancelReset = (function() {
    const btnCancel = document.getElementById("btn-cancel");
    btnCancel.onclick = function() {
        modal2.style.display = "none";
    }
}());