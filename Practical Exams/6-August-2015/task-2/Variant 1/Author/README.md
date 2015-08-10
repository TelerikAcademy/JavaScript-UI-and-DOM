#Task 2: Datepicker

* Given the HTML (`index.html`), CSS (`styles.css`), JavaScript (`scripts.js` and `jquery.min.js`) build a jQuery plugin for a simple datepicker control
* _The datepicker must:_
  * Be built from a simple text input tag
  * Show a calendar with the current month - the calendar should always show 6 rows of data and fill the empty spaces with the previous and next month's dates
  * Allow the user to navigate to the previous and next months
  * Allow the user to select a date from the calendar
  * Always show at the bottom the current date

* _See the pictures below for better understanding of the control_
  * Initial
    <img src="Images/initial.png" width="450" />
  * Clicking on the input must show the calendar with the current month
    <img src="Images/clicked.png" width="450" />
  * Clicking on the left and right buttons must navigate to the previous or next month
    <img src="Images/previous.png" width="450" />
	<img src="Images/next.png" width="450" />
  * Selecting a date should close the calendar and fill the input with the correct date in the format showed in the picture
    <img src="Images/selecting.png" width="450" />
	<img src="Images/selected.png" width="450" />
  * Clicking on the current date at the bottom should fill the input with the current date
	<img src="Images/current.png" width="450" />
	<img src="Images/current-selected.png" width="450" />
	
* _Additional requirements:_
  * You should wrap the input in another element and add all your new HTML elements inside the wrapper (jQuery may help you)
    <img src="Images/Before.png" width="450" />
	<img src="Images/After.png" width="450" />
  * The plugin should support chaining
  * Clicking on the previous or next month dates should not populate the input value
  * **IMPORTANT**: Always attach your events by classes and not by HTML elements!
  * **HARDCORE TASK**: Initially when the input is focused - the calendar should show. Add the functionality to hide the calendar only if the user clicks outside of the datepicker control
  
* _Hints:_
  * The provided CSS will help you build the HTML structure of the plugin
  * See the windows calendar to compare it with your control
  * Useful Date functions in JavaScript
    * `var date = new Date()` - returns the current date and time
	* `var date = new Date(2016, 11, 3)` - returns a date instance with information for December 3rd 2016 (January is zero)
	* `date.getDate()` - returns the date number from the date's instance object
	* `date.getMonth()` - returns the zero-based month index from the date's instance object (zero is January)
	* `date.getFullYear()` - returns the year from the date's instance object
	* `date.getDay()` - returns the day from the week from the date's instance object (zero is Sunday)
	* `date.setMonth(0)` - sets the month of the date's instance object to be January
    * `date.setDate(1)` - sets the date of the date's instance object to be the first day of the month
	* More available <a href="http://lmgtfy.com/?q=javascript+date+mdn">HERE</a> and <a href="http://lmgtfy.com/?q=javascript+get+last+day+of+month">HERE</a> 
  * Some functionality is already written to help you. Thank me later! :)
  
* _Constaints:_
  * You must alter only the scripts (JavaScript) and do not touch the HTML structure or the CSS styles
  * You must use jQuery to alter the DOM and build the plugin. You are not allowed to use the native document API
  * You are allowed only to edit the contents of the file "scripts.js"
  * You are NOT allowed to edit the contents of the HTML and/or the CSS files

* _Don't be sad! Here is a picture of cat to cheer you up:_
  <img src="Images/cat.jpg" width="450" />