// Calculator class
class Calculator
{
    // Calculator constructor
    constructor(previous, current)
    {
        // previous number
        this.previous = previous;
        //current number
        this.current = current;
        //when a there is a new Calculator whe clear();
        this.clear();
    }

    // everything is cleared
    clear()
    {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operations = undefined;
    }

    // converts to string and takes away the -1 from the first
    // (takes away the last number)
    delete()
    {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }
    
    // converts numbers to string to write them so that javascript doesnt add them up
    writeNumber(numbers)
    {
        // verifies if there is already a "." in the number
        // if so it doesn't add it to the string
        if (numbers === "." && this.currentNumber.includes(".")) return
        this.currentNumber = this.currentNumber.toString() + numbers.toString()
    }

    // Checks if the calculator's current and previous numbers aren't empty
    // if they aren't it runs calculate()
    selectOperation(operations)
    {
        if(this.currentNumber === "") return
        if(this.previousNumber !== ""){
            this.calculate();
        }
        // set operations for the function calculate()
        this.operations = operations
        // when user clicks on operation the current number becomes the previous
        this.previousNumber = this.currentNumber
        // clears the current number
        this.currentNumber = ""
    }

    // function that does all the calculations
    calculate()
    {
        let computation
        // previous number
        // we use parseFloat because we might use "."
        let prev = parseFloat(this.previousNumber)
        // current number
        let curr = parseFloat(this.currentNumber)
        // verify if the numbers arent numbers
        if (isNaN(prev) || isNaN(curr)) return
        // set each operation (add,substract,multiply,divide)
        switch (this.operations) {
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '/':
                computation = prev / curr
                break;
            default:
                return
        }
        // set the current number to the result of computation in the the switch statement
        this.currentNumber = computation
        // we unset the operation
        this.operations = undefined
        // clear the previous number
        this.previousNumber = ""
    }

    // updates the display of the calculator
    updateDisplay()
    {
        this.current.innerText = this.currentNumber
        this.previous.innerText = this.previousNumber
    }
}

// Array containing numbers from 0 to 9 and "."
let numbers = document.querySelectorAll(".numbers")
// Array with operations [+,-,*,/]
let operations = document.querySelectorAll(".operations")
// Equals button =
let equalBtn = document.getElementById("equal")
//  Delete button
let deleteBtn = document.getElementById("delete")
// Clear button
let clearBtn = document.getElementById("clear")
// Previous number on the calculator screen
let previous = document.getElementById("previous")
// Current number on the calculator screen
let current = document.getElementById("current")

// new Calculator
const calculator = new Calculator(previous,current);

// for each number button when click add number to string and update display
numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.writeNumber(number.innerText)
        calculator.updateDisplay()
    })
})

// for each operation button select operation and update display
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.selectOperation(operation.innerText)
        calculator.updateDisplay()
    })
})

// when click equal button run calculate and update the display
equalBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

// when click clear button clear all var and update display
clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

// when click delete button get rid of last number in the string
deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})