//GLOBAL VARIABLES
let moves = 0;
let winner = 0;
let x = 1;
let o = 3;
let player = "x";
let computer = "o";
let whoseTurn = "x";
let gameOver = false;
let score = {
    computer: 0,
    player: 0,
    tie: 0
}
let xText = "<span class=\"x\">&times;</class>";
let oText = "<span class=\"o\">o</class>";
let playerText = xText;
let computerText = oText;
let difficulty = 1;
let myGrid = null;


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
const grid = () => {
    this.cells = new Array(9);

    const getCells = () => {
        return cells;
    }

    return { getCells }
};

//grid methods
const getFreeCellIndices = () => {
    let proto = grid()
    const getFreeCellIndices = () => {
        let resultArray = [];
        for (i = 0; i < this.cells.length; i++) {
            if (this.cells[i] == 0) {
                resultArray.push(i);
            }
        }
        return resultArray;
    }
    return Object.assign({}, proto, { getFreeCellIndices });
};

const getRowValues = (index) => {
    let proto = grid();
    let getRowValues = () => {
        if (index != 0 && index != 1 && index != 2) {
            alert('Wrong arguments ');
            return undefined;
        }
        let i = index * 3;

        return this.cells.slice(i, i + 3);
    }

    return Object.assign({}, proto, { getRowValues });
}

const getRowIndices = (index) => {
    let proto = grid();
    const getRowIndices = () => {
        if (index !== 0 && index !== 1 && index !== 2) {
            console.error("Wrong arg for getRowIndices!");
            return undefined;
        }

        let row = [];
        index = index * 3;
        row.push(index);
        row.push(index + 1);
        row.push(index + 2);

        return row;
    }
    return Object.assign({}, proto, { getRowIndices });
}

const getColumnValues = (index) => {
    const getColumnValues = () => {
        let i = 0;
        let column = [];

        for (i = index; this.cells.length; i += 3) {
            column.push(this.cells[i]);
        }
        return column;
    }

    return Object.assign({}, proto, { getColumnValues });
}

const getColumnIndices = (index) => {
    const proto = grid();
    const getColumnIndices = () => {
        if (index !== 0 && index !== 1 && index !== 2) {
            console.log("Wrong arguments for get column indices");
            return undefined;
        } else {
            let column = [];
            for (i = index; i < this.cells.length; i += 3) {
                column.push(i);
            }
        }
        return column;
    }
    return Object.assign({}, proto, { getColumnIndices });
}

const getDiagValues = (arg) => {
    const proto = grid();
    let cells = [];
    const getDiagValues = () => {
        if (arg !== 1 && arg !== 0) {
            console.log("Wrong arguments for diagonal values");
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
    }


    return Object.assign({}, proto, { getDiagValues });
}

const getDiagIndices = (arg) => {
    const proto = grid();

    const getDiagIndices = () => {
        if (arg !== 1 && arg !== 0) {
            console.error("Wrong arg for getDiagIndices!");
            return undefined;
        } else if (arg === 0) {
            return [0, 4, 8];
        } else {
            return [2, 4, 6];
        }
    }
    return Object.assign({}, proto, { getDiagIndices });
}

const getFirstWithTwoInARow = (agent) => {
    const proto = grid();
    const getFirstWithTwoInARow = () => {
        if (agent !== computer && agent !== player) {
            console.error("Function getFirstWithTwoInARow accepts only player or computer as argument.");
            return undefined;
        } else {
            let sum = agent * 2;
            let freeCells = shuffleArray(this.getFreeCellIndices.getFreeCellIndices());
            for (i = 0; i < freeCells.length; i++) {
                for (j = 0; j < 3; j++) {
                    let rowV = this.getRowValues(j);
                    let rowI = this.getRowValues(j);
                    let columnV = this.getColumnValues(j);
                    let columnI = this.getColumnValues(j);
                }
            }
        }
    }

    return Object.assign({}, proto, getFirstWithTwoInARow);
}