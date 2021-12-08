const fs = require('fs');



const run = (path, cycles) => {

  // Parse intial input
  const groups = fs.readFileSync(path, 'utf-8').split('\n').map(row => {
    return row.split('');
  });

  const n = (cycles*2) + groups.length;


  /***************** Add Buffers *******************/
  // make groups size of others
  const extraBuffer = cycles;

  // add left/right buffer
  for (var rowInd = 0; rowInd < groups.length; rowInd++) {
    var row = groups[rowInd];

    for (var i = 0; i < extraBuffer; i++) {
      row.unshift('.');
      row.push('.');
    }
  }

  // add top buffer
  for (var i = 0; i < extraBuffer; i++) {
    groups.unshift(Array.from(new Array(n), a => '.'));
  }

  // add bot buffer
  for (var i = 0; i < extraBuffer; i++) {
    groups.push(Array.from(new Array(n), a => '.'));
  }

  /****************** Create 4D Grid *******************/
  let hyperCubeOne = [];

  for (var w = 0; w < n; w++) {
    const cube = [];

    for (var z = 0; z < n; z++) {
      // For each z plane, make a 2D matrix

      const matrix = [];
      for (var y = 0; y < n; y++) {
        // For each row, make a bunch of a columns

        const row = [];
        for (var x = 0; x < n; x++) {
          row.push('.');
        }

        // Once row is full, push onto matrix
        matrix.push(row);
      }

      // Once matrix is full, push onto cubeOne
      if (z === Math.floor(n / 2) && w === Math.floor(n / 2)) {
        cube.push(groups);
      } else {
        cube.push(matrix);
      }
    }

    // Once cube is full, push onto hyperCube

    hyperCubeOne.push(cube);
  }

  /***** Helper function to update the cube ********/
  const checkPosition = (w, z, y, x, oldCube, newCube) => {
    let activeCount = 0;
    let currPos = oldCube[w][z][y][x];

    for (let wDiff = -1; wDiff < 2; wDiff++) {
      for (let zDiff = -1; zDiff < 2; zDiff++) {
        for (let yDiff = -1; yDiff < 2; yDiff++) {
          for (let xDiff = -1; xDiff < 2; xDiff++) {
            // Only check neighbors, not self
            if (!(xDiff === yDiff && yDiff === zDiff && zDiff === wDiff && wDiff === 0)) {
              let neighbor = oldCube[w+wDiff][z+zDiff][y+yDiff][x+xDiff];
              neighbor === '#' ? activeCount++ : null;
            }
          }
        }
      }
    }
    //console.log(`Pos ${z}, ${y}, ${x}: ${activeCount}`);


    // Check rules
    if (currPos === '#') {
      // If current is active

      if (!(activeCount === 2 || activeCount === 3)) {
        newCube[w][z][y][x] = '.';
      }

    } else {
      // If current is inactive

      if (activeCount === 3) {
        newCube[w][z][y][x] = '#';
      }
    }
  }


  /***** Now we have cube, run through cycles ********/

  let currCycle = 0;

  // Make a copy cube
  let hyperCubeTwo = hyperCubeOne.map(cube => {
    return cube.map(matrix => {
      return matrix.map(row => {
        return row.slice();
      })
    })
  })


  // Time to cycle
  while (currCycle < 6) {

    // Transform cubeTwo
    for (let w = 1; w < n - 1; w++) {
      for (let z = 1; z < n - 1; z++) {
        for (let y = 1; y < n - 1; y++) {
          for(let x = 1; x < n - 1; x++) {
            // For each position, check neighbor
            checkPosition(w, z, y, x, hyperCubeOne, hyperCubeTwo);

          }
        }
      }
    }

    // Make cubeOne a copy cubeTwo
    hyperCubeOne = hyperCubeTwo.map(cube => {
      return cube.map(matrix => {
        return matrix.map(row => {
          return row.slice();
        })
      })
    })

    currCycle++;
  }

  // Check how many are still active
  let finalCount = 0;

  for (let w = 0; w < n; w++) {
    for (let z = 0; z < n; z++) {
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          hyperCubeOne[w][z][y][x] === '#' ? finalCount++ : null ;
        }
      }
    }
  }

  return finalCount;
}



//console.log(`Test:`, run('./inputs/test.txt', 10));
console.log(`Answer:`, run('./inputs/mine.txt', 10));