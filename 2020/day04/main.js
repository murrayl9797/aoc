const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8');

var valid = {
  byr : 1, iyr : 1, eyr : 1, hgt : 1, hcl : 1, ecl : 1, pid : 1,
}

const run = () => {
  let count = 0;

  const lines = data.split('\n\n')

  for (var i = 0; i < lines.length; i++) {
    let broken = lines[i].replace(/\n/g, ' ').split(' ');




    valid = {
      byr : 1, iyr : 1, eyr : 1, hgt : 1, hcl : 1, ecl : 1, pid : 1,
    }


    for (var elem of broken) {
      let field = elem.slice(0,3);
      let val = elem.slice(4);
      console.log('val', val)
      if (valid[field] === 1) {
        switch(field) {
          case 'byr':
            if (Number(val) <= 2002 && Number(val) >= 1920) {
              valid[field] = 0;
            }
          case 'iyr':
            if (Number(val) <= 2020 && Number(val) >= 2010) {
              valid[field] = 0;
            }
          case 'eyr':
            if (Number(val) <= 2030 && Number(val) >= 2020) {
              valid[field] = 0;
            }
          case 'hgt':
            if (val.slice(-2) === 'in') {
              if (Number(val.slice(0, -2)) <= 76 && Number(val.slice(0, -2)) >= 59) {
                valid[field] = 0;
                //console.log(`boop`, val.slice(0, -2));
              }
            } else if (val.slice(-2) === 'cm') {
              if (Number(val.slice(0, -2)) >= 150 && Number(val.slice(0, -2)) <= 193) {
                valid[field] = 0;
                //console.log(`boop`, val);
              }
            }
          case 'hcl':
            if (/^#([0-9]|[a-f]){6}/.test(val)) {
              valid[field] = 0;
              //console.log('val', val);
            }
          case 'ecl':
            if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val)) {
              valid[field] = 0;
            }
          case 'pid':
            if (val.length === 9) {
              valid[field] = 0;
            }
          default:
            // nothing
        }
      }

    }

    if (Object.values(valid).reduce((a, b) => (a+b)) < 1) {
      //console.log(`boop`, broken, valid);
      count++;
    }

    //console.log(`boop`, broken, valid);
  }





  // return something
  return count;
}

// console.log(valid)
console.log(run());