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
  
  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} placing ${getActivePlayer().sign} on ${row} row and ${column}`)
    let markBoard = board.mark(row, column, getActivePlayer().sign)
    if (markBoard === false) {
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
