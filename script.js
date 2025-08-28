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
  let round = 0;
  const printRound = () =>{
    board.printBoard()
    console.log(`Round ${round} ${getActivePlayer().name}'s turn.`)
  };
  
  const checkWin = () => {
    currentBoard = board.getBoard()
    // horizontal case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[0][1] &&
    currentBoard[0][1] === currentBoard[0][2]) {
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    } else if (currentBoard[1][0] !== "" &&
    currentBoard[1][0] === currentBoard[1][1]&&
    currentBoard[1][1] === currentBoard[1][2]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    } else if (currentBoard[2][0] !== "" &&
    currentBoard[2][0] === currentBoard[2][1] &&
    currentBoard[2][1] === currentBoard[2][2]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won") 
    }
    // vertical case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[1][0] &&
    currentBoard[1][0] === currentBoard[2][0]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    } else if (currentBoard[0][1] !== "" &&
    currentBoard[0][1] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][1]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    } else if (currentBoard[0][2] !== "" &&
    currentBoard[0][2] === currentBoard[1][2] &&
    currentBoard[1][2] === currentBoard[2][2]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    }
    
    //diagonal case
    if (currentBoard[0][0] !== "" &&
    currentBoard[0][0] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][2]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    } else if (currentBoard[0][2] !== "" &&
    currentBoard[0][2] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[0][2]){
      console.log(`${getActivePlayer().name} have won the game!!!`)
      return("won")
    }
  }

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placing ${getActivePlayer().sign} on ${row} row and ${column}`)
    let markBoard = board.mark(row, column, getActivePlayer().sign)
    let win = checkWin()

    if (win === "won"){
    return
    } else if (markBoard === false) {
      printRound();
    } else {
      switchPlayerTurn();
      round ++
      printRound();
    }
  }

  printRound();
  
  return {
    playRound,
    getActivePlayer
  }
}

const game = gameController();
