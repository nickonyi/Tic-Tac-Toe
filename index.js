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