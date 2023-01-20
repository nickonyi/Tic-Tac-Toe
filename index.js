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

const modalbox = (function() {
    let modal = document.getElementById('modal');
    let btn = document.getElementById('btn');
    btn.onclick = function() {
        modal.style.display = "flex";
    };
    window.onclick = function(event) {
        console.log(event.target);
    }

}());
const modalbox2 = (function() {
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

}());