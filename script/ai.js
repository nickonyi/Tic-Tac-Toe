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
    return Object.assign({}, proto);
};

const newB = getFreeCellIndices();