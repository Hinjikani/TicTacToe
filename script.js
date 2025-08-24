function gameboard(){
  //Create gameboard
  const rows = 3
  const columns = 3
  const board = []

  for (let i = 0; i< rows ; i++) {
    board[i] = [];
    for (let j = 0; j<columns; j++) {
      board[i].push("0");
    }
  }
  
  //Return board
  const getboard = () => board
  
  //Put player's marker
  const mark = (row, column, player) => {
    const rowIndex = row - 1;
    const columnIndex = column - 1;

    if (row < 1 || row > 3 || column < 1 || row > 3) {
      console.log(`column ${column} row ${row} is out of range`)
    } else if (board[rowIndex][columnIndex] === "0") {
      board[rowIndex][columnIndex] = player
    } else {
      console.log(`column ${column} row ${row} is already occupied`)
    }
  }
  return {getboard, mark}
};

board = gameboard()
