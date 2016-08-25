# Task 2 - File explorer

## Description

Your task is to create a jQuery plugin that takes an array of files and directories as input parameter and creates a file explorer view with those files. 
The file explorer should look like that:

![result-view](./result/final.png)

- The file browser should have two sections:
    - The file preview section is the right section.
        - Should have class `file-preview`.
        - Should contain a single `<p />` element that will contain the contents of the file opened for preview. The `<p />` element should initially be empty.
    - The file explorer section is the left section.
        - Should have class `file-explorer`.
        - Should list all files and directories as a tree view.
            - Files should have class `file-item`. When clicked, the contents of the file should be visible in the file preview section.
            - Directories should have class `dir-item`. When clicked, a directory should be collapsed if currently expanded, and expanded if currently collapsed. Don't set inline styles - use the provided CSS classes.
            - Files and directories should have class `item`.
        - It should also contain a trash bin element. 
            - It should have class `trash`.
            - File and directory items should be draggable. When an item is dragged and dropped on the trash bin, it should be deleted from the files view.
    - Take a look at the provided styles in `main.css` to get a better understanding of the expected DOM structure.

## Constraints
- Directories will never contain other directories. That means that there will never nested directories.
- The parameter passed to your plugin function will always be an array.
    - A file object will always have the following properties:
    ```js
        { name: String, content: String }
    ```
    - A directory object will always have the following properties:
    ```js
        { name: String, files: [ fileObjects ] }
    ```
    - Take a peek at the input parameter in `index.html`.
