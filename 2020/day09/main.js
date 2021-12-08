const fs = require('fs');


const run = (path, preamble) => {

  // Parse the file
  const groups = fs.readFileSync(path, 'utf-8').split('\n');

  // Initialize Variables
  let target;

  // Loop
  for (var i = preamble; i < groups.length; i++) {

    var currentNum = groups[i];
    var found = false;
    //console.log(`CurrentNUM:`, currentNum);

    for (var j = i - 1; j > i - preamble; j--) {
      for (var k = i - 2; k > i - preamble - 1; k--) {
        //console.log(`Checking ${groups[j]} and ${groups[k]} -> ${Number(groups[j]) + Number(groups[k])} ===? ${Number(currentNum)}`);
        if (Number(groups[j]) + Number(groups[k]) === Number(currentNum)) {
          //console.log(`YAYAYA\n`)
          found = true;
        }
      }
    }

    if (!found) {
      //console.log(`Found it:`, currentNum)
      target = Number(currentNum);
      break;
    }

  }

  // Part 2
  console.log('Searching for', target);

  for (var i = 0; i < groups.length; i++) {
    // Init variables
    var seq = [groups[i]];
    var j = i + 1;
    var sumOfSeq = seq.reduce((a,b) => {
      return Number(a) + Number(b);
    }, 0);

    while (sumOfSeq < target && groups[j]) {
      //console.log(`i is ${i}, j is ${j}, and seq is ${sumOfSeq}`);
      seq.push(groups[j]);
      j++;
      sumOfSeq = seq.reduce((a,b) => {
        return Number(a) + Number(b);
      }, 0);

      if (sumOfSeq === target) {
        var min = seq.reduce((a,b) => (Math.min(a,b)), Infinity);
        var max = seq.reduce((a,b) => (Math.max(a,b)), 0);
        return min +max;
        //break;
      }
    }
  }

  return sumOfSeq;
}



console.log(`Answer:`, run('input.txt', 25));
console.log(`Test:`, run('test.txt', 5));