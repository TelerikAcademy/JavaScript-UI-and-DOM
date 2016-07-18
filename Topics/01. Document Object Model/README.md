<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-title" } -->
# Document Object Model
## The True power of dynamic web pages

<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- <img class="slide-image" showInPresentation="true" src="imgs/dom-first.jpg" style="top: 50%; right: 0%; width: 40%; border-radius: 15px; border: 3px solid yellowgreen; transform: rotate(7deg)" /> -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true,  } -->
# Table of Contents
- Document Object Model (DOM)
- The DOM API
- Selecting DOM elements
    - `getElementsBy`, `querySelector`
- NodeLists
    - LiveNodeList
    - StaticNodeList

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Document Object Model (DOM)
## The way to access HTML with JavaScript -->

<!-- attr: { hasScriptWrapper:true, style: 'font-size: 0.9em' } -->
# Document Object Model
- The Document Object Model is an **API for HTML and XML** documents
    - Provides a **structural representation** of the document
    - Developers can **modify the content and UI** of a web page

<img class="slide-image" src="imgs/dom.png" style="top: 42%; left: 20%; width: 60%; border-radius: 15px; border: 3px solid yellowgreen" />

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Document Object Model -->
- The DOM consists of objects to manipulate a web page
    - All the properties, methods and events are **organized into objects**
    - Those objects are accessible through **programming languages** and **scripts**
- How to use the DOM of an HTML page?
    - Write JavaScript to interact with the DOM
        - JavaScript uses the DOM API (native implementation for each browser)

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # DOM API
## Using the DOM with JavaScript -->

<!-- attr: { hasScriptWrapper:true } -->
# The DOM API
- The DOM API **consists of objects and methods to interact with the HTML page**
    - Can add or remove HTML elements
    - Can apply styles dynamically
    - Can add and remove HTML attributes
- DOM introduces objects that represent HTML elements and their properties
    - `document.documentElement` is `<html>`
    - `document.body` is the body of the page, where the content of the page is

<!-- attr: { hasScriptWrapper:true } -->

# DOM Objects
- Each of the HTML elements has corresponding DOM object type
    - `HTMLLIElement` represents `<li>`
    - `HTMLAudioElement` represents `<audio>`
- Each of these objects has the appropriate properties
    - `HTMLAnchorElement` has `href` property
    - `HTMLImageElement` has `src` property
- The `document` object is a special object
    - It represents the entry point for the DOM API

<!-- attr: { hasScriptWrapper:true } -->

# HTML Elements
- HTML elements have properties that match attributes
    - `id`, `className`, `draggable`, `style`, `onclick`, etc…
- Different HTML elements have their **specific attributes**
    - `HTMLImageElement` has property `src`
    - `HTMLInputElement` has property `value`
    - `HTMLAnchorElement` has property `href`

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # HTML Elements -->
- HTML elements have properties for content
    - `innerHTML`
        - Returns as a string the content of the element, without the element
    - `outerHTML`
        - Returns as a string the content of the element, with the element
    - `innerText` / `textContent`
        - Returns as a string the text content of the element, without the tags

<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # DOM Objects
## [Demo]() -->

<!-- Selecting DOM Elements -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Selecting DOM Elements
<img src="imgs/selecting-dom-elements.png" height="250"/>

<!-- attr: { hasScriptWrapper:true, style:"font-size:0.85em" } -->
# Selecting HTML Elements
- HTML elements can be found and cached into variables using the DOM API
  - Select single element
```js
var header = document.getElementById('header');
var nav = document.querySelector('#main-nav');
```

  - Select a collection of elements
```js
var inputs = document.getElementsByTagName('li');
var radiosGroup = document.getElementsByName('genders');
var header = document.querySelectorAll('#main-nav li');
```

  - Using predefined collections of elements
```js
var links = document.links;
var forms = document.forms;
```

<!-- attr: { hasScriptWrapper:true, style:"font-size: 0.9em" } -->
# Using `getElementsBy`<br/> Methods
- DOM API contains methods for selecting elements based on some characteristic
  - `getElementById(id)`:
    - Returns a **single element** or `null`
