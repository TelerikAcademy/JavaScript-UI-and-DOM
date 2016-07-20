# DOM Operations
_For instructions on how to run the tests, check [here](https://github.com/TelerikAcademy/JavaScript-UI-and-DOM/blob/master/RUN_TESTS.md)

##  Task 1
Create a function that takes an id or DOM element and an array of contents

* If an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neither `string` nor `number`
    * In that case, the content of the element **must not be** changed   
