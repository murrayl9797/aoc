const fs = require('fs');


const run = (path) => {

  // Parse the file
  const firstBoard = fs.readFileSync(path, 'utf-8').split('\n').map(a => (a.split('')));


  // Helper function to update a location
  const checkPosition = (row, col, oldBoard, newBoard) => {
    const curr = oldBoard[row][col];

    // Get neighbors
    // Left
    let tempRow = row;
    let tempCol = col - 1;
    let lt = '';
    while (!lt) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        lt = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        lt = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        lt = '#';
      }
      tempCol--;
    }

    // Right
    tempRow = row;
    tempCol = col + 1;
    let rt = '';
    while (!rt) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        rt = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        rt = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        rt = '#';
      }
      tempCol++;
    }

    // Up
    tempRow = row - 1;
    tempCol = col;
    let up = '';
    while (!up) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        up = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        up = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        up = '#';
      }
      tempRow--;
    }

    // Down
    tempRow = row + 1;
    tempCol = col;
    let down = '';
    while (!down) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        down = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        down = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        down = '#';
      }
      tempRow++;
    }

    // Diag Up Right
    tempRow = row - 1;
    tempCol = col + 1;
    let dUR = '';
    while (!dUR) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        dUR = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        dUR = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        dUR = '#';
      }
      tempRow--;
      tempCol++;
    }

    // Diag Up Left
    tempRow = row - 1;
    tempCol = col - 1;
    let dUL = '';
    while (!dUL) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        dUL = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        dUL = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        dUL = '#';
      }
      tempRow--;
      tempCol--;
    }

    // Diag Down Right
    tempRow = row + 1;
    tempCol = col + 1;
    let dDR = '';
    while (!dDR) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        dDR = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        dDR = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        dDR = '#';
      }
      tempRow++;
      tempCol++;
    }


    // Diag Down Right
    tempRow = row + 1;
    tempCol = col - 1;
    let dDL = '';
    while (!dDL) {
      if (!oldBoard[tempRow] || !oldBoard[tempRow][tempCol]) {
        dDL = '.';
      } else if (oldBoard[tempRow][tempCol] === 'L') {
        dDL = 'L';
      } else if (oldBoard[tempRow][tempCol] === '#') {
        dDL = '#';
      }
      tempRow++;
      tempCol--;
    }



    const neighbors = dUL + up + dUR + lt + rt + dDL + down + dDR;

    // Logic
    var occupiedNeighbors = 0;
    for (var neighbor of neighbors) {
      neighbor === '#' ? occupiedNeighbors++ : null;
    }

    // First Rule
    if (curr === 'L' && !neighbors.includes('#')) {
      newBoard[row][col] = '#';
      changed = true;
      //console.log(`Switched ${row}, ${col}: ${occupiedNeighbors}`)
    } else if (curr === '#' && occupiedNeighbors >= 5) {
      newBoard[row][col] = 'L';
      changed = true;
      //console.log(`Switched ${row}, ${col}: ${occupiedNeighbors}`)
    }

  }

  // Check all positions:
  let board1 = firstBoard.map(function(arr) {
    return arr.slice();
  });

  let board2 = board1.map(function(arr) {
    return arr.slice();
  });

  // Iterate until no changes
  let changed = true;
  var i = 0;

  while (changed) {
    changed = false;


    for (var row = 0; row < board1.length; row++) {
      for (var col = 0; col < firstBoard[0].length; col++) {
        checkPosition(row, col, board1, board2);
      }
    }

    // Update board1 to be copy of board2
    console.log(i, changed);
    board1 = board2.map(function(arr) {
      return arr.slice();
    });

    i++;
  }

  // Finally, count occupied
  let finalCount = 0;
  board2.map(row => {
    row.map(element => {
      element === '#' ? finalCount++ : null ;
    })
  })

  return finalCount;
}



console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

