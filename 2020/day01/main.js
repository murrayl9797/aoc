const fs = require('fs');


const findSumTo2020 = () => {
  const data = fs.readFileSync('inputAocP1.txt', 'utf-8');

  let array = data.split('\n');

  // Now that we have an array of numbers, let's find two that sum to 2020
  array.sort((a,b) => (a - b));
  //console.log(array);
  array = array.slice(1);

  for (var i = 0; i < array.length; i++) {
    for (var j = i; j < array.length; j++) {
      for (var k = j; k < array.length; k++) {

        if (Number(array[i]) + Number(array[j]) + Number(array[k]) === 2020) {
          return [Number(array[i]), Number(array[j]), Number(array[k]), Number(array[i]) * Number(array[j]) * Number(array[k])];
        }


      }
    }

    if (Number(array[i]) + Number(array[j]) > 2020) {
      i = array.length-1;
    }
  }


}

console.log(findSumTo2020());
console.log(Number('24'))
console.log(Number(''))