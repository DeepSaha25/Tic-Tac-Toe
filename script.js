let music = new Audio("assets/bgmusic.mp3");
let audioTurn = new Audio("assets/select.mp3");
let winSound = new Audio("assets/win.mp3");

let gover = false;
let turn = "X";

const changeTurn = () => turn === "X" ? "0" : "X";

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    wins.forEach(e =>{
        if(
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            gover = true;
            document.querySelector('.imgbox img').style.width = "200px";
            winSound.play();
        }
    });
};

music.play();

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();

            if (!gover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

reset.addEventListener("click", () => {
    document.querySelectorAll(".boxtext").forEach(e => e.innerText = "");
    turn = "X";
    gover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector('.imgbox img').style.width = "0px";
});