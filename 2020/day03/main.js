const fs = require('fs');

const run = (path) => {
  const data = fs.readFileSync(path, 'utf-8');

  const lines = data.split('\n');
  const n = lines[1].length;

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split('');
  }

  let col = 0;
  let row = 0;
  let totes = [];

  for (var colChange = 1; colChange <=7; colChange +=2) {
    let treesSeen = 0;
    let col = 0;
    let row = 0;
    while (row < lines.length) {
      //console.log(lines[row].join(''));
      if (lines[row][col % n] === '#') {
        //console.log('hit', row, col % n)
        treesSeen++;
      }

      col += colChange;
      row ++;

    }
    totes.push(treesSeen);
  }

  treesSeen = 0;
  col = 0;
  row = 0;
  while (row < lines.length) {
    //console.log(lines[row].join(''));
    if (lines[row][col % n] === '#') {
      //console.log('hit', row, col % n)
      treesSeen++;
    }

    col += 1;
    row += 2;

  }
  totes.push(treesSeen);


  return totes.reduce((a,b) => (a*b));
}

//findValidPasswords('inputday2.txt')
console.log(run('input.txt'));