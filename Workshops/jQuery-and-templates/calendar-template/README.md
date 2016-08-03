# Steps for building UI components with JavaScript

## Description

You can find the task description [here](./task/README.md)

## Steps for solving the task

### Analyze the problem
- Go through the description carefully
- What should we do?
    - Create a handlebars template that will be used to generate HTML for each element of a collection
        - Take a good look at the collection
        - What HTML elements should we create and what classes should they have?
            - Take a look at `result.html`
            - Take a look at the styles in `styles.css` file, they can give you a clue how to structure the template
            - For every day of the week, generate a `div`
                - For every event for the day, generate a `div` with events
                    - Find out what properties of the events you should render
                    - If an event has no title, then it's a free slot - make use of handlebars conditional statements
            - Use handlebars `each`
            - Attach the classes and use values from the objects with `{{}}`

### Solving the problem
- Write the handlebars template
    - You can write it directly in `index.html` and then copy it into `solution.js`
    - Use handlebars features like `each`, `if` and interpolation
    - Compare your results with `result.html`

### Running the tests locally
- Run `npm install` in the `calendar-template` directory
- Run `npm test` in the `calendar-template` directory
- The tests will test the contents of `solution.js` file
- `solution.js` must be in the following format:

```js
function solve() {
    return function (selector) {
        var template = [
            // put the lines of your template in this array as strings
        ].join('');

        if(template.length) {
            document.getElementById(selector).innerHTML = template;
        }
    };
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}
```

### Submitting in BgCoder.com
- The submission template is the same as the test template, but without module.exports statement. You can just comment it and submit.

```js
function solve() {
    return function (selector) {
        var template = [
            // put the lines of your template in this array as strings
        ].join('');

        if(template.length) {
            document.getElementById(selector).innerHTML = template;
        }
    };
}
```
- Submit at this <a href="http://bgcoder.com/Contests/Practice/Index/263#2" target="_blank">link</a>
