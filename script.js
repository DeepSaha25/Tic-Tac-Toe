let bg = document.getElementById("bg");
let tick = document.getElementById("tick");
let winS = document.getElementById("win");
let gOverS = document.getElementById("gameover");
let soundOn = true;

let modeSelect = document.getElementById("modeSelect");
let darkToggle = document.getElementById("darkToggle");
let soundToggle = document.getElementById("soundToggle");
let resetBtn = document.getElementById("reset");
let status = document.getElementById("status");
let boardEl = document.getElementById("board");
let boxes = Array.from(document.querySelectorAll(".box"));
let img = document.querySelector(".imgbox img");
let winLine = document.getElementById("winLine");

let turn = "X";
let gover = false;
let boardState = ["","","","","","","","",""];

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function playSound(a){
  if(!soundOn) return;
  a.currentTime = 0;
  a.play();
}

function updateStatus(){
  if(!gover) status.innerText = "Turn for " + turn;
}

function showWinLine(startIdx,endIdx){
  let start = boxes[startIdx].getBoundingClientRect();
  let end = boxes[endIdx].getBoundingClientRect();
  let parent = boardEl.getBoundingClientRect();
  let x1 = start.left + start.width/2 - parent.left;
  let y1 = start.top + start.height/2 - parent.top;
  let x2 = end.left + end.width/2 - parent.left;
  let y2 = end.top + end.height/2 - parent.top;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let len = Math.hypot(dx,dy);
  let angle = Math.atan2(dy,dx) * 180 / Math.PI;
  winLine.style.display = "block";
  winLine.style.left = (x1) + "px";
  winLine.style.top = (y1 - 3) + "px";
  winLine.style.width = "0px";
  winLine.style.transform = `rotate(${angle}deg)`;
  setTimeout(()=>{ winLine.style.width = len + "px"; },20);
}

function hideWinLine(){
  winLine.style.display = "none";
  winLine.style.width = "0px";
}

function checkWin(){
  for(let combo of wins){
    let [a,b,c] = combo;
    if(boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c]){
      status.innerText = boardState[a] + " Won!";
      gover = true;
      playSound(winS);
      showWinLine(combo[0],combo[2]);
      img.style.width = "200px";
      return true;
    }
  }
  if(boardState.every(x=>x!=="")){
    status.innerText = "Draw!";
    gover = true;
    playSound(gOverS);
    return false;
  }
  return false;
}

function makeMove(idx, player){
  if(boardState[idx] !== "" || gover) return false;
  boardState[idx] = player;
  boxes[idx].querySelector(".boxtext").innerText = player;
  playSound(tick);
  checkWin();
  turn = (player === "X") ? "0" : "X";
  if(!gover) updateStatus();
  return true;
}

function resetGame(){
  boardState = ["","","","","","","","",""];
  boxes.forEach(b=> b.querySelector(".boxtext").innerText = "");
  turn = "X";
  gover = false;
  status.innerText = "Turn for " + turn;
  img.style.width = "0px";
  hideWinLine();
}

function indexOfWinningMove(player){
  for(let i=0;i<9;i++){
    if(boardState[i]===""){
      boardState[i]=player;
      let win = wins.some(c => boardState[c[0]]===player && boardState[c[1]]===player && boardState[c[2]]===player);
      boardState[i]="";
      if(win) return i;
    }
  }
  return -1;
}

function aiMove(){
  if(gover) return;
  let ai = "0", human = "X";
  if(turn==="X"){ ai="X"; human="0"; } // if AI plays X (not used normally)
  let idx = indexOfWinningMove("0");
  if(idx === -1) idx = indexOfWinningMove("X");
  if(idx === -1){
    if(boardState[4] === "") idx = 4;
  }
  if(idx === -1){
    let empties = boardState.map((v,i)=> v===""?i:null).filter(v=>v!==null);
    idx = empties[Math.floor(Math.random()*empties.length)];
  }
  if(idx!==-1) makeMove(idx, "0");
}

boxes.forEach(box=>{
  box.addEventListener("click", ()=>{
    let idx = parseInt(box.dataset.index,10);
    if(boardState[idx] === "" && !gover){
      makeMove(idx, turn);
      if(!gover && modeSelect.value === "pva" && turn === "0"){
        setTimeout(()=>{ aiMove(); }, 300);
      }
    }
  });
});

resetBtn.addEventListener("click", ()=>{
  resetGame();
});

darkToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  darkToggle.innerText = document.body.classList.contains("dark") ? "Light" : "Dark";
});

soundToggle.addEventListener("click", ()=>{
  soundOn = !soundOn;
  soundToggle.innerText = soundOn ? "🔊" : "🔇";
  if(soundOn) bg.play().catch(()=>{});
  else { bg.pause(); bg.currentTime=0; }
});

modeSelect.addEventListener("change", ()=>{
  resetGame();
});

window.addEventListener("load", ()=>{
  bg.volume = 0.15;
  tick.volume = 0.6;
  winS.volume = 0.8;
  gOverS.volume = 0.8;
  if(soundOn) bg.play().catch(()=>{});
  updateStatus();
});
