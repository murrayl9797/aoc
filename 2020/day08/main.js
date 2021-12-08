const fs = require('fs');


const run = (path) => {

  // Parse the file
  const groups = fs.readFileSync(path, 'utf-8').split('\n').map(a => {
    return a.split(' ');
  });

  // Initialize Variables
  let acc = 0;
  let line = 0;
  let visited = {};
  let i = 0;
  const switchedSoFar = {};
  let hasSwitched = false;

  // Loop
  while (line < groups.length && i <= groups.length) {

    console.log(`Hit:`, groups[line]);
    // If seen, reset
    if (visited[line] === 1) {
      line = 0;
      acc = 0;
      i = 0;
      visited = {};
      hasSwitched = false;
    } else {
      visited[line] = 1;
    }

    // Logic
    if (groups[line][0] === 'nop') {
      // Try to switch to jump
      if (!hasSwitched && switchedSoFar[line] !== 1) {
        hasSwitched = true;
        switchedSoFar[line] = 1;
        line += Number(groups[line][1]);
      } else {
      // If already switched, just do nop
        line++;
      }

    } else if (groups[line][0] === 'acc') {
      acc += Number(groups[line][1]);
      line++;
    } else { // See a jump
      // Try to switch to nop
      if (!hasSwitched && switchedSoFar[line] !== 1) {
        hasSwitched = true;
        switchedSoFar[line] = 1;
        line++;
      } else {
      // If already switched, just do jump
        line += Number(groups[line][1]);
      }

    }



  }


  return acc;
}

console.log(`Answer:`, run('input.txt'));
console.log(`Test:`, run('test.txt'));