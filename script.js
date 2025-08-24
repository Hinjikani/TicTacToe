// gameboard

function gameboard(){
  rows = 3
  columns = 3
  board = []

  for (let i = 0; i< rows ; i++) {
    board[i] = [];
    for (let j = 0; j<columns; j++) {
      board[i].push("0");
    }
  }
  return board
}
