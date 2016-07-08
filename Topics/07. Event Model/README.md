<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title" class:"slide-title" } -->
<h1>Event Model</h1>
<h2>Touch, Mouse, Keys</h2>
<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- attr: { hasScriptWrapper:true } -->
# Table of Contents
- JavaScript Event Model
- Event Registration
- HTML Attributes, DOM Properties and Methods
- Event Object
- Cross-Browser Event Handler
- Capturing and Bubbling Events
- Custom Events

<!--Event Model-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"event-model" } -->
# JavaScript Event Model <!-- .element: style="margin-top: 12%" -->
<img src="imgs/section-js-event-model.jpg">

<!-- attr: { hasScriptWrapper:true } -->
# JavaScript Event Model
- The DOM event model provides a way for the user to interact with the browser environment
- The DOM event model consists of events and event listeners attached to the DOM objects
<div style="text-align: center">
    <img src="imgs/sample-js-event-model.png" style="border: none; background: none; box-shadow:none" />
</div>

<!-- attr: { hasScriptWrapper:true } -->
# Event Types
- DOM provides a set of common event types that are used in 99% of the time
    - Mouse events
    - Touch events
    - Form events
    - Keyboard events
    - DOM events
- Full list of all DOM event types:
    - http://www.w3.org/TR/DOM-Level-3-Events/# event-types-list
- You could also defined Custom Event Types
<div style="text-align: center">
    <img src="imgs/sample-js-event-model.png" style="border: none; background: none; box-shadow:none" />
</div>

<!-- attr: { hasScriptWrapper:true } -->
# Common Event Types
|- *Mouse Events**|**Keyboard Events**|
|:------------:|:---------------:|
|click       |keypress
|hover       |keydown
|mouseup     |keyup
|mousedown   |
|mouseover   |
|mouseout    |

<!-- attr: { hasScriptWrapper:true } -->
# Common Event Types
|- *UI Events**|**Focus Events**|
|:-----------:|:---------------:|
|load         |blur
|abort        |focus
|select       |focusin
|resize       |focusout
|change       |
|input        |

<!-- attr: { hasScriptWrapper:true } -->
# Common Event Types
|- *Touch Events**|
|:--------------:|
|tap             |
|touchstart      |
|touchend        |
|touchmove       |
|touchcancel     |
|touchenter      |
|touchleave      |

<!-- Event Registration-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"event-registration" } -->
# Event Registration <!-- .element: style="margin-top: 10%" -->
<img src="imgs/section-event-register.jpg" style="border: 3px solid yellowgreen; border-radius: 15px"/>

<!-- attr: { hasScriptWrapper:true } -->
# Event Handlers
- The developer could register an event handler/listener for a specific event type and DOM element
- The registration can be performed with:
  - HTML Attributes
  - Using DOM element properties
  - Using DOM event handler

<!-- attr: { hasScriptWrapper:true } -->
<h1>As HTML Attribute</h1>
<ul>
  <li>Event handlers can be attached by simply setting a value to the handler attribute
    <ul>
      <li>This value is pure JavaScript and is not always a function</li>
    </ul>
  </li>
</ul>
<pre><code><button onclick="buttonClickFunction()">Click Me</button></code></pre>
<pre><code>function buttonClickFunction() {
  console.log("You click the Button");
}</code></pre>

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Register Event Handlers using HTML Attributes
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
# Using DOM Element Properties
- Use standard DOM events on certain DOM element and assign a reference to a function
  - Can be anonymous

- **HTML**

    <button id="click-button">Click me</button>

- **JavaScript**

    var button = document.getElementById("click-button");
    button.onclick = function onButtonClick() {
      console.log("You clicked the button");
    }

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Using DOM Element Properties
## Live Demo

<!-- attr: { hasScriptWrapper:true } -->
# Using DOM Event Listeners
- The standard way for attaching event handlers to DOM
  - The Basic Syntax is:

    domElement.addEventListener(eventType,
      eventHandler,
      isCaptureEvent)

 - _Example:_

    var button = document.getElementById("click-button");
    button.addEventListener("click", function () {
      console.log("You clicked me");
    }, false);

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Registering Event Handlers Using DOM
## Live Demo

