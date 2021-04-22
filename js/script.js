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

// Array for storing input
let inputArray = [`0`];

// Variable for storing joined string from variable inputArray
let value = ``;

function add(num1, num2)
{
    value = num1 + num2;
}

function subtract(num1, num2)
{
    value = num1 - num2;
}

function multiply(num1, num2)
{
    value = num1 * num2;
}

function divide(num1, num2)
{
    value = num1/num2;
}

function operate()
{
    let firstNum = 0;
    let secondNum = 0;

    const add = document.querySelector(`#add`);
    const subtract = document.querySelector(`#subtract`);
    const multiply = document.querySelector(`#multiply`);
    const divide = document.querySelector(`#divide`);

    add.addEventListener(`click`, function()
    {
 
    });

    subtract.addEventListener(`click`, function()
    {

    });

    multiply.addEventListener(`click`, function()
    {

    });

    divide.addEventListener(`click`, function()
    {

    });
}

// Disables/enables buttons
function toggleButton(input, selectElement)
{
    const button = document.querySelector(selectElement);

    if (input === `true`)
    {
        button.setAttribute(`disabled`, `true`);
    }
    else if (input === `false`)
    {
        button.removeAttribute(`disabled`);
    }
}

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

            let pointCount = 0;
            // Checks if there are more than one `.` input in the display
            for (let k = 0; k < inputArray.length; k++)
            {
                if (inputArray[k] === `.`)
                {
                    pointCount++;
                }
            }

            // Checks that display does not exceed more than 15 characters
            if (inputArray.length < 15)
            {
                // If there is more than one `.` input, disable the `.` button
                if (pointCount > 0 && input[i].textContent === `.`)
                {
                    const button = document.querySelector(`#point`);

                    button.setAttribute(`disabled`, `true`);
                }
                //else if (pointCount < 1 && input[i].textContent === `.`)
               // {
               //     toggleButton(`false`, `#point`);
               // }

                // If first input is a `.`: -
                // 1. Add a `.` to the array
                // 2. Do not remove `0` from the array
                if (inputArray[0] === `0` && inputArray.length === 1 && input[i].textContent === `.`)
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

            updateDisplay();
        });
    }
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

        updateDisplay();
    });
}

// Removes one digit from the display
function backspace()
{
    const backspace = document.querySelector(`#backspace`);

    backspace.addEventListener(`click`, function()
    {
        inputArray.pop();

        if (typeof inputArray[0] === `undefined`)
        {
            resetArray();
        }

        updateDisplay();
    });
}

// Updates display
function updateDisplay()
{
    const display = document.querySelector(`#display`);

    value = inputArray.join(``);
    
    display.textContent = value;
}

// Function call
updateDisplay();
checkInput();
clearDisplay();
backspace();
operate();