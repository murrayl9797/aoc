const fs = require('fs');



const run = (path) => {


  // Parse intial input
  const [rules, myTicket, nearbyTickets] = fs.readFileSync(path, 'utf-8').split('\n\n');

  // Parse rules
  const splitRules = rules.match(/: (.*)/g);

  const formattedRules = splitRules.map(range => {
    return range.slice(2).split('or');
  }).map(([left, right]) => {
    return [left.split('-').map(Number), right.split('-').map(Number)];
  })

  // Parse nearby tickets
  const nearbyArray = nearbyTickets.split('\n').slice(1).map(row => {
    return row.split(',').map(Number);
  })


  // Now to remove invalid tickets
  const validTickets = [];
  for (let row of nearbyArray) {
    let valid = true;

    for (let ele of row) {
      // Check if element is in range on any rules
      let found = false;

      for (var [r1, r2] of formattedRules) {
        if ((ele >= r1[0] && ele <= r1[1]) || (ele >= r2[0] && ele <= r2[1])) {
          found = true;
          break;
        }
      }

      if (!found) {
       valid = false;
       break;
      }
    }

    if (valid) {
      validTickets.push(row);
    }
  }

  // Now that we have only valid tickets, find field which is which
  const possibleRules = {};

  // Init possible rules
  for (let colInd = 0; colInd < validTickets[0].length; colInd++) {
    possibleRules[colInd] = [];
  }

  // Now populate possible rule matches
  for (let colInd = 0; colInd < validTickets[0].length; colInd++) {
    // For each column, check what rules match entire column
    //console.log(`Checking matches for col ${colInd}`);

    for (let ruleRow = 0; ruleRow < formattedRules.length; ruleRow++) {
      let r1 = formattedRules[ruleRow][0];
      let r2 = formattedRules[ruleRow][1];
      //console.log(`Checking if column ${colInd} matches rule row: ${ruleRow}`);

      // if each element matches rule, add ruleRow to whatever
      let validColumn = true;

      for (let rowInd = 0; rowInd < validTickets.length; rowInd++) {
        //console.log(`Checking ticket row: ${rowInd}`);
        let ele = validTickets[rowInd][colInd];
        if ((ele >= r1[0] && ele <= r1[1]) || (ele >= r2[0] && ele <= r2[1])) {
          //nothing
        } else {
          //console.log(`Element: ${ele}, Rule Row: ${ruleRow}`);
          validColumn = false;
          break;
        }
      }

      // If valid column, add to matches
      if (validColumn) {
        //console.log(`ADD Rule Row: ${ruleRow}`);
        possibleRules[colInd].push(ruleRow);
      }

    }


  }

  // Now that we have possible rules
  // eliminate them until each one only has one match
  var onlyOne;
  var j = 0;
  while(j < 1) {
    //console.log(`Hello?`)

    // Find one
    for (var key in possibleRules) {
      let matches = possibleRules[key];
      if (Array.isArray(matches) && matches.length === 1) {
        possibleRules[key] = matches[0];
        onlyOne = matches[0];
        break;
      }
    }

    //console.log(`Searching for ${onlyOne}`);

    // Remove from others
    for (var key in possibleRules) {
      let matches = possibleRules[key];
      if (Array.isArray(matches)) {
        for (var i = 0; i < matches.length; i++) {
          if (matches[i] === onlyOne) {
            //console.log(`${typeof matches} matches`)
            let tempString = matches.slice(0, i).concat(matches.slice(i+1));
            possibleRules[key] = tempString;
          }
        }
      }
    }

    // Check if they're all numbers
    let anyArrays = false;
    for (var key in possibleRules) {
      if (Array.isArray(possibleRules[key])) {
        anyArrays = true;
      }
    }

    if (!anyArrays) {
      break;
    }

    // else
    //j++;
  }

  let departureIndices = [];
  for (var key in possibleRules) {
    if (possibleRules[key] <= 5 && possibleRules[key] >= 0) {
      departureIndices.push(key);
    }
  }

  //console.log(possibleRules)
  //sconsole.log(departureIndices.map(Number));

  let finalResult = [];
  let myNums = myTicket.split('\n')[1].split(',').map(Number);

  for (var index of departureIndices) {
    finalResult.push(myNums[index]);
  }


  return finalResult.reduce((a, b) => (a*b));
}



//console.log(`Test:`, run('test2.txt'));
console.log(`Answer:`, run('input.txt'));

