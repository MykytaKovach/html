document.addEventListener("DOMContentLoaded", function() {

  const cells = document.getElementsByClassName('cell');
  const circle='<i class="far fa-circle"></i>';
  let board=["","","","","","","","",""];
  const winArray=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const result=document.querySelector('#result');
  const restart=document.querySelector('.button');
  let field =document.querySelector('.field');
  const player1Turn ="Player 1 it's your turn to make a move!"
  const player2Turn ="Player 2 it's your turn to make a move!"
  let player = true;
  const defaultTempalte =
  `<div class="field">
  <div class="cell" id="0"><i ></i></div>
  <div class="cell" id="1"><i></i></div>
  <div class="cell" id="2"><i></i></div>
  <div class="cell" id="3"><i></i></div>
  <div class="cell" id="4"><i></i></div>
  <div class="cell" id="5"><i></i></div>
  <div class="cell" id="6"><i></i></div>
  <div class="cell" id="7"><i></i></div>
  <div class="cell" id="8"><i></i></div>
  </div>`

  function newGame (){
    board = ["","","","","","","","",""];
    field.outerHTML= defaultTempalte;
    result.innerHTML="Make your move!";
    result.className="";
    field=document.querySelector('.field');
    for (let cell of Array.from(cells)){
     cell.addEventListener("click",step);
    };
    player=true;
  }

  function getCell(id){
    return document.getElementById(`${id}`);
  };
  function disable(identificator){
    getCell(identificator).removeEventListener("click",step);
    getCell(identificator).className="disable";
  };
  function endGame(situation){
    result.innerHTML=player?"You won!":"You lost!";
    result.classList.add(player?"green":"red");
    for(let i of situation){
    getCell(i).children[0].classList.add(player?"green":"red");

  }
  for(let i =0;i<9;i++){
    if(board[i] =="")disable(i);
  }
  }
  function checkIfWin(board){
    for(let situation of winArray){

      if(board[situation[0]]!="" && board[situation[0]] == board[situation[1]] && board[situation[1]]==board[situation[2]]){
        endGame(situation);
        }
    }

  };
  function checkIfDraw(){
    for(let i of board){
      if(i=="") return false;
    }
    result.innerHTML="It's draw!"
  }
function step (e ){

  getCell(e.target.id).children[0].classList.add(player?"far":"fas",player?"fa-circle":"fa-times","huge");
  board[+e.target.id] =player?"o":"x";
  disable(e.target.id);
  result.innerHTML=!player?player1Turn:player2Turn;
  checkIfDraw();
  checkIfWin(board);
  player=!player;
}

  for (let cell of Array.from(cells)){
   cell.addEventListener("click",step);
  };
  restart.addEventListener("click",newGame);



});
