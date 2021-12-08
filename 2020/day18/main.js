const fs = require('fs');


const getSum = (stack) => stack.reduce((acc, v) => acc + v);

const getProduct = (stack) => stack.reduce((acc, v) => acc * v);

const workStack = (num, stack, operator, favorAddition = false) => {
  if (operator === '+') {
    stack.push((stack.pop() || 0) + num);
  } else if (operator === '*' && favorAddition) {
    stack.push(num);
  } else {
    stack.push((stack.pop() || 0) * num);
  }
};

const evaluate = (input, reducer, favorAddition = false) => {

  // Parse input into separate lines and remove spaces
  const lines = fs.readFileSync(input, 'utf-8')
  .split('\n')
  .map((line) => line.replace(/\s+/g, ''));


  // Function to parse each line
  const calculate = (expression, i = 0) => {
    let currOperator = '+';
    let subSum, newIdx;
    const stack = [];

    while (i < expression.length) {
      const op = expression[i];

      switch (op) {
        case '+':
          currOperator = '+';
          break;

        case '*':
          currOperator = '*';
          break;

        case '(':
          [subSum, newIdx] = calculate(expression, i + 1);
          workStack(subSum, stack, currOperator, favorAddition);
          i = newIdx;
          break;

        case ')':
          return [reducer(stack), i];

        default:
          workStack(Number(op), stack, currOperator, favorAddition);
      }
      i += 1;
    }
    return [reducer(stack)];
  };

  // Calculate all lines
  let sum = 0;
  for (let expression of lines) {
    sum += calculate(expression)[0];
  }
  return sum;
};

/**
 * Part 1
 */
const solvePuzzle = (input) => evaluate(input, getSum, false);

/**
 * Part 2
 */
const solvePuzzle2 = (input) => evaluate(input, getProduct, true);

console.log(`Test:`, solvePuzzle2('./inputs/mine.txt'));
//console.log(`Answer:`, run('./inputs/mine.txt'));