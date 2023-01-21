const gameBoard = (function() {
    const board = document.getElementById('board');
    const gameArr = ["x", "0"];
    for (i = 0; i < 9; i++) {
        var newDiv = document.createElement('div');
        newDiv.classList.add("board-box");
        board.appendChild(newDiv);
        board.style.gridTemplateColumns = `repeat(${3},1fr)`;
        board.style.gridTemplateRows = `repeat(${3},1fr)`;
    }
    const divs = document.querySelectorAll('.board-box');

    divs.forEach(div => div.addEventListener("click", () => {
        const element = gameArr[0];
        div.textContent = element;
    }));

}());


const mainBoard = (function() {
    const wrapper = document.querySelector(".wrapper");
    const table = document.querySelector(".table");
    const cpuBtn = document.querySelector('.cpu-btn');

    cpuBtn.addEventListener("click", () => {
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
    window.onclick = function(event) {
        if (e.target === myModal) {
            myModal.style.display = "none";
        }
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