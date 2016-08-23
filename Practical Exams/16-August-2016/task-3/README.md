# Task 3 - Forum

## Task overview

Build a **Handlebars template** for a forum. The forum should look like in [sample-1.html](./task/sample-1.html) and [sample-2.html](./task/sample-2.html).

You are provided with [index.html](./task/index.html) to test your progress. You can also use `npm test` from the command line.

## Solution template:

```js
function solve() {
	return function() {
		var template = [
			'first line',
			'second line',
			'...'
		].join('\n');

		return template;
	}
}
```

You should write your **Handlebars template** in `solution.js`.

### Sample data 1
```js
var data = {
	title: 'Conspiracy Theories',
	posts: [{
		author: '',
		text: 'Dear God,',
		comments: [{
			author: 'G',
			text: 'Yes, my child?'
		}, {
			author: '',
			text: 'I would like to file a bug report.'
		}]
	}, {
		author: 'Cuki',
		text: '<a href="https://xkcd.com/258/">link</a>',
		comments: []
	}]
};
```

### Sample data 2
```js
var data = {
	title: 'JS UI & DOM 2016',
	posts: [{
		author: 'Cuki',
		text: 'Hello guys',
		comments: [{
			author: 'Kon',
			text: 'Hello'
		}, {
			text: 'Hello'
		}]
	}, {
		author: 'Cuki',
		text: 'This works',
		comments: [{
			author: 'Cuki',
			text: 'Well, ofcourse!\nRegards'
		}, {
			text: 'You are fat',
			deleted: true
		}]
	}, {
		author: 'Pesho',
		text: 'Is anybody out <a href="https://facebook.com/">there</a>?',
		comments: []
	}]
};
```
