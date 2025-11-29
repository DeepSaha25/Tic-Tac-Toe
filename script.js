console.log("welcome to MyticTacToe");
let music = new Audio("assets/bgmusic.mp3");
let audioTurn = new Audio("assets/select.mp3");
let gameover = new Audio("assets/gameover.mp3");
let gwin = new Audio("assets/win.mp3");
let gover=false;

let turn="X"

//to change turn
const changeTurn =()=>{
    return turn==="X"?"0":"X"
}

//to check win
const checkWin=()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,6],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText)&&(boxtext[e[0]].innerText !=="")){
            document.querySelector('.info').innerText= boxtext[e[0]].innerText +" Won"
            gover=true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px"
            gwin.play()

        }
    })

}

//Game logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext =element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if(boxtext.innerText ===''){
            boxtext.innerText=turn;
            turn=changeTurn()
            audioTurn.play()
            checkWin();
            if(!gover){
              document.getElementsByClassName("info")[0].innerText="Turn for " + turn; 
            }
           

        }
        
    })
})
//reset

reset.addEventListener('click', () => {
    let boxtexts =document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element=>{
        element.innerText=""
    });
    turn="X"
    gover=false;
    document.getElementsByClassName("info")[0].innerText="Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px"
    
})
