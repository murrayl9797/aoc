const fs = require('fs');



const run = (path) => {

  const seq = fs.readFileSync(path, 'utf-8').split(',').map(Number);

  let positions = new Map();

  // Set initial positions
  for (var index = 0; index < seq.length - 1; index++) {
    positions.set(seq[index], index);
  }

  // Start to loop
  let i = seq.length - 1;
  let lastSpoken = seq[i];
  const ithSpoken = 30000000;

  for (; i < ithSpoken - 1; i++) {
    // Calculate next number
    if (positions.get(lastSpoken) === undefined) {
      //console.log(`IF\n`)
      // If last spoken not seen yet, next is 0
      positions.set(lastSpoken, i);
      lastSpoken = 0;
    } else {
      //console.log(`ELSE\n`)
      // Calculate next
      let temp = lastSpoken;
      lastSpoken = i - positions.get(lastSpoken);
      positions.set(temp, i);
    }
  }

  return lastSpoken;

}



//console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

