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
    let binAddr = dec2bin(address);

    // Loop over and replace values
    for (var i = 0; i < 36; i++) {
      if (mask[i] !== '0') {
        binAddr = binAddr.slice(0, i) + mask[i] + binAddr.slice(i+1);
      }
    }


    // Now add to memory recursively
    //let path1, path2;

    const recAddtoMem = (addr, val, index) => {
      if (index === 36) {
        //console.log(`Adding ${val} at address: ${parseInt(addr, 2)}`)
        storage[parseInt(addr, 2)] = val;
        //return;
      } else {
        //console.log(`At index ${index}, addr is ${addr}`);
        if (addr[index] !== 'X') {
          // If not floating, just carry on
          recAddtoMem(addr, val, index + 1);
        } else {
          // If floating, must try both
          let path1 = addr.slice(0, index) + '0' + addr.slice(index+1);
          let path2 = addr.slice(0, index) + '1' + addr.slice(index+1);

          //console.log(`SPLIT AT ${index}`);
          //console.log(`Path1 ${path1}`);
          //console.log(`Path2 ${path2}\n`);
          recAddtoMem(path1, val, index + 1);
          recAddtoMem(path2, val, index + 1);
        }
      }
    }

    // Invoke recursive function
    recAddtoMem(binAddr, value, 0);
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

  let values = Object.values(storage).map(a => (+a));
  return values.reduce((a,b) => (a+b));

}



console.log(`Test:`, run('test2.txt'));
console.log(`Answer:`, run('input.txt'));

