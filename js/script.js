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
const inputArray = [`0`];

// Variable for storing joined string from variable inputArray
let value = ``;

function inputCalc()
{
    /*
    Three conditional statements: -
    1. For '0-9' and '.', update display accordingly
    2. For backspace, truncate one character from the right
    3. For clear, clear entire display
    */

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

            // Checks that display does not exceed more than 15 characters
            else if (inputArray.length < 15)
            {
                // Replaces 0 in display with another input
                if (inputArray[0] === `0`)
                {
                    inputArray.pop();
                }

                inputArray.push(input[i].textContent);
            }

            updateDisplay();
        });
    }
}

function updateDisplay()
{
    const display = document.querySelector(`#display`);

    value = inputArray.join(``);
    
    display.textContent = value;
}

// Function call
updateDisplay();
inputCalc();