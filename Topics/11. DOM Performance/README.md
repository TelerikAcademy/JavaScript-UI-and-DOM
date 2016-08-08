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
<!-- attr: { class: 'slide-section', hasScriptWrapper: true } -->
# DOM Performance key points

# Creating DOM elements
- Creating DOM elements
  - Use `node.cloneNode(true)` for better performance when creating many similar elements 
    - Only when there is a small difference between the elements
      - i.e. when many links have only different `href` and `innerHTML`

# Adding elements to the DOM
- Using DocumentFragment:
    
```js
var docFragment = document.createDocumentFragment();
// append newly created elements to the docFragment  
container.appendChild(docFragment);
```

- Always append the elements to an element that is not yet in the DOM
  - That way a repaint of the browser is triggered only once
      
```js
var list = document.createElement('ul');

// Do not do this here
// Too much refresh of the DOM 
// container.appendChild(list);

for( i = 0; i < count; i += 1){
  item.innerHTML = 'Item #' + i;
  list.appendChild(node);
}

// Better do it here
// Only a single refresh
container.appendChild(list);
```

# Querying the DOM
- Always cache the queried elements:
  - `getElementsByXXX()` and `querySelector()`
      
```js
var listItems = document.getElementsByClassName('list-item');
//use everywhere listItems
```
        
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
              
  - Same for jQuery
                
# Events
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
            
  - Same for jQuery
