const fs = require('fs');


const run = (path) => {

  // Parse the file
  const instructions = fs.readFileSync(path, 'utf-8')
  .split('\n')
  .map(a => {
    return [a[0], Number(a.slice(1))];
  }
  );


  // PART 1:
  // Init variables
  // let currRow = 0;
  // let currCol = 0;
  // let dirIndex = 1;
  // let directions = ['N', 'E', 'S', 'W'];

  // // Helper function for direction change
  // const findNewDir = (direction, degree, leftOrRight) => {
  //   if (leftOrRight === 'L') {
  //     while (degree !== 0) {
  //       (direction - 1) === -1 ? direction = 3 : direction--;
  //       degree -= 90;
  //     }
  //   } else {
  //     while (degree !== 0) {
  //       (direction + 1) === 4 ? direction = 0 : direction++;
  //       degree -= 90;
  //     }
  //   }
  //   return direction;
  // }

  // // Loop over instructions
  // for (var [action, value] of instructions) {

  //   // Cardinal Directions
  //   if (action === 'N') {
  //     currRow += value;
  //   }
  //   if (action === 'S') {
  //     currRow -= value;
  //   }
  //   if (action === 'W') {
  //     currCol -= value;
  //   }
  //   if (action === 'E') {
  //     currCol += value;
  //   }

  //   // If Left or Right
  //   if (action === 'L' || action === 'R') {
  //     dirIndex = findNewDir(dirIndex, value, action);
  //   }

  //   // If Forward
  //   if (action === 'F') {
  //     switch(directions[dirIndex]) {
  //       case 'N':
  //         currRow += value;
  //         break;
  //       case 'E':
  //         currCol += value;
  //         break;
  //       case 'S':
  //         currRow -= value;
  //         break;
  //       case 'W':
  //         currCol -= value;
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }

  // return Math.abs(currCol) + Math.abs(currRow);


  // Part 2
  let currRow = 0;
  let currCol = 0;
  let wpDiffRow = 1;
  let wpDiffCol = 10;

  // helper
  const rotateWaypoint = (row, col, leftRight, degree) => {
    let oldRow = row;
    let oldCol = col;
    if (leftRight === 'R') {
      switch(degree) {
        case 90:
          row = oldCol*(-1);
          col = oldRow;
          break;
        case 180:
          row = oldRow*(-1);
          col = oldCol*(-1);
          break;
        case 270:
          row = oldCol;
          col = oldRow*(-1);
          break;
        default:
          break;
      }
    } else {
      switch(degree) {
        case 270:
          row = oldCol*(-1);
          col = oldRow;
          break;
        case 180:
          row = oldRow*(-1);
          col = oldCol*(-1);
          break;
        case 90:
          row = oldCol;
          col = oldRow*(-1);
          break;
        default:
          break;
      }
    }
    return [row, col];
  }

  for (var [action, value] of instructions) {
    console.log(`Action:${action} , Value:${value}`);
    console.log(`X:${currCol} , Y:${currRow}`);
    console.log(`WP_X:${wpDiffCol} , WP_Y:${wpDiffRow}\n`);

    // Cardinal Directions
    if (action === 'N') {
      wpDiffRow += value;
    }
    if (action === 'S') {
      wpDiffRow -= value;
    }
    if (action === 'W') {
      wpDiffCol -= value;
    }
    if (action === 'E') {
      wpDiffCol += value;
    }

    // Rotate
    if (action === 'L' || action === 'R') {
      let newWP = rotateWaypoint(wpDiffRow, wpDiffCol, action, value);
      wpDiffRow = newWP[0];
      wpDiffCol = newWP[1];
    }

    // Move
    if (action === 'F') {
      // Move the ship
      currCol += wpDiffCol*value;
      currRow += wpDiffRow*value;
    }

    // Test
    console.log(`New X:${currCol} , New Y:${currRow}`);
    console.log(`New WP_X:${wpDiffCol} , New WP_Y:${wpDiffRow}\n\n`);
  }

  //console.log(`Check ${rotateWaypoint(1, 10, 'L', 180)}`)
  return Math.abs(currCol) + Math.abs(currRow);
}



console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

