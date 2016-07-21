<!-- section start -->

<!-- attr: { hasScriptWrapper:true, id:"title", class:"slide-title" } -->

# Event Model
##  Touch, Mouse, Keys
<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- attr: { hasScriptWrapper:true } -->
# Table of Contents
- [JavaScript Event Model](#js-event-model)
- [Event Registration](#event-registration)
    - HTML Attributes, DOM Properties and Methods
- [Event Object](event-object)
- [Capturing and Bubbling Events](#capturing-bubbling-events)

<!--Event Model-->

<!-- section start -->

<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"js-event-model" } -->
# JavaScript Event Model <!-- .element: style="margin-top: 12%" -->

<img src="imgs/section-js-event-model.jpg">

<!-- attr: { hasScriptWrapper:true } -->
# JavaScript Event Model

- The DOM event model provides a way for the user to interact with the browser environment
- The DOM event model consists of events and event listeners attached to the DOM objects

<div style="text-align: center">
    <img src="imgs/sample-js-event-model.png" style="border: none; background: none; box-shadow:none" />
</div>

<!-- attr: { hasScriptWrapper:true, style: 'font-size: 0.95em' } -->
# Event Types

- DOM provides a set of common event types that are used in 99% of the time
    - **Mouse** events
    - **Touch** events
    - **Form** events
    - **Keyboard** events
    - **DOM** events
- Full list of all DOM event types:
    - http://www.w3.org/TR/DOM-Level-3-Events/#event-types-list
- You could also define Custom Event Types

<!-- attr: { hasScriptWrapper:true, style: 'font-size: 0.9em' } -->
# Common Event Types

| **Mouse Events** | **Touch Events** | **Keyboard Events** |
| :--------------: | :--------------: | :-----------------: |
| `click`          | `tap`            | `keypress`          |
| `hover`          | `touchstart`     |  `keydown`           |
| `mouseup`        | `touchend`       |  `keyup`             |
| `mousedown`      | `touchmove`
| `mouseover`      | `touchcancel`
| `mouseout`       | `touchenter`
|                  | `touchleave`
<!-- attr: { hasScriptWrapper:true } -->
# Common Event Types

| **UI Events**  | **Focus Events**  |
| :------------: | :---------------: |
| `load`         |  `blur`
| `abort`        |  `focus`
| `select`       |  `focusin`
| `resize`       |  `focusout`
| `change`       |
| `input`       |

<!-- Event Registration-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"event-registration" } -->
# Event Registration <!-- .element: style="margin-top: 10%" -->
<img src="imgs/section-event-register.jpg" style="border: 3px solid yellowgreen; border-radius: 15px"/>

<!-- attr: { hasScriptWrapper:true } -->
# Event Handlers
- Event registration is done by providing a **callback function** for a** specific event type** and **DOM element**
- Three ways to register for an event:
  - With HTML Attributes
  - Using DOM element properties
  - Using DOM event handler

<!-- attr: { hasScriptWrapper:true } -->
# As HTML Attribute

- Event handlers can be attached by simply setting a value to the handler attribute
    - This value is pure JavaScript and is not always a function

```html
<!-- html -->
<button onclick="onButtonClick()">Click Me</button>
```


```js
// js
function onButtonClick() {
  console.log("You clicked the Button");
}
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Register Event Handlers using HTML Attributes
## Live Demo

<!-- attr: { hasScriptWrapper:true, style: 'font-size: 0.9em' } -->
# Using DOM Element Properties
- Use standard DOM events on certain DOM element and assign a reference to a function
  - Can be anonymous

```html
<!-- html -->
<button id="click-button">Click me</button>
```

```js
//js
var button = document.getElementById("click-button");
button.onclick = function onButtonClick() {
  console.log("You clicked the button");
}
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Using DOM Element Properties
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
# Using DOM Event Listeners

- The standard way for attaching event handlers to DOM
  - The Basic Syntax is:

```js
domElement.addEventListener(eventType, eventHandler, isCaptureEvent);
```

- _Example:_

```js
var button = document.getElementById("click-button");
button.addEventListener("click", function () {
  console.log("You clicked me");
}, false);
```

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Registering Event Handlers Using DOM
## Live Demo

<!-- The Event Object-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"event-object" } -->
# The Event Object <!-- .element: style="margin-top: 5%" -->
## Get the Event Data
<img src="imgs/section-event-object.png" style="background-color: rgba(0,0,0,0); border: none; box-shadow:none" />

