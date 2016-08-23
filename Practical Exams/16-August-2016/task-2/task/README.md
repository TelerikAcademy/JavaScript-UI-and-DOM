# Task 2 - File explorer

## Task overview and requirements
You are given a ready **HTML**(`index.html`) and  **CSS**(`main.css`), and an empty **JavaScript** file(`solution.js`, which you should modify) that represent a directory of files. Your task is to implement a function that attaches the functionality 
described below to the user interface in `index.html`.

- **Show file contents**
    - clicking on a file item should display the content of the file in the item with class `.file-content`
    - your solution will be passed an object as parameter
        - the object will have the names of the files as properties and the values of those properties will be the content of the respective files
- **Toggle directory collapsing**
    - directories are collapsed by default
    - clicking on a folder item should toggle collapsing - if a directory is collapsed, clicking on it should show it's contents. Clicking on it again should collapse it again
- **Deleting items**
    - clicking on the trash icon in an item should remove it from the **DOM**
    - if a directory is removed, it should also remove all of it's contents
- **Adding new files**
    - clicking on the blue `+` button should hide the `+` button and make the input field visible
    - entering a file path in the input field and pressing the enter key should create a new file with that path. Duplicate file names **are allowed**.
    - the path can have two formats:
        - `DIR/FILENAME` - create a file with name `FILENAME` in the directory `DIR`
            - if directory with name `DIR` does not exist, **do nothing**
        - `FILENAME` - create a file with name `FILENAME` in the root directory
    - new files should be created with empty content
        
## Constraints
- You are **not supposed** to use inline styles.
- You are **not supposed** to modify `index.html` or `main.css` in any way. You should only modify `solution.js`.
- Your submission **must be** in the format below. Any other format will not yield any points.

```js
function solve() {
    return function (fileContentsByName) {
        // your implementation here
    }
}
```

- `DIR` and `FILENAME` will never be empty strings in the unit tests.
- `DIR` and `FILENAME` will never be longer than 20 symbols.
- The **DOM** elements will have the same structure in all tests as in `index.html`. The content may differ, but the structure will be consistent.
- There will never be duplicate directories.
- There will never be nested directories.

## Hints and resources
- You are provided 4 zero tests with feedback. You should know how to execute them.
- The `main.css` file contains all the classes you need.
- You are given a `result.html` file in the `final` folder. **This is how the implemented functionality should look and behave like.**
- The **DOM inspector** is your friend.
- Most tests test the features separately - correct partial implementations will yield part of the points.