<!-- The Event Object-->

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"event-object" } -->
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

    function onButtonClick(event) {
      console.log(event.target);
      console.log(event.type);
      console.log(event.clientX, event.clientY);
    }
    button.addEventListener("click", onButtonClick, false);

- Yet, there is IE - it does not pass event object
  - Keeps the event object in window.event
  - Fortunately there is a simple fix

    function onButtonClick(event) {
      if(!event) event = window.event;
      // Your code…
    }

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
<script>
  # Event Object <!-- .element: style="margin-top: 5%" -->
  ## Live Demo
  <img src="imgs/section-event-object-demo.jpg" style="height:35%; border-radius:15px;" />
</script>

<!-- Cross-browser Event handlers-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"cross-browser-handlers" } -->
# Cross-browser Event Handlers
## Remember a certain browser

<!-- attr: { hasScriptWrapper:true, style:"font-size:40px" } -->
# Cross-browser Compatibility
- `addEventListener()` is n0t supported everywhere
  - Older versions of IE have their own method for registering event handlers

      domElement.attachEvent('onclick', eventHander);

  - Yet, you can use **feature detection**

      // Up to IE8
      if (document.attachEvent){
        domElement.attachEvent(…);}
      // IE 9, IE 10, Firefox, Chrome, Opera, Safari
      else if (document.addEventListener) {
        domElement.addEventListener(…); }
      // Reeeally old browsers
      else { domElement["on" + eventType] = handler; }

<!-- attr: { hasScriptWrapper:true } -->
# CrossBrowser Event Handler
- This can be wrapped in a method:
  - Create a function with three parameters
    - Target element
    - Event type
    - Event handler
  - Use the method your browser supports

<!-- attr: { hasScriptWrapper:true, class:"slide-section" } -->
# Cross-Browser Event Handler
## Live Demo

<!-- Capturing and bubbling Events-->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"capturing-bubbling-events" } -->
# Capturing and Bubbling Events
## Top to Bottom and the other way around

<!-- attr: { hasScriptWrapper:true, style:"font-size: 42px" } -->
# The Event Chain
- When the user clicks on an HTML element, the event is also fired on all of its parents

    <html>
      <body>
        <div>
          <button>
            Click Me
          </button>
        </div>
      </body>
    </html>

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
    - **HTML**<br/>
    - **Body**<br/>
    - **DIV**<br/>
    - **BUTTON**<br/>
    <div class="fragment">
      User clicks the - **Button***
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
    - **HTML**<br/>
    - **Body**<br/>
    - **DIV**<br/>
    - **BUTTON**<br/>
    <div class="fragment">
      User clicks the - **Button***
    </div>
  </div>

  - 1 <!-- .element: class="balloon fragment" style="top: 54%; left: 65%" -->
  - 2 <!-- .element: class="balloon fragment" style="top: 45.5%; left: 65%" -->
  - 3 <!-- .element: class="balloon fragment" style="top: 37.5%; left: 65%" -->
  - 4 <!-- .element: class="balloon fragment" style="top: 27%; left: 65%" -->

  <img class="fragment" src="imgs/sample-capturing-arrow-up.png" height="230" style="border: none; background: none;box-shadow: none; position: absolute; top: 28%; left: 25%">

<!-- attr: { hasScriptWrapper:true, class:"slide-section" style:"font-size:40px" } -->
<div style="float:left; width: 45%;">
  # Capturing and Bubbling Event Chains
  ## Live Demo
</div>
<img src="imgs/section-demo-capturing-bubbling.png" style="float:right; border-radius: 15px">

<!-- Custom Events -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-section" id:"custom-events" } -->
# Custom Events
## When built-ins are not enought

<!-- attr: { hasScriptWrapper:true, style:"font-size: 40px" } -->
# Custom Events
- To create custom events use the `CustomEvent()` constructor

    var event = new CustomEvent(eventType);

- Create custom event `tripleclick`

     var event = new CustomEvent("tripleClick");

- Get body element to attach the custom event to and use `addEventListener`

    var body = document.getElementsByTagName("body")[0];
    body.addEventListener("tripleClick", function() {
    	alert("You click three times");
    }, false);

<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions" id:"questions" } -->
# JavaScript Event Model
## Questions
