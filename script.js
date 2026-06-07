const buttonValues = [
    'C', '±', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
];

const buttonsContainer = document.getElementById('buttons');
const display = document.getElementById('display');

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function updateDisplay() {
    display.value = calculator.displayValue;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (calculator.firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        const result = performCalculation(calculator.firstOperand, inputValue, calculator.operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function performCalculation(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;
        default:
            return second;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function toggleSign() {
    if (calculator.displayValue === '0' || calculator.displayValue === 'Error') {
        return;
    }

    calculator.displayValue = String(parseFloat(calculator.displayValue) * -1);
}

function applyPercentage() {
    const value = parseFloat(calculator.displayValue);
    if (calculator.displayValue === 'Error') {
        return;
    }

    calculator.displayValue = String(value / 100);
    calculator.waitingForSecondOperand = true;
}

function createButtons() {
    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = value;

        if (value === 'C' || value === '±' || value === '%') {
            button.classList.add('function');
        } else if (value === '=' ) {
            button.classList.add('equal');
        } else if (['/', '*', '-', '+'].includes(value)) {
            button.classList.add('operator');
        }

        if (value === '0') {
            button.classList.add('zero');
        }

        button.addEventListener('click', () => handleButtonClick(value));
        buttonsContainer.appendChild(button);
    });
}

function handleButtonClick(value) {
    if (value === 'C') {
        resetCalculator();
    } else if (value === '±') {
        toggleSign();
    } else if (value === '%') {
        applyPercentage();
    } else if (value === '=') {
        if (calculator.operator === null || calculator.waitingForSecondOperand) {
            return;
        }
        handleOperator(calculator.operator);
        calculator.operator = null;
        calculator.waitingForSecondOperand = true;
    } else if (['/', '*', '-', '+'].includes(value)) {
        handleOperator(value);
    } else if (value === '.') {
        inputDecimal(value);
    } else {
        inputDigit(value);
    }

    updateDisplay();
}

createButtons();
updateDisplay();