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
let isPercent = false;
let originalPercent = null;

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

      isPercent = null;
      originalPercent = null;

      if (calculated) {
        calculated = false;
      } else if (firstNumber && operator) {
        secondNumber = +mainDisplay.textContent;
        mainDisplay.textContent = operate(operator, firstNumber, secondNumber);
      }
      firstNumber = +mainDisplay.textContent;
      operator = button.value;
      upperDisplay.textContent = `${firstNumber} ${operator}`;
      mainDisplay.textContent = '';
    }

    if (button.classList.contains('equals')) {
      secondNumber = isPercent ? firstNumber * +mainDisplay.textContent /100 : +mainDisplay.textContent;
      const rawResult = operate(operator, firstNumber, secondNumber);
      const result = typeof rawResult === 'number' ? parseFloat(rawResult.toFixed(10)) : rawResult;

      upperDisplay.textContent = isPercent
      ? `${firstNumber} ${operator} ${originalPercent}% = ${result}`
      : `${firstNumber} ${operator} ${secondNumber} = ${result}`;

      mainDisplay.textContent = result;
      calculated = true;
      isPercent = false;
      originalPercent = null;
    }

    if (button.classList.contains('clear')) {
      firstNumber = null;
      secondNumber = null;
      operator = null;
      mainDisplay.textContent = '0'
      upperDisplay.textContent = ''
    }

    if (button.classList.contains('backspace')) {
      if (mainDisplay.textContent === '0') return
      mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    }

    if (button.classList.contains('percent')) {
      if (firstNumber) {
        originalPercent = +mainDisplay.textContent;
        upperDisplay.textContent = `${firstNumber} ${operator} ${originalPercent}%`;
        isPercent = true;
      } else {
        mainDisplay.textContent = +mainDisplay.textContent / 100;
      }
    }

  });
});