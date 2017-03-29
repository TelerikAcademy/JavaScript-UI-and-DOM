# Task 3 - Tabs

## Task overview

Build a **Handlebars template** for a generating tabs. The forum should look like in [sample.html](./task/sample.html)

You are provided with [index.html](./task/index.html) to test your progress. You can also use `npm test` from the command line.

## Solution template:

```js
function solve() {
		var template = [
			'first line',
			'second line',
			'...'
		].join('\n');

		return template;
}
```

You should write your **Handlebars template** in `task.js`.

### Sample data
```js
var data = {
  titles: [{ text: "Tab 1", link: "tab-1" },
           { text: "Tab 2", link: "tab-2" },
           { text: "Tab 3", link: "tab-3" }
  ],
  contents: [{ link: "tab-1", text: "Tab 1, no so special..." }, 
             { link: "tab-2", text: "<p>Some text in a p</p><a href=\"#\">a link</a>" }, 
             { link: "tab-3", text: "<strong>And a list</strong><ul><li>Just</li><li>a</li><li>regular</li><li>list</li></ul>" }
  ]
};
```

_Hint: _ you can use [The Babel REPL](https://babeljs.io/repl/) to compile multiline strings to ES5-compliant code 
