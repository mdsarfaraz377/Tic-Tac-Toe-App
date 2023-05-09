const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelectorAll(".gameInfo");
const btn=document.querySelectorAll(".btn");

let currentPlayer;
let gameGrid;


const winningPositions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7], 
    [2,4,6],
    [2,5,8], 
    [3,4,5],
    [6,7,8] 
];

//let's create function to initialise the game
function initGame(){
      currentPlayer="X";
      gameGrid=["", "", "", "", "", "", "", "", ""];

      //Update on UI 
      boxes.forEach((box,index) => {
        box.innerText = "";
        boxes.style.pointerEvent = "all";

        //if one more thing is missing then initalising box with css properties again
        box.classList = `box box${index+1}`;
      });
      newGameBtn.classList.remove("active");
      gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI update
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}

function checkGameOver() {
    let answer="";

    winningPositions.forEach((position) => {
        //if all 3 should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){
            
            //check if winner is X
            if(gameGrid[position[0]] === X){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvent = "none";
            })

            //Now we X/O is winner then
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //It means if we have a winner then
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active")
    }

    //We know if no winner found  let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
           fillCount++;
    });

    //If board is filled then game is tie
    if(fillCount === 9){
         gameInfo.innerText = "Game Tied !";
         newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
         if(gameGrid[index] === ""){
            boxes[index].innerText = currentPlayer;
            gameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvent = "none";
            //turn on swap
            swapTurn();
            //do check it winner or not?
            checkGameOver();
         }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click", () => {
        handleClick(index);
    })
}
);

newGameBtn.addEventListener("click", initGame);

