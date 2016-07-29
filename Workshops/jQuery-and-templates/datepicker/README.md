# Steps for building UI components with JavaScript

## Description

You can find the task description [here]().

## Steps for solving the task

### Analyze the problem
- Go through the description carefully
- What should we do?
    - Dynamically build a datepicker from an input field
        - What elements should we create and use?
            - Take a look at the provided CSS file - `styles.css`
            - `table` elements are convinient for filling the calendar
            - `a` elements are appropriate for the buttons
            - `div` elements are useful for wrappers
        - What events should we attach?
            - There are buttons in the datepicker, so probably `click`
            - Selecting a date from the datepicker, `click` again
            - Focusing the initial input field, so `focus` or `click`
        - To which elements should we attach the events?
            - Try to attach events to parent elements for better performance

### Solving the problem
- Create the datepicker
    - You'll need to wrap the input field and the datepicker into a container
    - Create the datepicker elements
        - The header with the current month
            - Create 2 buttons for month navigation - `a` elements are appropriate
                - Attach navigation events to them
                - Remember you can use custom attributes
            - Create an element that will contain the current month - `p`, `div` and `strong` are all good
        - The month calendar
            - Create a `table`
                - The header should contain the days of the week
                - The body should contain the days of the month
                    - Look at the pictures in the description to get a good understanding of how the days of the month are displayed
                    - Think of how to generate the days for display in each month
                    - When a day of the month is clicked, it's value should be entered in the input field
                    - The calendar of your own PC is your friend :)
        - The datepicker footer
            - Should contain an element with the current date - `a` is appropriate
                - When clicked should set the value of the input to the current date
    - You plugin should enable chaining

- Useful jQuery things: .addClass(class), .toggleClass(class), .removeClass(class), .wrap(element), .appendTo(element), .append(element), .text(string), .html(string), creation and selection of elements with jQuery, event attaching with selectors