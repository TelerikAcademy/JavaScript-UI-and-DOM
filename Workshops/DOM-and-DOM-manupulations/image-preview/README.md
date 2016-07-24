# Steps for building UI Components with JavaScript

## Task description
You can find the task description [here](./task/README.md)

## Steps for solving the task:

### Analyze the problem
- Go through the description carefully
    - You should select the element with the provided selector
    - The selected element should contain **2** sections
        - `.image-preview`
            - Contains the image selected for preview and it's title
        - `.image-container`
            - Display all images in a side section with their respective titles and a search bar

- What HTML tags to use?
    - Always favor semantically correct tags
    - For UI components of similar or same type use `UL` or `OL`
    - For bolded, bigger or highlighter text prefer `STRONG`, `H1`, `H2`, etc
    - Make use of semantic tags such as `SECTION`, `ASIDE`, `STRONG`
    - For text fields, search bars, etc, use `INPUT[type=text]` with `LABEL`

### Solving the problem
- Selecting the root - `document.querySelector`
- Creating elements using the input image info
    - Create and customize DOM elements using `document.createElement`, `htmlElement.innerText`,
`htmlElement.style`, `htmlElement.className`, `image.src`
        - Image preview for the left section
        - Images displaying for the sidebar
        - Search bar for the sidebar
- Adding the created elements to the DOM tree with `htmlElement.appendChild`
- Changing the content of a the `.image-preview` section when clicking on a side image
    - Attaching events with `htmlElement.addEventListener`
        - How to access the elemented targeted by the event?
    - Removing the old content from the DOM
    - Adding the new content
- Showing/hiding items on searchbar input
    - Attach a function on the searchbar that executes on input
        - Hide all items that the search input doesn't target
            - Extract the search value
            - Attach styles with JavaScript to hide/show items