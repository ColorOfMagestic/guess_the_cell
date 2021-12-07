'use strict';

const cells = document.querySelectorAll('td');
const findOut = document.querySelector('.find-out');
const timer = document.querySelector('.timer');
const startOver = document.querySelector('.start_over');

// Добавление атрибутов к ячейкам

function setAttr(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('num', `${i + 1}`);
    }
}
setAttr(cells);

// Генерация случайного числа

let uniqueNums = function () {
    let randomArr = Array.from(
        { length: 15 },
        () => Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    );
    const setArr = new Set(...[randomArr]);
    let uniqueArr = [...setArr].slice(0, 10).sort((a, b) => a - b);
    return uniqueArr;
};

let nums = uniqueNums();

// Таймер
let currTime;

let ooTimer = function () {
    const timerCB = function () {
        const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        timer.textContent = `${minutes}:${seconds}`;
        if (time === 0) {
            alert('Вы проиграли :(');
            resetGame();
            clearInterval(mainTimer);
        }
        time--;
    };
    let time = 60;
    timerCB();
    let mainTimer = setInterval(timerCB, 1000);
    return mainTimer;
};
currTime = ooTimer();

// Имплементация работы программы

let count = 10;
cells.forEach((item) => {
    item.addEventListener('click', function () {
        if (nums.includes(+this.getAttribute('num'))) {
            item.classList.add('is_true');
            count--;
            findOut.textContent = count;
            if (count === 0) {
                alert('Вы нашли их всех!');
                resetGame();
            }
        } else {
            item.classList.add('is_false');
        }
    });
});

startOver.addEventListener('click', resetGame);

function resetGame() {
    count = 10;
    findOut.textContent = count;
    cells.forEach((item) => {
        item.classList.remove('is_true');
        item.classList.remove('is_false');
    });
    nums = uniqueNums();
    clearInterval(currTime);
    currTime = ooTimer();
}
