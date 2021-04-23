/*=============================================================*/
/* GLOBAL VARIABLES                                            */
/*=============================================================*/
// Variable to store operator
let operator = ``;

// Operands
let firstValue = ``;
let secondValue = ``;

// Array for storing input
let inputArray = [`0`];

// Array for storing numbers for calculation
let calcArray = [];

// Result
let total = 0;

let counter = 0;
/*=============================================================*/
/* FUNCTIONS                                                   */
/*=============================================================*/
// Resets first value to ``
function resetFirstValue()
{
    firstValue = ``;
}

// Resets total to 0
function resetTotal()
{
    total = 0;
}

// Resets inputArray to [`0`]
function resetArray()
{
    inputArray = [`0`];
}

// Resets display to `0`
function clearDisplay()
{
    const clear = document.querySelector(`#clear`);

    clear.addEventListener(`click`, function()
    {
        resetArray();
        resetTotal();
        resetFirstValue();

        updateDisplay(inputArray);
    });
}

// Removes one digit from the display
function backspace()
{
    /* Things to fix: -
    1. Backspace must be able to truncate total
    */
    const backspace = document.querySelector(`#backspace`);

    backspace.addEventListener(`click`, function()
    {
        inputArray.pop();

        if (typeof inputArray[0] === `undefined`)
        {
            resetArray();
        }

        let backspaceOutput = inputArray.join(``);

        updateDisplay(backspaceOutput);
    });
}

// Updates display
function updateDisplay(variable)
{
    // Rounds variable to nearest hundredth if variable is a number
    if (typeof variable === `number`)
    {
        variable = Math.round(variable * 100)/100
    }

    const display = document.querySelector(`#display`);
    
    display.textContent = variable;
}

// Checks input and updates display
function checkInput()
{
    // Selects buttons '0-9, .'
    const input = document.querySelectorAll(`.input`);

    // Loop to update display
    for (let i = 0; i < input.length; i++)
    {
        input[i].addEventListener(`click`, function()
        {
            // Returns nothing if first display is `0`
            if (inputArray[0] === `0` && input[i].textContent === `0`)
            {
                return;
            }

            // Checks if there are more than one `.` input in the display
            let dupArray = [];
            for (let k = 0; k < inputArray.length; k++)
            {
                if (inputArray[k] === `.`)
                {
                    dupArray.push(inputArray[k]);
                }
            }

            // Checks that display does not exceed more than 15 characters
            if (inputArray.length < 15)
            {
                // If there is more than one `.` input, disable the `.` button
                if (dupArray.length > 0 && input[i].textContent === `.`)
                {
                    return;
                }
                // If first input is a `.`: -
                // 1. Add a `.` to the array
                // 2. Do not remove `0` from the array
                else if (inputArray[0] === `0` && inputArray.length === 1 && input[i].textContent === `.`)
                {
                    inputArray.push(input[i].textContent);
                }
                // If first input is not a `.`, replace `0` with the content of the first input
                else if (inputArray[0] === `0` && inputArray[1] !== `.`)
                {
                    inputArray.shift();

                    inputArray.push(input[i].textContent);
                }
                // Adds input content into array
                else
                {
                    inputArray.push(input[i].textContent);
                }
            }

            // Checks if any operator is clicked on after the `=` button, if not, reset total to 0
            if (operator === ``)
            {
                total = 0;
            }

            let displayValue = inputArray.join(``);

            // Updates display
            updateDisplay(displayValue);
        });
    }
}

// Joins array elements to variable and parses the value to an integer
function parseArray(variable, array)
{
    variable = array.join(``)
    variable = parseFloat(variable);

    return variable;
}

// Assigns 1 to variable if first element of inputArray is `0` and second element of inputArray is undefined
function checkArray(variable)
{
    if (inputArray[0] === `0` && typeof inputArray[1] === `undefined`)
    {
        variable = 1;
    }

    return variable;
}

// Add
function addition(value)
{
    total = total + value;
}

// Subtract
function subtraction(value)
{
    if (total === 0)
    {
        total = total + value;
    }
    else if (total !== 0)
    {   
        total = total - value;
    }
}

// Multiply
function multiplication(value)
{
    if (value === 0)
    {
        value = 1;
    }
    else if (total === 0)
    {
        total = 1 * value;
    }
    else if (total !== 0)
    {
        total = total * value;
    }
}

// Divide
function division(value)
{
    if (value === 0)
    {
        value = 1;
    }
    else if (total === 0)
    {
        total = value;
    }
    else if (total !== 0)
    {
        total = Math.round(total/value * 100)/100;
    }
}

// Checks value in operator variable
function checkOperator()
{
    if (operator === `+`)
    {  
        additionValue = inputArray.join(``);
        additionValue = parseFloat(additionValue);

        addition(additionValue);

        updateDisplay(total);
        resetArray();
    }
    else if (operator === `-`)
    {
        subtractionValue = inputArray.join(``);
        subtractionValue = parseFloat(subtractionValue);

        subtraction(subtractionValue);

        updateDisplay(total);
        resetArray();
    }
    else if (operator === `X`)
    {
        multiplicationValue = inputArray.join(``);
        multiplicationValue = parseFloat(multiplicationValue);

        multiplication(multiplicationValue);

        updateDisplay(total);
        resetArray();
    }
    else if (operator === `/`)
    {
        divisionValue = inputArray.join(``);
        divisionValue = parseFloat(divisionValue);

        division(divisionValue);

        updateDisplay(total);
        resetArray();
    }
}

// For operating on calculator inputs
function operate()
{
    // Initializes variables for operator input
    const add = document.querySelector(`#add`);
    const subtract = document.querySelector(`#subtract`);
    const multiply = document.querySelector(`#multiply`);
    const divide = document.querySelector(`#divide`);
    const equal = document.querySelector(`#equal`);

    let additionValue = ``;
    let subtractionValue = ``;
    let multiplicationValue = ``;
    let divisionValue = ``;

    // `+` button
    add.addEventListener(`click`, function()
    {
        // Operations for addition
        checkOperator();
        additionValue = parseArray(additionValue, inputArray);
        addition(additionValue);
        updateDisplay(total);
        resetArray();

        // Adds `+` to operator variable
        operator = add.textContent;
    });
    // `-` button
    subtract.addEventListener(`click`, function()
    {
        // Operations for subtraction
        checkOperator();
        subtractionValue = parseArray(subtractionValue, inputArray);
        subtraction(subtractionValue);
        updateDisplay(total);
        resetArray();

        // Adds `-` to operator variable
        operator = subtract.textContent;
    });
    // `X` button
    multiply.addEventListener(`click`, function()
    {
        // Operations for multiplication
        checkOperator();
        multiplicationValue = parseArray(multiplicationValue, inputArray);
        multiplication(multiplicationValue);
        updateDisplay(total);
        resetArray();
        checkArray(multiplicationValue);

        // Adds `X` to operator variable
        operator = multiply.textContent;
    });
    divide.addEventListener(`click`, function()
    {
        // Operations for division
        checkOperator();
        divisionValue = parseArray(divisionValue, inputArray);
        division(divisionValue);
        updateDisplay(total);
        resetArray();
        checkArray(divisionValue);

        // Adds `/` to operator variable
        operator = divide.textContent;
    });

    // `=` button
    equal.addEventListener(`click`, function()
    {
        checkOperator();

        // Set operator variable to empty string
        operator = ``;
    });
}

// Calls the program
function mainProgram()
{
    checkInput();
    operate();
    clearDisplay();
    backspace();
}
/*=============================================================*/
/* FUNCTION CALL                                               */
/*=============================================================*/
mainProgram();