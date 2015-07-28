# JavaScript-UI-and-DOM
JavaScript UI and DOM Course Repository

The **JavaScript UI and DOM** is about building of low-level user interface. The course covers titles like DOM, jQuery, events, graphics & animations with HTML5 Canvas and templates

##Course Program
1.   Course Introduction
2.   Document Object Model
3.   HTML5 Canvas
4.   Working with SVG
5.   Frameworks for Canvas and SVG
5.   Animations with Canvas and SVG
6.   DOM Operations
7.   Events and Event Model
8.   jQuery Overview
9.   jQuery plugins
10.  HTML Templates
11.  DOM Performance
12.  Exam preparation
13.  Teamwork Defense
14.  Exam

## Preparing the local machine for Unit testing with Mocha and Chai 

* Install [JavaScript I/O](https://iojs.org/en/index.html "JavaScript I/O")
    * Try if it is working by typing in CMD/Terminal `$ iojs -v` (should produce result)
*	Open CMD/Terminal and run `$ npm install -g mocha`

## Preparing for the tests for each homework

*	Checkout the repository for the particular homework	
*	Open CMD/Terminal and navigate to the checked out repository with the homework
*	Run `npm install` in CMD/Terminal
	*	A folder `node_modules` should appear
*	You are ready to run the tests

## Running the tests

*	Navigate to the folder of the particular homework in CMD/Terminal
*	Requirements:
	*	JavaScript files must be called task-1.js, task-2.js etc..
	*	Each .js file must contain `module.exports=[name of the object/function]`
* 	Run `npm test`
	*	Test results should appear on the CMD/Terminal
	
## Upload in [BGCoder.com](http://bgcoder.com/)

*	Go to the specific homework
*	Select the task you will be sending
*	Wrap your result in:

		function solve() {
			return [your solution object/function];
		}
	