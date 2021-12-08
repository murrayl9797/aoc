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


  // Now to actual count error rate
  let errorRate = 0;
  for (let row of nearbyArray) {
    for (let element of row) {
      // Check if element is in range on any rules
      let found = false;

      for (var ruleRow of formattedRules) {
        for (var [left, right] of ruleRow) {
          // Check if element is in range
          if (element >= left && element <= right) {
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      if (!found) {
        errorRate += element;
      }
    }
  }


  return errorRate;
}



console.log(`Test:`, run('test.txt'));
console.log(`Answer:`, run('input.txt'));

