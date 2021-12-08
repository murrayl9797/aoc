const fs = require('fs');


const run = (path) => {
  let found = {};
  let noDupes = [];
  // Parse the file
  const groups = fs.readFileSync(path, 'utf-8').split('\n').sort((a, b) => (
    a - b
  )).map(a => {
    if (!found[a]) {
      //console.log(a);
      noDupes.push(Number(a));
      found[a] = 1;
    }
  });

  const wallAdapter = noDupes.reduce((a,b) => (Math.max(a,b))) + 3;
  noDupes.unshift(0);
  noDupes.push(wallAdapter);

  found[0] = 1;
  found[wallAdapter] = 1;

  // Part 1
  // Initialize Variables
  // let oneCount = 0;
  // let twoCount = 0;
  // let threeCount = 0;
  // let diff;

  // // Loop
  // for (var i = 1; i < noDupes.length; i++) {
  //   diff = noDupes[i] - noDupes[i-1]
  //   if (diff == 1) {
  //     oneCount++;
  //   }
  //   if (diff == 3) {
  //     threeCount++;
  //   }
  // }


  // Part 2
  //console.log('No Dupes:', noDupes);

  const allRoutes = Array.from({length: noDupes.length}, () => 1);

  for (var i = allRoutes.length - 3; i >= 0; i--) {
    let routesToWall = 0;
    let currAdapter = noDupes[i];

    for (var j = 1; j < 4; j++) {
      if (noDupes[i+j] - currAdapter <= 3 && noDupes[i+j] - currAdapter >= 1) {
        routesToWall += allRoutes[i+j];
      }
    }

    allRoutes[i] = routesToWall;
    //console.log(allRoutes, i);
  }


  return allRoutes[0];
}



console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

