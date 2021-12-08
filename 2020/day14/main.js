const fs = require('fs');



const run = (path) => {

  const groups = fs.readFileSync(path, 'utf-8').split('\n');

  const storage = {};
  let mask;
  let line;
  let addr;
  let value;

  // Function to convert number to binary string
  const dec2bin = (dec) => {
    var x = (dec >>> 0).toString(2);
    while(x.length < 36) {
        x = "0" + x;
    }
    return x;
  }


  // Helper function to store in memory
  const storeInMem = (mask, address, value) => {
    // Convert value to binary
    let binValue = dec2bin(value);

    // Loop over and replace values
    for (var i = 0; i < 36; i++) {
      if (mask[i] !== 'X') {
        binValue = binValue.slice(0, i) + mask[i] + binValue.slice(i+1)
      }
    }

    // Now add to memory
    storage[address] = parseInt(binValue, 2);
  }

  for (var i = 0; i < groups.length; i++) {
    line = groups[i];
    if (/^mask/g.test(line)) {
      // see a mask
      mask = line.slice(7);
    } else {
      // try to store in memory
      addr = line.match(/\[(.*)\]/)[1];
      value = line.match(/= (.*)/)[1];

      storeInMem(mask, addr, value);
    }
  }

  return Object.values(storage).reduce((a,b) => (a+b));

}



console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

