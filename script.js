function add(a, b) {
  return a + b;
}
function subctract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return 'Error: Do you want to divide by 0? Hahaha';
  return a / b;
}

let firstNumber = null;
let operator = null;
let secondNumber = null;


function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subctract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
    default:
      return 'Invalid operator';
  }
}


