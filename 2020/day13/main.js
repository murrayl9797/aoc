const fs = require('fs');


const run = (path) => {

  const groups = fs.readFileSync(path, 'utf-8').split('\n');

  const start = groups[0];
  const times = groups[1].split(',');
  const n = times.length;

  let count = 0;
  let timeP = 0;
  //console.log(times);
  let j;
  let b = 0;
  const indices = [];
  times.map((a, ind) => {
    if (a !== 'x') {
      indices.push([+a, ind]);
    }
  })

  const m = indices.length;

  //console.log(indices)
  //for (var i = 100000000000004;  i < 100071053000004; i += Number(times[0])) {
  // for (let i = 100071053000004;  ; i += Number(times[0])) {
  //   // check if count done

  //   j = i;
  //   count = 0;

  //   for (let ind of indices) {
  //     if ((j + ind) % Number(times[ind]) === 0) {
  //       count++;
  //     }
  //   }

  //   if (count === m) {
  //     return i;
  //   }

  // }

  let num = indices[0][0];
  let denom = num;
  for (let i = 1; i < indices.length; i++) {
      let [int, rem] = indices[i];
      while ((num + rem) % int !== 0) {
          num += denom;
      }
      denom = denom * int;
  }

  return num;

  //return [start, times];
}



console.log(`Test:`, run('test.txt'));
//console.log(`Answer:`, run('input.txt'));

