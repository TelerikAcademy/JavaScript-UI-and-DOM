# JavaScript UI & DOM
6 August 2015

# Task 3: Calendar Template

## Description
Given the HTML (index.html), CSS (styles.css) and JavaScript (scripts.js) **build a Handlebars template** that produces the HTML in **result.html**.

You should only fill the template in the element with id **"calendar-template"**.

When the user hovers an event the "comment" should pop up (use title property).

Note, that in the result, html elements with no title have "Free slot" as content in the title container (element with class "title").

### Final result
![task-3 result](https://cloud.githubusercontent.com/assets/3619393/9065226/15f50932-3ad9-11e5-878c-8602b1a1d109.jpg)
 
### Constraints:
- You are allowed only to edit the contents of the file "index.html " and only the template inside the element with ID "calendar-template"
- You are NOT allowed to edit the contents of the JavaScript and/or the CSS files

### Files to Submit:
When ready submit the .js file in BGCoder. Send the template as a string in the "solution.js" as shown in the example:

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

### Test data:
```js
var data = {
	year: 2015,
	month: 'August',
	days: [{
		day: 3,
		events: [
		{
			duration: 765,
			importance: 'none'
		}, 
		{
			title: 'My Event 1',
			time: '12:45',
			duration: 60,
			comment: 'no comment',
			importance: 'critical'
		}, 
		{
			duration: 15,
			importance: 'none'
		}, 
		{
			title: 'My Event 2',
			time: '14:00',
			duration: 120,
			comment: 'no comment',
			importance: 'important'
		}, 
		{
			duration: 60,
			importance: 'none'
		}, 
		{
			title: 'My Event 4',
			time: '17:00',
			duration: 60,
			comment: 'no comment',
			importance: 'unimportant'
		}, 
		{
			duration: 360,
			importance: 'none'
		}
		]
	}, 
	{
		day: 4,
		events: [
		{
			duration: 750,
			importance: 'none'
		}, 
		{
			title: 'Prepare for the Exam',
			time: '12:30',
			duration: 480,
			comment: 'no comment',
			importance: 'important'
		}, 
		{
			duration: 210,
			importance: 'none'
		}
		],
	}, 
	{
		day: 5,
		events: [
		{
			duration: 1320,
			importance: 'none'
		}, 
		{
			title: 'PARTY',
			time: '22:00',
			duration: 120,
			comment: 'I must be there',
			importance: 'unimportant'
		}
		],
	}, 
	{
		day: 6,
		events: [
		{
			title: 'PARTY',
			time: '0:00',
			duration: 180,
			comment: 'I must be there',
			importance: 'unimportant'
		}, 
		{
			duration: 390,
			importance: 'none'
		}, 
		{
			title: 'JS UI & DOM Exam',
			time: '9:30',
			duration: 780,
			comment: 'Keep your fingers crossed',
			importance: 'critical'
		}, 
		{
			duration: 90,
			importance: 'none'
		}
		],
	}, 
	{
		day: 7,
		events: [
		{
			title: 'Vacation',
			time: '0:00',
			duration: 1440,
			comment: 'Finaly some time to relax',
			importance: 'vacation'
		}
		],
	}, 
	{
		day: 8,
		events: [
		{
			title: 'Vacation',
			time: '0:00',
			duration: 1440,
			comment: 'Finaly some time to relax',
			importance: 'vacation'
		}
		],
	}, 
	{
		day: 9,
		events: [
		{
			title: 'Vacation',
			time: '0:00',
			duration: 1440,
			comment: 'Finaly some time to relax',
			importance: 'vacation'
		}
		],
	}
	]
};
```