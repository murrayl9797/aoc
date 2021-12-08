const fs = require('fs');


const run = (path) => {

  const groups = fs.readFileSync(path, 'utf-8').split('\n\n');
  let result = 0;

  for (var group of groups) {
    var yes = {};
    var pcount = 0;
    //group = group.replace(/\n/g, '');

    for (var person of group.split('\n')) {
      pcount++;
      for (var char of person) {
        if (!yes[char]) {
          yes[char] = 1;
        } else {
          yes[char] += 1;
        }
      }
    }

    //console.log(group, Object.keys(yes).length)
    for (var q in yes) {
      if (yes[q] === pcount) {
        result++;
      }
    }
    //console.log(group, yes);
  }


  return result;
}

console.log(`Answer:`, run('input.txt'));
console.log(`Test:`, run('test.txt'));