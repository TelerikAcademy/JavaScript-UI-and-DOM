# Item lists

## Task overview

Create a function that, by a given arrays of strings, creates two columns of item lists.

#### Function description
- The function must take three parameters:
  - A **selector** that can be any CSS3 selector: 
    - By id - `#id`
    - By class - `.class`
    - By node type - `div`
    - Or nested selectors - `#this .is > a .nested.selector`
  - Default values for the left column
    - Array of strings
    - **optional**, may not be provided
  - Default values for the right column
    - Array of strings
    - **optional**, may not be provided

#### Column structure
The following must be created and added to the **selector** element:
- An element with class `column-container`
  - Should contain two elements with class `column`
- An input field
  - Used for adding new items
- A button
  - Used for adding new items

Each column should contain:
- An element with class `select`
  - Should contain a radio button
- An `ol` element
  - Contains the items
  - Each `li` should have class `entry`
    - contains the item text
	- contains an `img` element with class `delete`
	  - use the `Remove-icon.png` file for `src`

#### Adding items
- Clicking on the button should add the contents of the input field at the bottom of one of the columns
  - Adds to the column which has its radio button checked
    - left column should be selected by default
  - Trim item text
  - Do not add empty entries
- _NOTE:_ use the `click` event

#### Removing items
- Clicking on the `delete` image of an item should delete it
  - Item text should appear in the input field
- _NOTE:_ use the `click` event

[Play with the solution](task/index_obfuscated.html) (don't worry, you can't submit it)

## Additional notes

- You are **NOT** allowed to alter the HTML or the CSS in any way
  - Keep in mind, the tests use the original HTML and CSS
- You are **NOT** allowed to use jquery
- Write all your code only in the `task.js` file
- Use the `index.html` file to view your progress
- Look at the `main.css` file, it may help you with the DOM structure

## Code template

```javascript
function solve() {

	return function(selector, defaultLeft, defaultRight) {
	};
}

// SUBMIT THE CODE ABOVE THIS LINE

if(typeof module !== 'undefined') {
	module.exports = solve;
}
```
