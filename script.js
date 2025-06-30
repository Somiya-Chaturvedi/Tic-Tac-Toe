console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

// Change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let boxes = document.getElementsByClassName("box");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won!";
            isgameover = true;
            gameover.play();
            document.querySelector(".imgbox img").style.display = "block";

            // Highlight the winning boxes
            e.forEach(i => {
                boxes[i].classList.add("winning-box");
            });

            // Show balloons and confetti
            document.querySelector(".balloons").style.display = "block";
            document.querySelector(".confetti-container").style.display = "block";
        }
    });
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button logic
document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(el => el.innerText = "");

    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgbox img").style.display = "none";
    document.querySelector(".balloons").style.display = "none";
    document.querySelector(".confetti-container").style.display = "none";

    Array.from(boxes).forEach(box => {
        box.classList.remove("winning-box");
    });
});
