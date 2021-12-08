const fs = require('fs');

const findValidPasswords = (path) => {
  const data = fs.readFileSync(path, 'utf-8');

  const lines = data.split('\n');

  const splitLines = [];


  // Split up lines into 3 long array
  for (var line of lines) {
    splitLines.push(line.split(' '));
  }


  // Init count
  let result = 0;


  // Loop over array, find valid passwords
  for (var i = 0; i < splitLines.length; i++) {
    var triple = splitLines[i] || ['', '', ''];

    var range = triple[0].split('-');
    var target = triple[1] ? triple[1][0] : '';
    var string = triple[2] ? triple[2] : '';

    // splitLines[i] = [range, target, string];

    let occurences = 0;

    // Loop over string and count how many targets appear
    for (var c of string) {
      if (c === target) {
        occurences++;
      }
    }
    //let b = false;
    // check if occurences is in range
    if (occurences >= range[0] && occurences <= range[1]) {
      result++;
      //b = true;
    }

    //splitLines[i] = [range, target, string, b];
  }



  return result;
}

//findValidPasswords('inputday2.txt')
console.log(findValidPasswords('inputday2.txt'));