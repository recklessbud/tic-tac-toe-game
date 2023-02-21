// TIME FOR THE JAVASCRIPT BABY


// getting and storing the game results for later use
  const gameStatus = document.querySelector('.game-status');

//  setting a game active to true means game is onging
   let gameActive = true;

//   Current player should be equal to a string
   let currentPlayer = 'X';

//  putting the game state(an empty string) into an array of an index 0f 8
  let gameState = ["", "", "", "", "", "", "", "", '', ''];

//   showing the winning ticket
   const winTick = () => `Player ${currentPlayer} won`;

//   showing the draw message
   const drawTick = () => 'Game ended in a draw'

//   telling player is his turn 
  const currentPlayerTurn = () => "It\'s"+ ' ' + currentPlayer  +"s turn"

  
//   tell player is his turn by displaying the message
   gameStatus.innerHTML = currentPlayerTurn();

/* all of the functions that handles all the plays */

// this is the function that handles the cell played
   const handleCellPlayed = (cellActive, attr) =>{
    //    refelct all the moves
       gameState[attr] = currentPlayer;
       cellActive.innerHTML = currentPlayer;
   }

//    this is the function that handles the player change
  function handlePlayerChange(){
       currentPlayer = currentPlayer === "X" ? "O" :'X';
       gameStatus.innerHTML = currentPlayerTurn()
  }

//   this is function that handles results validation
 // wining streaks is a nested array
 let winningStreaks = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
     ]
  function handleResultsValidates() {
     let round = false
    //    creating a loop to loop through the nested array
      for (let index = 0; index <= winningStreaks.length; index++) {
        const winStreaks = winningStreaks[index];
        let n = gameState[winStreaks[0]]
        let k = gameState[winStreaks[1]]
        let y = gameState[winStreaks[2]]

        if (n === `` || k === '' || y === '') {
            continue;
        }
        if (n === k && k === y) {
            round = true
            break;
        }
      }
        if (round) {
            gameStatus.innerHTML = winTick()
            gameActive = false
            return;
        }
  }

  



//  this  handles when  the cell click
   function handleCellClick(e) {
    //   get the target and assign to a variable
      const cellActive = e.target

    //   now its time to get the attributes form the html
      const attr = parseInt(cellActive.getAttribute('data-cell-index'));
    
    // check if the cell is already been played... if the array[index] is not an empty string or not game active
      if (gameState[attr] !== "" || !gameActive) {
          return;
      }
    // if everything is in order then lets GGOOOOO
       handleCellPlayed(cellActive, attr)
       handleResultsValidates()
    }

// handles the button that restarts the game
function handleRestart() {
    gameActive = true
    currentPlayer = "X"
    gameState =["", "", "", "", "", "", "", "", '', ''];
     gameStatus.innerHTML = currentPlayerTurn()
     document.querySelectorAll(".cell").forEach(pop => pop.innerHTML = '')
}

//  storing the cell to a variable
const allCell = document.querySelectorAll(".cell")

// loop through all cell to listen to any click
  allCell.forEach(all =>{
    all.addEventListener("click", handleCellClick);
  })

//   assign the restart btn to its corresponding function
  const btnSolid = document.querySelector('button')
  btnSolid.addEventListener('click', handleRestart)