<!-- attr: { hasScriptWrapper:true } -->
# Event Object
- The event handlers have access to the event object passed as function parameter
- The event object contains information about:
  - The **type** of the event
  - The **target** of the event
  - The **key that was pressed** when a keyboard event was fired
  - The **mouse button that was pressed** when a mouse event was fired
  - The **position** of the mouse on the screen

<!-- attr: { hasScriptWrapper:true, style:"font-size:40px" } -->
# Event Object
- The event object is accessible as the only argument of the function handler


```js
function onButtonClick(event) {
  console.log(event.target);
  console.log(event.type);
  console.log(event.clientX, event.clientY);
}
button.addEventListener("click", onButtonClick, false);
```

<!-- attr: {hasScriptWrapper: true, class: "slide-section"} -->
# Event Object <!-- .element: style="margin-top: 5%" -->
## Live Demo
<img src="imgs/section-event-object-demo.jpg" style="height:35%; border-radius:15px;" />

<!-- section start -->

<!-- attr: { hasScriptWrapper:true, class:"slide-section", id:"capturing-bubbling-events" } -->
# Capturing and Bubbling Events
## Top to Bottom and the other way around

<!-- attr: { hasScriptWrapper:true, style:"font-size: 42px" } -->
# The Event Chain
- When the user clicks on an HTML element, the event is also fired on all of its parents


```html
    <html>
      <body>
        <div>
          <button>
            Click Me
          </button>
        </div>
      </body>
    </html>
```

<span class="balloon fragment" style="top: 53%; left:45%;">Clicking on the button</span>
<span class="balloon fragment" style="top: 42%; left:23%; font-size: 0.35em">Fired</span>
<span class="balloon fragment" style="top: 38%; left:21%; font-size: 0.35em">Fired</span>
<span class="balloon fragment" style="top: 34%; left:18%; font-size: 0.35em">Fired</span>
<span class="balloon fragment" style="top: 30%; left:15%; font-size: 0.35em">Fired</span>

- The **button is still the target**, but the click event is fired on all of its parents
  - An event is fired on all elements in the chain

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# The Event Chain
## Live Demo

<!-- attr: { hasScriptWrapper:true, style:"font-size: 42px" } -->
# Two Types of Event Chains
- There are two types of event chains
 - Capturing and Bubbling
- **Bubbling** handlers **bubble up** the chain
 - The first executed handler is on the target
 - Then its parent's, and its parent's, etc…
- **Capturing** handlers **go down** the chain
 - The first executed handler is on the parent of all
 - The last executed handler is on the target

<!-- attr: { hasScriptWrapper:true } -->
# Capturing Event Chain
- Capturing goes down the event chain
  - The first executed handler is the one of the parent of all

  <div style="text-align: center">
    **HTML**<br/>
    **Body**<br/>
    **DIV**<br/>
    **BUTTON**<br/>
    <div class="fragment">
      User clicks the - **Button**
    </div>
  </div>

  - 1 <!-- .element: class="balloon fragment" style="top: 42%; left: 65%" -->
  - 2 <!-- .element: class="balloon fragment" style="top: 51%; left: 65%" -->
  - 3 <!-- .element: class="balloon fragment" style="top: 59%; left: 65%" -->
  - 4 <!-- .element: class="balloon fragment" style="top: 67%; left: 65%" -->

  <img class="fragment" src="imgs/sample-capturing-arrow-down.png" height="230" style="border: none; background: none;box-shadow: none; position: absolute; top: 42%; left: 25%">

<!-- attr: { hasScriptWrapper:true } -->
# Bubbling Event Chaing
- Bubbling bubbles up the event chain
  - The first executed handler is the one on the target

  <div style="text-align: center">
    **HTML**<br/>
    **Body**<br/>
    **DIV**<br/>
    **BUTTON**<br/>
    <div class="fragment">
      User clicks the - **Button**
    </div>
  </div>

  - 1 <!-- .element: class="balloon fragment" style="top: 60%; left: 65%" -->
  - 2 <!-- .element: class="balloon fragment" style="top: 52%; left: 65%" -->
  - 3 <!-- .element: class="balloon fragment" style="top: 43%; left: 65%" -->
  - 4 <!-- .element: class="balloon fragment" style="top: 35%; left: 65%" -->

  <img class="fragment" src="imgs/sample-capturing-arrow-up.png" height="230" style="border: none; background: none;box-shadow: none; position: absolute; top: 32%; left: 25%">

<!-- attr: { hasScriptWrapper:true, class:"slide-section", style:"font-size:40px" } -->
# Capturing and Bubbling Event Chains
## Live Demo

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
# JavaScript Event Model
## Questions
