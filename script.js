function add(a, b) {
  return a + b;
}
function subtract(a, b) {
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
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
    default:
      return ;
  }
}

function fontSizeSet() {
  if (mainDisplay.textContent.length > 15) {
    mainDisplay.style.fontSize = '22px';
  } else if (mainDisplay.textContent.length > 10) {
    mainDisplay.style.fontSize = '30px';
  } else {
    mainDisplay.style.fontSize = '40px';
  }
  
  if (upperDisplay.textContent.length > 20) {
    upperDisplay.style.fontSize = '14px';
  } else if (upperDisplay.textContent.length > 12) {
    upperDisplay.style.fontSize = '16px';
  } else {
    upperDisplay.style.fontSize = '20px';
  }

}

const buttons = document.querySelectorAll('button');
const mainDisplay = document.querySelector('.main-display');
const upperDisplay = document.querySelector('.upper-display')
const display = document.querySelector('.display');


buttons.forEach(button => {
  button.addEventListener('click', () => {

    if (button.classList.contains('number')) {
      if (mainDisplay.textContent.length >= 18) return;

      const digit = button.value;
      if (digit === '.' && mainDisplay.textContent.includes('.')) return;

      if (calculated) {
        mainDisplay.textContent = ''
        calculated = false;
      }

      if (digit === '.' && mainDisplay.textContent === '0'){
        mainDisplay.textContent = '0.';
      } else if (mainDisplay.textContent === '0') {
        mainDisplay.textContent = digit;
        fontSizeSet();
      } else {
        mainDisplay.textContent += digit;
        fontSizeSet();
      }
    }

    if (button.classList.contains('operator')) {

      isPercent = false;
      originalPercent = null;

      // if calculated use the result as firstNumber
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
      if(!firstNumber || !operator) return;
      

      if (!calculated) {
        secondNumber = isPercent ? firstNumber * +mainDisplay.textContent /100 : +mainDisplay.textContent;
      } else {
        firstNumber = +mainDisplay.textContent;
      }
      
      const rawResult = operate(operator, firstNumber, secondNumber);
      let result = null;

      if (typeof rawResult !== 'number') {
        result = rawResult;
      } else if (Number.isInteger(rawResult)) {
        result = rawResult;
      } else {
        result = parseFloat(rawResult.toFixed(10));
      }
      
      upperDisplay.textContent = isPercent
      ? `${firstNumber} ${operator} ${originalPercent}% =`
      : `${firstNumber} ${operator} ${secondNumber} =`;
    
      mainDisplay.textContent = result;
      fontSizeSet();

      if (typeof result === 'string') {
        display.classList.add('error');
        setTimeout(() => display.classList.remove('error'), 1500);
      }
      
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
      fontSizeSet();
    }

    if (button.classList.contains('backspace')) {
      if (mainDisplay.textContent === '0') return
      mainDisplay.textContent = mainDisplay.textContent.slice(0, -1) || '0';
      fontSizeSet();
    }

    if (button.classList.contains('percent')) {
      if (firstNumber) {
        originalPercent = +mainDisplay.textContent;
        upperDisplay.textContent = `${firstNumber} ${operator} ${originalPercent}%`;
        isPercent = true;
      } else {
        originalPercent = +mainDisplay.textContent;
        mainDisplay.textContent = originalPercent / 100;
        upperDisplay.textContent = `${originalPercent}% =`;
        fontSizeSet();
      }
    }

    if (button.classList.contains('sign')) {
      if(mainDisplay.textContent === '0') return;
      if(mainDisplay.textContent.startsWith('-')) {
        mainDisplay.textContent = mainDisplay.textContent.slice(1);
      } else {
        mainDisplay.textContent = '-' + mainDisplay.textContent;
      }
    }

  });
});

document.addEventListener('keydown', (e) => {
  const button = document.querySelector(`button[value="${e.key}"]`);
  if (button) button.click();
});