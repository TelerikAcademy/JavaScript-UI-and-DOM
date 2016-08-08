<!-- section start -->
<!-- attr: { hasScriptWrapper:true, id:"title", class:"slide-title" } -->
# DOM Performance
## How to write fast client-side JavaScript

<aside class="signature">
    <p class="signature-course">JavaScript DOM & UI</p>
    <p class="signature-initiative">Telerik Software Academy</p>
    <a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</aside>

<!-- section start -->
<!-- attr: { hasScriptWrapper: true } -->
# Table of Contents
- [Creating DOM elements](#creating-elements)
- [Adding elements to the DOM](#adding-elements)
- [Querying the DOM](#querying)


<!-- section start -->
<!-- attr: { class: 'slide-section' } -->
# Creating DOM elements
## Using cloning for similar elements

<!-- attr: { style: 'font-size: 0.85em' } -->
# Creating DOM elements
## Using cloning for similar elements
- Use `node.cloneNode(true)` (**native**) or `$element.clone()` (**jQuery**) for better performance when creating many similar elements 
- Only when there is a small difference between the elements
  - i.e. when many links have only different `href` and `innerHTML`
- [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode) about `node.cloneNode()`
- [Read more](https://api.jquery.com/clone/) about `$element.clone()`

<!-- section start -->
<!-- attr: { class: 'slide-section', hasScriptWrapper: 'true' } -->
# Adding elements to the DOM
## Avoiding common pitfalls

# Adding elements to the DOM
- Do not directly append a lot of elements to the DOM, this will trigger a lot of browser refreshes
- Any change to the DOM will trigger a browser refresh(redraw)
  - Addition and removal of DOM elements
  - Change of attributes
  - Change of styles


# Adding elements to the DOM
- The following will trigger `1000` browser refreshes:

```js
var list = document.getElementById('list'),
    count = 1000;

for(var i = 0; i < count; i += 1) {
    var li = document.createElement('li');
    li.innerHTML = 'Item #' + i;
    // each appending will trigger a redraw
    list.appendChild(li);
}
```

<!-- attr: { style: 'font-size: 0.9em' } -->
# Adding elements to the DOM
## Document fragments
- Use `DocumentFragment` to minimize refreshes when adding elements to the DOM
  - The following code will trigger a single browser refresh:
    
```js
var docFragment = document.createDocumentFragment(),  
    count = 1000;
// append newly created elements to the docFragment
for(var i = 0; i < count; i += 1) {
    docFragment.appendChild(document.createElement('div'));
}
// when done, append the fragment to the dom 
container.appendChild(docFragment);
```

# Adding elements to the DOM
## Appending to containers
- _Example_ with jQuery:

```js
var $list = $('<ul />');
// Do not append the list to the DOM here
// this will trigger many browser redraws
for(var i = 0; i < count; i += 1){
    $('<li />').text('Item #' + i).appendTo(list);
}

// Append to DOM here - triggers a single refresh
$list.appendTo(container);
```

<!-- section start -->
<!-- attr: { class: 'slide-section' } -->
# Querying the DOM
## Caching and efficient selectors

<!-- attr: { style: 'font-size: 0.8em' } -->
# Querying the DOM
## Caching query results
- If you use the same queried elements repeatedly, cache them in a variable or property
- Suppose there are **panels** on a web page and a **button which hides them** when clicked
- _Example_ **without caching**:

```js
var hidePanelsBtn = document.getElementsById('#hide-panels-btn');

hidePanelsBtn.addEventListener('click', function () {
    // this query is repeated every for each button press
    var panels = document.getElementsByClassName('.panel');

    for(var i = 0, len = panels.length; i < len; i += 1) {
        panels[i].classList.add('panel-hidden');
    }
});
```

<!-- attr: { style: 'font-size: 0.8em' } -->
# Querying the DOM
## Caching query results
- _Example_ **with caching**:
  - Better performance - the DOM doesn't get queried on each button click

```js
// panels are cached as array here
var panels = [].slice.call(
                  document.getElementsByClassName('.panel')),
    hidePanelsBtn = document.getElementsById('#hide-panels-btn');

hidePanelsBtn.addEventListener('click', function () {
    // the panels are accessed from the variable above
    // no DOM query is executed here
    for(var i = 0, len = panels.length; i < len; i += 1) {
        panels[i].classList.add('panel-hidden');
    }
});
```

<!-- attr: { style: 'font-size: 0.9em' } -->
# Querying the DOM
## Efficient selectors
- CSS selectors are interpreted from right to left
  - The following code will first select all `li` elements and then leave only those who have a parent with
 `names-list` id

```js
// potentially very slow
var nameItems = document.querySelectorAll('#names-list li');
```

# Querying the DOM
## Efficient selectors
- Refactor and improve the previous sample's performance
  - The following code will search by id - a very fast operation, and then simply get all children of the result

```js
var namesList = document.querySelector('#names-list'),
    nameItems = namesList.children();
```

# Querying the DOM
## Efficient selectors
- Try to explain the performance of the following statemenets(assume they return the same result):

```js
$('#some-id .some-class .another-class');

$('#some-id .some-class li.another-class');

$('#some-id').find('.another-class');
```


# Querying the DOM
## Efficient selectors

- Explanation

```js
// potentially slow
$('#some-id .some-class .another-class');

// faster then the above
// more specific rightmost selector
$('#some-id .some-class li.another-class');

// fastest
$('#some-id').find('.another-class');
```

# Querying the DOM
## Efficient selectors
- Prefer to query the elements by a common selector:
  - If `list` is already selected
    - prefer
        
```js
var items = list.getElementsByTagName('li');
```
        
    - before
            
```js
var items = list.querySelectorAll('.list li');
```
<!-- section start -->
<!-- attr: { class: 'slide-section' } -->
# Events
## Delegation, one-time events

# Events
## Delegation
- If many elements inside a common container have the same event:
  - prefer:
      
```js
parent.addEventListener('click', function(ev){
    var target = ev.target;
});
```
        
  - before:
        
```js
var items = parent.getElementsByXXX();
for(i = 0, 1, ... items.length-1_{
  items[i].addEventListener(handler);
}
```