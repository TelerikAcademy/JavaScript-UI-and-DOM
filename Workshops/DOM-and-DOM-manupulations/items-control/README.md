#   Steps for building UI Components with JavaScript


##  Task description

You can find the task description [here](task)


##  Steps for solving the task:

### Analyze the problem

-   Read the description carefully
    -   Selecting elements by nested selectors
        -   Which is the best way to do it?
    -   There should be three sections
        -   `.add-controls`
            -   Contains `LABEL`, `INPUT[TEXT]` and `BUTTON`
        -   `.search-controls`
            -   Contains `LABEL` and `INPUT[TEXT]` 
        -   `.result-controls`
            -   Contains `items-list`
            -   `.items-list` contains many
    -   You can always use the **CSS** as an additional help
-   What HTML tags should we use?
    -   Always prefer the semantically correct tags
    -   If there many consequetive items with similar UI:
        -    `UL` and `OL`
    -   If a text is bolded, bigger, highlighted:
        -   `H1`, `H2`, ..., `STRONG`
    -   If something looks like a button:
        -   `BUTTON` `INPUT[SUBMIT]`, `INPUT[BUTTON]`
            -   When the buttons sends something to a server
        -   `A` (anchor)
            -   When the button redirects to another page
            -   When the button only has a JS function attached


### Solve the problem

-   Adding elements
    -   Think of how to get the value of an input
-   Searching Elements
    -   Think of how to refresh the listed elements on value changed
        -   _Hint:_ use `input` event of `INPUT` elements
-   Listing elements
    -   Listing many elements with the same properties:
        -   class `.list-item`
        -   `.button` and text
    -   Which is the best way to create very similar elements, where only the **text** is different?
        -   _Hint:_ use `node.cloneNode(true)`:

            -   Create template for generating items:

                ```js
                var itemTemplate = document.createElement("li");
                itemTemplate.className = "list-item";
                itemTemplate.addChild(btnDeleteTemplate);
                itemTemplate.addChild(textTemplate);           
                ```

            -   Generate new item:

                ```js
                textTemplate.innerHTML = textFromAddTextbox;
                newItem = itemTemplate.cloneNode(true);
                ```

-   Deleting Elements
    -   Think of how to detect a click on `.button` inside a `.list-item`
        -   _Hint:_ attach the click event on the `.items-list` elements: [link](https://github.com/TelerikAcademy/JavaScript-UI-and-DOM/blob/master/Topics/07.%20Event%20Model/README.md#event-object)
    -   Think of how to delete the whole `.list-item` element
        -   _Hint:_ starting from the clicked `.button`, find its the parent with class `list-item` and delete it
