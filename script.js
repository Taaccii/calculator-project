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
let calculated = false;

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
      return ;
  }
}

function fontSizeSet() {
  if (mainDisplay.textContent.length > 10) {
    mainDisplay.style.fontSize = '24px';
  } else {
    mainDisplay.style.fontSize = '40px';
  }
}

const buttons = document.querySelectorAll('button');
const mainDisplay = document.querySelector('.main-display');
const upperDisplay = document.querySelector('.upper-display')


buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (mainDisplay.textContent.length >= 18) return;

    if (button.classList.contains('number')) {
      const digit = button.value;

      if (calculated) {
        mainDisplay.textContent = ''
        calculated = false;
      }
      if (mainDisplay.textContent === '0') {
        mainDisplay.textContent = digit;
        fontSizeSet();
      } else {
        mainDisplay.textContent += digit;
        fontSizeSet();
      }
    }

    if (button.classList.contains('operator')) {
      if (firstNumber && operator) {
        secondNumber = +mainDisplay.textContent;
        mainDisplay.textContent = operate(operator, firstNumber, secondNumber);
      }
      firstNumber = +mainDisplay.textContent;
      operator = button.value;
      upperDisplay.textContent = `${firstNumber} ${operator}`;
      mainDisplay.textContent = '';
    }

    if (button.classList.contains('equals')) {
      secondNumber = +mainDisplay.textContent;
      const rawResult = operate(operator, firstNumber, secondNumber);
      const result = typeof rawResult === 'number' ? parseFloat(rawResult.toFixed(10)) : rawResult;
      upperDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
      mainDisplay.textContent = result;
      calculated = true;
    }

    if (button.classList.contains('clear')) {
      firstNumber = null;
      secondNumber = null;
      operator = null;
      mainDisplay.textContent = '0'
      upperDisplay.textContent = ''
    }

    if (button.classList.contains('backspace')) {
      mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    }
  });
});