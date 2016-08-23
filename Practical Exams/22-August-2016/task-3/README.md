# Task 3 - Navigation

## Task overview

Build a **Handlebars template** for a simple navigation.

You can see how the navigation must look [here](./task/result.html)

You are provided with [index.html](./task/index.html) to test your progress. 

You can also run some of the tests locally. [Read here](/) to see how to run the tests

## Solution template:

```js
function solve() {
	return function() {
		var template = `
			<!-- you ' +  
			template here -->
        `;
		return template;
	}
}
```

You should write your **Handlebars template** in `task-3.js`.

##	Notes

-	The provided template should render the HTML exactly as in the [result](./task/result.html) file
-	The `logo` property of the `data` object is **optional** and can be missing

## Sample data
```js
var data = {
    logo: {
        url: "http://telerikacademy.com",
        image: "logo.png"
    },
    items: [{
        title: "Academy",
        url: "http://academy.telerik.com"
    }, {
        url: "#/courses",
        title: "Courses",
        items: [{
            title: "HTML Basics",
            url: "#/html-basics"
        }, {
            title: "CSS Styling",
            url: "#/css-styling"
        }, {
            title: "JavaScript Fundamentals",
            url: "#/jsf"
        }, {
            title: "JavaScript UI & DOM",
            url: "#/js-ui-dom"
        }, {
            title: "JavaScript OOP",
            url: "#/js-opp"
        }, {
            title: "JavaScript Application",
            url: "#/js-apps"
        }]
    }, {
        url: "#/archive",
        title: "Archive"
    }, {
        url: "#/forum",
        title: "Forum",
        items: [{
            title: "Web",
            url: "#/web"
        }, {
            title: "Mobile",
            url: "#/mobile"
        }, {
            title: "Core",
            url: "#/core"
        }, {
            title: "Embeded",
            url: "#/embeded"
        }, {
            title: "Algorithms",
            url: "#/algorithms"
        }]
    }, {
        url: "#/help",
        title: "Help"
    }, {
        url: "#/profile",
        title: "User",
        items: [{
            title: "Profile",
            url: "#/profime"
        }, {
            title: "My courses",
            url: "#/my-courses"
        }, {
            title: "Certificates",
            url: "#/certificates"
        }, {
            title: "Logout",
            url: "#/logout"
        }]
    }]
};
```
