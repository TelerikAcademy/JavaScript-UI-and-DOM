# Spreadsheet

## Task overview

Create a function that, by a given rows and columns count, creates a spreadsheet with that size.

#### Function description
- The function must take three parameters:
  - A **selector** that can be any CSS3 selector: 
    - By id - `#id`
    - By class - `.class`
    - By node type - `div`
    - Or nested selectors - `#this .is > a .nested.selector`
  - Row count
    - A positive integer number
  - Column count
    - A positive integer number

#### Spreadsheet structure
The following must be created and added to the **selector** element:
- A table with class `spreadsheet-table`
  - Table has **rows + 1** rows and **columns + 1** columns
    - including the header row and column
- Header cells should have classes `spreadsheet-item` and `spreadsheet-header`
  - Rows should be enumerated with numbers starting from `1`
  - Columns should be enumerated with uppercase Latin letters starting from `A`
    - number of columns won't exceed 26
- All other cells should have classes `spreadsheet-item` and `spreadsheet-cell`
  - They should contain two elements
    - `span` - displaying the text in the cell
	- `input` - used to edit the value in the cell

#### Selection
- Clicking on cells should select them
  - Add the `selected` class to the cell and header cells in the same row and column
  - Clicking on the header row should select the whole column
  - Clicking on the header column should select the whole row
  - Clicking on the upper-left header cell should select each cell in the table
- Dragging the mouse over several cells should select a rectangle of cells
  - If mouse drag starts from header cells, whole rows or columns should be selected
- _NOTE:_ use `mousedown`, `mousemove` and `mouseup` events
  - do **NOT** use the `click` event

#### Editing
- Double clicking on cells should edit them
  - NOT header cells
  - Add the `editing` class to the cell
  - Copy the value in the `span` element into the `input` element
- When the `input` element looses focus
  - Remove the `editing` class
  - Copy the value in the `input` element into the `span` element
- _NOTE:_ use `dblclick` and `blur` events

[Play with the solution](https://rawgit.com/TelerikAcademy/JavaScript-UI-and-DOM/master/Practical%20Exams/28-March-2017/Task-2_Spreadsheet/task/index_obfuscated.html) (don't worry, you can't submit it)

## Additional notes

- You are **NOT** allowed to alter the HTML or the CSS in any way
  - Keep in mind, the tests use the original HTML and CSS
- **Use jquery**
- Write all your code only in the `task.js` file
- Use the `index.html` file to view your progress
- Look at the `main.css` file, it may help you with the DOM structure

## Code template

```javascript
function solve() {

	return function(selector, rows, columns) {
	};
}

// SUBMIT THE CODE ABOVE THIS LINE

if(typeof module !== 'undefined') {
	module.exports = solve;
}
```
