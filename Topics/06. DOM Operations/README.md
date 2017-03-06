<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title", class:"slide-title" } -->
# DOM Operations
## Creating dynamic pages

<div class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</div>


<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"table-of-contents" } -->
# Table of Contents
- [DOM Elements](#dom-elements)
- [Traversing the DOM](#dom-traversing)
  - [Parents, Children and Siblings]()
- [DOM manipulation](#dom-manipulation)
  - [Adding, Removing and Altering Elements]()
- [DOM Optimizations](#dom-optimizations)


<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"dom-elements", class:"slide-section" } -->
# <a id="dom-elements"></a>DOM Elements
## What is the DOM built from?

<!-- attr: { hasScriptWrapper:true } -->
# DOM Elements
- А **DOM element** is a JavaScript object that represents an element from the HTML
    - **Selected** using any of the DOM selectors
    - **Created** dynamically from code
- DOM elements can be changed
    - This changes are **immediately** applied to the DOM, and the HTML page

```javascript
  //changes the content of the div
  selectedDiv.innerHTML = "changed";
  //changes the background of the div to "#456"
  selectedDiv.style.background = "#456";
  var div = document.createElement("div");
```

<!-- attr: { class:"slide-section", showInPresentation:true, hasScriptWrapper:true } -->
<!-- # DOM Elements
## [Demo]() -->

<!-- Traversing the DOM -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"dom-traversing" } -->
# <a id="dom-traversing"></a>Traversing the DOM <!-- .element: style="margin-top:55px" -->
<img class="slide-image" showInPresentation="true" src="imgs/traversing-the-dom-section-slide.png" style="left:0;" />

<!-- attr: { hasScriptWrapper:true } -->
# Traversing the DOM
- DOM elements have properties about their **position** in the DOM:
   - Their parent
   - Their children
   - Their Siblings
      - Elements immediatelly **before** and **after** the element
- These properties can be used to traverse through the DOM

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Traversing the DOM -->
- `element.parentNode`
    - Returns the direct **parent** of the element
    - The parent of document is null
- `element.childNodes`
    - Returns a nodeList of all the **child nodes**
        - Including the **text nodes** (whitespaces)

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Traversing the DOM -->

- Traverse a `<ul>` with `<li>`s:

```javascript
function iterateList (listId) {
    var trainersList = document.getElementById(listId);
    var parent = trainersList.parentNode;
    log("parent of trainers-list: " + parent.nodeName +
        " with id: " + parent.id);

    var children = trainersList.childNodes;
    log("elements in trainers-list: " + children.length);
    log("element in trainers-list");

    for (var i = 0, len = children.length; i < len; i+=1) {
      var subItem = children[i];
      log(subItem.nodeName + " content: " +
          subItem.innerText);
    }
}
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Traversing the DOM
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Using the Named<br/>Elements in DOM Objects
- DOM elements have some properties for special elements around them:
    - **first** and **last** child nodes
    - The element **before**/**after** the current node
- The named elements are:
    - `firstChild` and `lastChild`
    - `nextSibling` / `nextElementSibling`
    - `previousSibling` / `previousElementSibling`

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Using the Named Elements in DOM Objects
## [Demo]() -->


<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"dom-manipulation" } -->
# <a id="dom-manipulation"></a>Manipulating the DOM
## Making a web page dynamic

<!-- attr: { hasScriptWrapper:true } -->
# Manipulating the DOM
- DOM can be manipulated dynamically with JS
    - HTML elements can be **created**
    - HTML elements can be **removed**
    - HTML elements can be **altered**
        - Change their content
        - Change their styles
        - Change their attributes

<!-- attr: { hasScriptWrapper:true } -->
# Creating HTML Еlements
- The document object has a method for creation of HTML elements
    - `document.createElement(elementName)`
    - Returns an object with the corresponding HTML element type

```javascript
  var liElement = document.createElement("li");
  console.log(liElement instanceof HTMLLIElement); //true
  console.log(liElement instanceof HTMLElement); //true
  console.log(liElement instanceof HTMLDivElement); //false
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Creating HTML Еlements -->
- After an HTML element is created it can be treated as if it was selected from the DOM
- When HTML elements are created dynamically they are just **JavaScript objects**
    - They are still not in the DOM (the web page)
    - New HTML elements must be **appended to DOM**

```javascript
  var studentsList = document.createElement("ul");
  var studentLi = document.createElement("li");
  studentsList.appendChild(studentLi);
  document.body.appendChild(studentsList);
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Appending Elements<br/>to the DOM
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Inserting Elements<br/>Before/After Other Element
- The DOM API supports inserting a element before or after a specific element
  - `appendChild()` inserts the element always at the end of the DOM element
  - `parent.insertBefore(newNode, specificElement)`

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Inserting Elements After/Before Other Elements
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Removing Elements
- Elements can be removed from the DOM
  - Using `element.removeChild(elToRemove)`
  - Pass the element-to-remove to their parent

```javascript
  var trainers = document.getElementsByTagName("ul")[0];
  var trainer = trainers.getElementsByTagName("li")[0];
  trainers.removeChild(trainer);
```

```javascript
  //remove a selected element
  var selectedElement = //select the element
  selectedElement.parentNode.removeChild(selectedElement);
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Removing Elements
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Altering the Elements
- DOM elements can be remove and/or changed
  - Both the node's children and the node itself
- With the DOM API each DOM element node can be altered
  - Change its properties
  - Change its appearance

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Altering the Elements -->
- Keep in mind that each HTML element is unique in the DOM
  - If JavaScript changes its appearance or its position, it is still the same element object


```html
  <div id="f"><p id="the-p">text</p></div>
  <div id="s"></div>
```

```javascript
  var second = document.getElementById("s");
  var theP = document.getElementById("the-p");
  second.appendChild(theP);
```

```html
  //the DOM is:
  <div id="f"></div>
  <div id="s"><p id="the-p">text</p></div>
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Altering HTML Elements
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Altering the Style
- The style of each HTML element can be altered using JavaScript
  - Meaning changing the **style** attribute
    - The inline styles, not CSS

```javascript
  var div = document.getElementById("content");
  div.style.display = "block";
  div.style.width = "123px";
```

<div class="fragment balloon" style="top:59%; left:48%; width:15%">Do not forget the unit</div>


<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Altering the Style
## [Demo]() -->

<!-- DOM Optimizations-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"dom-optimizations" } -->
# <a id="dom-optimizations"></a>DOM Optimizations
## Everybody likes it fast, right?

<!-- attr: { hasScriptWrapper:true } -->
# Appending DOM Elements
- The DOM API provides a method for appending DOM elements to a element
  - The `appendChild()` method
- `parentNode.appendChild(node)`
  - Appends the DOM element **node** to the DOM element **parentNode**
  - If **parentNode** is appended to the DOM, the **node** is also appended

<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
# Optimizing the<br/>Appending of Elements
- Appending elements to the DOM is a **very slow operation**
  - When an elements is appended to the DOM, the DOM is **rendered anew**
  - All newly created elements must be appended together
- Here comes the `DocumentFragment` element
  - It is a **minimal DOM element**, with no parent
  - It is used to **store ready-to-append** elements and append them at once to the DOM

<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px", showInPresentation:true } -->
<!-- # Optimizing <br/>the Appending of Elements -->
- Using `DocumentFragment`
  - Append the elements to a `DocumentFragment`
  - Appending `DocumentFragment` to the DOM appends only its child elements
  <!-- //link jsperf is unavailable  - http://jsperf.com/append-doc-fragment/2 -->

```javascript
    var dFrag = document.createDocumentFragment();
    dFrag.appendChild(div);

    //appending more elements
    document.body.appendChild(dFrag);
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Working with DocumentFragment
## [Demo]() -->

<!-- attr: { hasScriptWrapper:true } -->
# Faster Creation<br/>of Elements
- **Creating a DOM element** is a slow operation
  - Create the element
  - Set its **content**
  - Set its **style**
  - Set its **attributes**
- This is an issue when creating many elements that have a common structure
  - Only **one or two** things are different for all elements

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Faster Creation<br/>of Elements -->
- Creating a **dynamic list** of elements
  - All of the `<li>` elements have the **same classes**, **styles**, **attributes**
  - Only the `innerHTML` is different
- `DomElement.cloneNode(true)` can be used
  - Creates a full copy (deep copy) of the element

```javscript
    var clonedNode = someElement.cloneNode(true)
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-section" } -->
<!-- # Faster Creation of Elements
## [Demo]() -->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-questions", id:"questions" } -->
<!-- # DOM Operations
## Questions? -->
