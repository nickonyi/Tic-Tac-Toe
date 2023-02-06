const grid = () => {
    this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const getCell = () => {
        return cells;
    }
    return { getCell }
}

const getRowValues = () => {
    let proto = grid();
    let wond = grid.getCell;
    let getRowValues = (index) => {
        if (index != 0 && index != 1 && index != 2) {
            alert('Wrong arguments ');
            return undefined;
        }
        let i = index * 3;

        console.log(wond);
    }

    return Object.assign({}, proto, { getRowValues });
}

const newGrid = getRowValues();
console.log(newGrid.getCell());