```js
var header = document.getElementById('header');
```
  - `getElementsByClassName(className)`:
    - Returns a **collection of elements**
```js
var posts = document.getElementsByClassName('post-item');
```

<!-- attr: { hasScriptWrapper:true, style:"font-size: 0.9em", showInPresentation:true } -->
<!-- # Using `getElementsBy`<br/> Methods -->
- DOM API contains methods for selecting elements based on some characteristic
  - `getElementsByTagName(tagName)`;
    - Returns a **collection of elements**
```js
var sidebars = document.getElementsByTagName('sidebar');
```
  - `getElementsByName(name)`;
    - Returns a **collection of elements**
```js
var gendersGroup = document.getElementsByName('genders');
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Selecting Elements with `getElementsBy`
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true, style:"font-size: 0.8em" } -->
# Using `querySelector` Methods
- The DOM API has methods that use CSS-like selectors to find and select HTML elements
    - `querySelector(selector)` returns the **left most element** that matches the selector
    - `querySelectorAll(selector)` returns **a collection of all elements** that match the selector
- Both methods take as a string parameter
    - The CSS selector of the element

```js
    //the element with id="header"
    var header = document.querySelector('#header');

    //li elements contained in element with id=main-nav
    var navItems = document.querySelectorAll('#main-nav li');
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Selecting Elements with `querySelector`
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true, style:"font-size: 43px" } -->
# Selecting Nested Elements
- The DOM API can be used to select elements that are inside other elements
    - Select all divs that are inside an element with id "wrapper"

```js
var wrapper = document.getElementById('wrapper');

// returns all div elements inside the element with id "wrapper"
var divsInWrapper = wrapper.getElementsByTagName('div');
```

   - All methods can be used on HTML elements
        - Except `getElementById`


<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Selecting Nested Elements
## [Demo]() -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # NodeLists
## The result of querying DOM elements -->

<!-- attr: { hasScriptWrapper:true } -->
# NodeLists
- A NodeList is a collection returned by the DOM selector methods:
    - `getElementsByTagName(tagName)`
    - `getElementsByName(name)`
    - `getElementsByClassName(className)`
    - `querySelectorAll(selector)`
    
```js
var divs = document.getElementsByTagName('div'),
    queryDivs = document.querySelectorAll('div');
for(var i = 0, length = divs.length; i < length; i += 1){
   // do stuff with divs[i]…
}
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # NodeLists -->
- NodeList looks like an array, but is not
    - It's an object with properties similar to array
        - Has length and indexer
    - Traversing an array with for-in loop works unexpected:

```js
console.log(Array.isArray(divs)); // false

for (var i in divs) {
   console.log('divs[' + i + '] = ' + divs[i]);
}
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true, showInPresentation:true } -->
<!-- # NodeLists
## [Demo]() -->

<!-- Static and Live Node Lists -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Static NodeList and<br/>Live NodeList
## What is that? What is the difference? -->

<!-- attr: { hasScriptWrapper:true, style:"font-size:0.85em" } -->
# Static NodeList and Live NodeList
- There are two kinds of NodeLists
    - `getElementsBy` methods return a **LiveNodeList**
    - `querySelectorAll` returns a StaticNodeList
- Live lists keep track of the selected elements
    - Even when changes are made to the DOM
    - While static list contain the elements as they were at the execution of the method
- Keep in mind that a `LiveNodeList` is slower than a regular array
    - Need to cache its length for better performance
    - Best converted to an array when iterated over multiple times

<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Static NodeList and<br/>Live NodeList
## [Demo]() -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", showInPresentation:true } -->
<!-- # Document Object Model (DOM)
## Questions? -->

<!-- attr: { showInPresentation: true, hasScriptWrapper: true, style:'font-size: 0.9em' } -->
# Free Trainings @ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](http://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="true"  src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true"  src="imgs/pic41.png" style="top:30%; left:68.14%; width:36.30%; z-index:-1" /> -->