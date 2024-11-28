let currentInput = "";
let firstOperand = null;
let currentOperation = null;

function appendNumber(number) {
    console.log("Appending number: " + number); // Debugging statement
    currentInput += number;
    updateCalculatorDisplay();
}

function setOperation(operation) {
    if (currentInput === "") return;

    console.log("Setting operation: " + operation); // Debugging statement

    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (currentOperation) {
        firstOperand = operate(currentOperation, firstOperand, parseFloat(currentInput));
    }

    currentOperation = operation;
    currentInput = "";
    updateCalculatorDisplay();
}

function calculateResult() {
    console.log("Calculating result"); // Debugging statement
    if (firstOperand !== null && currentOperation !== null && currentInput !== "") {
        currentInput = operate(currentOperation, firstOperand, parseFloat(currentInput)).toString();
        firstOperand = null;
        currentOperation = null;
        updateCalculatorDisplay();
    }
}

function clearDisplay() {
    console.log("Clearing display"); // Debugging statement
    currentInput = "";
    firstOperand = null;
    currentOperation = null;
    updateCalculatorDisplay();
}

function updateCalculatorDisplay() {
    console.log("Updating display: " + currentInput); // Debugging statement
    const displayElement = document.getElementById("display");
    if (displayElement) {
        displayElement.innerText = currentInput;
    } else {
        console.error("Display element not found");
    }
}

function operate(operation, a, b) {
    console.log("Operating: " + a + " " + operation + " " + b); // Debugging statement
    switch (operation) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b !== 0) return a / b;
            else return "Error";
        default:
            return null;
    }
}