/*
1. Create the following four functions: -
    - add(num1, num2)
    - subtract(num1, num2)
    - multiply(num1, num2)
    - divide(num1, num2)

2. Create operate() function does the following: -
    - takes an operator and 2 numbers, and call one of the 
        aforementioned 4 functions

3. Create functions that populate display when you click on 
    the numbers

So how should it work?
1. If user clicks/keys in the following inputs 
    (1, 2, 3, 4, 5, 6, 7, 8, 9, 0, .)
    - The input should be on display
    - If the first character is '0', then no other zeroes can
        can be inputted
    - If there is already a '.', then no other periods can be
        inputted

2. When user clicks/keys in one of the following inputs
    (/, *, +, -)
    - The input from Step 1 should still be on display
    - Upon keying in the first input from Step 1, the old display
        will be replaced by the new input

3. Once user has clicked/keyed in two numbers and an operator from 
    Step 1 and Step 2: -
    - If user clicks/keys in on (=), the display should show the result
        of the two numbers manipulated by the 
        chosen operator from Step 2
    - If user clicks/keys in on another operator, the display should
        show the result of the two numbers manipulated by the 
        chosen operator from Step 2

4. If user click/keys in on (BACKSPACE), the input display will be
    truncated by one character from the right

5. If user clicks/keys in on (CLEAR), the display is reset to a value of 0
*/

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
                    const decimalInput = document.querySelector(`#point`);

                    decimalInput.setAttribute(`disabled`, `true`);
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

            let displayValue = inputArray.join(``);

            // Updates display
            updateDisplay(displayValue);
        });
    }
}

function addition()
{
    total = total + firstValue;
}

function subtraction()
{
    if (total === 0)
    {
        total = total + firstValue;
    }
    else if (total !== 0)
    {   
        total = total - firstValue;
    }
}

function multiplication()
{
    if (total == 0)
    {
        total = 1 * firstValue;
        console.log(`Total IF: `, firstValue)
        console.log(`First Value IF: `, firstValue)
    }
    else if (total != 0)
    {
        total = total * firstValue;
        console.log(`Total ELSE: `, firstValue)
        console.log(`First Value ELSE: `, firstValue)
    }
}

function division()
{
    total = total/firstValue;
}

function assignFirstValue()
{
    firstValue = inputArray.join(``);
    firstValue = parseInt(firstValue);
    console.log(`Assigned First Value: ${firstValue}`);
}

function assignSecondValue()
{
    secondValue = inputArray.join(``);
    secondValue = parseInt(secondValue);
    console.log(`Assigned Second Value: ${secondValue}`);
}

function updateCalcDisplay()
{
    total = total.toString();
    updateDisplay(total);
    total = parseInt(total);
    console.log(`Total ${total}`)

    resetArray();
    resetFirstValue();
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
        additionValue = inputArray.join(``);
        additionValue = parseInt(additionValue);

        total = total + additionValue;

        updateDisplay(total);
        resetArray();

        operator = add.textContent;
    });
    // `-` button
    subtract.addEventListener(`click`, function()
    {
        subtractionValue = inputArray.join(``);
        subtractionValue = parseInt(subtractionValue);

        if (total === 0)
        {
            total = total + subtractionValue;
        }
        else if (total !== 0)
        {   
            total = total - subtractionValue;
        }

        updateDisplay(total);
        resetArray();

        operator = subtract.textContent;
    });
    // `X` button
    multiply.addEventListener(`click`, function()
    {
        multiplicationValue = inputArray.join(``);
        multiplicationValue = parseInt(multiplicationValue);

        if (multiplicationValue === 0)
        {
            multiplicationValue = 1;
        }
        else if (total === 0)
        {
            total = 1 * multiplicationValue;
            console.log(`Total IF: `, multiplicationValue)
            console.log(`First Value IF: `, multiplicationValue)
        }
        else if (total !== 0)
        {
            total = total * multiplicationValue;
            console.log(`Total ELSE: `, multiplicationValue)
            console.log(`First Value ELSE: `, multiplicationValue)
        }

        updateDisplay(total);
        resetArray();

        if (inputArray[0] === `0` && typeof inputArray[1] === `undefined`)
        {
            multiplicationValue = 1;
        }

        operator = multiply.textContent;
    });

    // `=` button
    equal.addEventListener(`click`, function()
    {
        if (operator === `+`)
        {  
            additionValue = inputArray.join(``);
            additionValue = parseInt(additionValue);

            total = total + additionValue;

            updateDisplay(total);
            resetArray();
        }

        if (operator === `-`)
        {
            subtractionValue = inputArray.join(``);
            subtractionValue = parseInt(subtractionValue);

            if (total === 0)
            {
                total = total + subtractionValue;
            }
            else if (total !== 0)
            {   
                total = total - subtractionValue;
            }

            updateDisplay(total);
            resetArray();
        }

        if (operator === `X`)
        {
            multiplicationValue = inputArray.join(``);
            multiplicationValue = parseInt(multiplicationValue);

            total = total * multiplicationValue;
            console.log(`Total ELSE: `, multiplicationValue)
            console.log(`First Value ELSE: `, multiplicationValue)


            updateDisplay(total);
            resetArray();
        }

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

// Function call
mainProgram();