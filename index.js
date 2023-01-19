const gridTable = (function() {
    const board = document.getElementById('board');
    for (i = 0; i < 9; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add("board-box");
        board.appendChild(newDiv);
        board.style.gridTemplateColumns = `repeat(${3},1fr)`;
        board.style.gridTemplateRows = `repeat(${3},1fr)`;
    }
}());