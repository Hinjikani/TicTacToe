function gameBoard(){
  //Create gameboard
  const rows = 3
  const columns = 3
  const board = []

  for (let i = 0; i< rows ; i++) {
    board[i] = [];
    for (let j = 0; j<columns; j++) {
      board[i].push("");
    }
  }
  
  //Return board
  const getBoard = () => board
  
  //Put player's marker
  const mark = (row, column, player) => {

    if (row < 0 || row > 2 || column < 0 || row > 2) {
      console.log(`column ${column} row ${row} is out of range`)
    } else if (board[row][column] === "") {
      board[row][column] = player
    } else {
      console.log(`column ${column} row ${row} is already occupied`)
      return false
    }
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell));
    console.log(boardWithCellValues);
  };
  return {getBoard, mark, printBoard}
};

//Cell (represent one square within the arrays)

function cell(){
  let value = 0;

  const addToken = (player) => {
    value = player
  }
  const getValue = () => value;

  return {addToken, getValue};
}

//gameController for controlling the flow state of the game

function gameController(playerOneName = "Player one", playerTwoName = "Player two"){
  const board = gameBoard();
  const players =[{
    name: playerOneName,
    sign: "X"
  },{
    name: playerTwoName,
    sign: "O"
  }]
  let activePlayer = players[0]

  const switchPlayerTurn = () =>{
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;
  
  //printing Current Round
  let round = 1;
  const printRound = () =>{
    board.printBoard()
    return `Round ${round} ${getActivePlayer().name}'s turn.`
  };
  
  const checkWin = () => {
    currentBoard = board.getBoard()
    // horizontal case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[0][1] &&
    currentBoard[0][1] === currentBoard[0][2]) {
      return(`${getActivePlayer().name} have won the game!!!`)
    } else if (currentBoard[1][0] !== "" &&
    currentBoard[1][0] === currentBoard[1][1]&&
    currentBoard[1][1] === currentBoard[1][2]){
      return(`${getActivePlayer().name} have won the game!!!`)
    } else if (currentBoard[2][0] !== "" &&
    currentBoard[2][0] === currentBoard[2][1] &&
    currentBoard[2][1] === currentBoard[2][2]){
      return(`${getActivePlayer().name} have won the game!!!`)
    }
    // vertical case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[1][0] &&
    currentBoard[1][0] === currentBoard[2][0]){
      return(`${getActivePlayer().name} have won the game!!!`)
    } else if (currentBoard[0][1] !== "" &&
    currentBoard[0][1] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][1]){
      return(`${getActivePlayer().name} have won the game!!!`)
    } else if (currentBoard[0][2] !== "" &&
    currentBoard[0][2] === currentBoard[1][2] &&
    currentBoard[1][2] === currentBoard[2][2]){
      return(`${getActivePlayer().name} have won the game!!!`)
    }
    
    //diagonal case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][2]){
      return(`${getActivePlayer().name} have won the game!!!`)
    } else if (currentBoard[0][2] !== "" &&
    currentBoard[0][2] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][0]){
      return(`${getActivePlayer().name} have won the game!!!`)
    }

    if (currentBoard.every(row => row.every(cell => cell !== ""))){
      return("Game ended in a tie!")
    }
  }

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placing ${getActivePlayer().sign} on ${row} row and ${column}`)
    let markBoard = board.mark(row, column, getActivePlayer().sign)
    let win = checkWin()

    if (win !== undefined){
      return win
    } else if (markBoard === false) {
      return `Invalid`
    } else {
      switchPlayerTurn();
      round ++
      return printRound()
    }
  }

  printRound();
  
  return {
    playRound,
    getActivePlayer
  }
}

function displayController() {
  const game = gameController()
  const TTTGrid = document.querySelector("#TicTacToe-grid")
  const TTTCell = TTTGrid.children
  const currentState = document.querySelector('#currentState')
  let state = `Round 1 ${game.getActivePlayer().name}'s turn.`
  const gridMark = (clicked) => {
  switch (clicked) {
    case 0:
      state = game.playRound(0,0)
      break;
    case 1:
      state = game.playRound(0,1)
      break;
    case 2:
      state = game.playRound(0,2)
      break;
    case 3:
      state = game.playRound(1,0)
      break;
    case 4:
      state = game.playRound(1,1)
      break;
    case 5:
      state = game.playRound(1,2)
      break;
    case 6:
      state = game.playRound(2,0)
      break;
    case 7:
      state = game.playRound(2,1)
      break;
    case 8:
      state = game.playRound(2,2)
      break;
  }
  }
  const gridClick = () =>{
    for (let i = 0; i <TTTCell.length; i++) {
    TTTCell[i].addEventListener('click', () =>{
      if (TTTCell[i].innerHTML !== "") {
          let stateStorage = state
          state = "This cell is occupied :("
          displayState()
          state = stateStorage
          setTimeout(() => {
            displayState()
          }, 2000);
        } else if (state.includes("won")||state.includes("tie")){
          
        } else {
        TTTCell[i].innerHTML = game.getActivePlayer().sign
        gridMark(i)
        displayState()
        }
    })
    }
  }
  
  const displayState = () =>{
    currentState.innerHTML = state
  }
  displayState()
  gridClick()
}

displayController()
// const game = gameController();
