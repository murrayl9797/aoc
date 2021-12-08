const fs = require('fs');


const run = (path) => {

  const data = fs.readFileSync(path, 'utf-8').split('\n');
  const result = [];

  const findRowColSeat = (str) => {
    const rows = [];
    for (var i = 0; i < 128; i++) {
      rows.push(i);
    }

    const cols = [];
    for (var i = 0; i < 8; i++) {
      cols.push(i);
    }

    // Row
    let l = 0, r = rows.length - 1, m = Math.ceil(r / 2);

    const rowStr = str.slice(0,7);
    //console.log(l, r, m)
    for (var char of rowStr) {
      if (char === 'F') {
        r = m - 1;
        m = Math.ceil((r+l) / 2);
      } else {
        l = m;
        m = Math.ceil((l+r) / 2);
      }
      //console.log(l,r,m);
    }
    const finalRow = m;

    // Row
    l = 0, r = cols.length - 1, m = Math.ceil(r / 2);

    const colStr = str.slice(7);
    //console.log(l, r, m)
    for (var char of colStr) {
      if (char === 'L') {
        r = m - 1;
        m = Math.ceil((r+l) / 2);
      } else {
        l = m;
        m = Math.ceil((l+r) / 2);
      }
      //console.log(l,r,m);
    }
    const finalCol = m;


    //console.log(`Row:${finalRow} and Col:${finalCol}`);

    result.push([finalRow, finalCol]);
  };

  for (var line of data) {
    findRowColSeat(line);
  }

  result.sort( (a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  })

  var check = 0;
  for (var c of result.slice(2)) {

    if (c[1] !== check) {
      return c;
    }
    check++;
    if (check === 8) {
      check = 0;
    }
  }
  //return result;
}

console.log(`Answer:`, run('input.txt'));
//console.log(`Test:`, run('test.txt'));