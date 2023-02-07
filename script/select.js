let player = 'x';
let computer = 'o';

function Grid() {
    this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

Grid.prototype.getRowValues = function(index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowValues!");
        return undefined;
    }
    var i = index * 3;
    return this.cells.slice(i, i + 3);
};

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

Grid.prototype.getFirstWithTwoInARow = function(agent) {
    if (agent !== computer && agent !== player) {
        console.error("Function getFirstWithTwoInARow accepts only player or computer as argument.");
        return undefined;
    }
    var sum;
    console.log(sum = agent * 2);
    //freeCells = shuffleArray(this.getFreeCellIndices());
    // for (var i = 0; i < freeCells.length; i++) {
    //     for (var j = 0; j < 3; j++) {
    //         var rowV = this.getRowValues(j);
    //         var rowI = this.getRowIndices(j);
    //         var colV = this.getColumnValues(j);
    //         var colI = this.getColumnIndices(j);
    //         if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
    //             return freeCells[i];
    //         } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
    //             return freeCells[i];
    //         }
    //     }
    //     for (j = 0; j < 2; j++) {
    //         var diagV = this.getDiagValues(j);
    //         var diagI = this.getDiagIndices(j);
    //         if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
    //             return freeCells[i];
    //         }
    //     }
    // }
    return false;
};
const newGrid = new Grid();
//console.log(newGrid.getRowValues(0));
//console.log(newGrid.getRowIndices(0));
//console.log(newGrid.getColumnValues(0));
//console.log(newGrid.getDiagValues(1));
console.log(newGrid.getFirstWithTwoInARow(computer));

const arrayy = [1, 2, 3];
const shuffleArray = (array) => {
    let counter = array.length;
    let temp;
    let index;
    while (counter > 0) {
        console.log(index = Math.floor(Math.random() * counter));
        counter--;
        console.log(temp = array[counter]);
        console.log(array[counter] = array[index]);
        array[index] = temp;
    }
    return array;
}

console.log(shuffleArray(arrayy));