#DOM Performance key points:
  * Creating DOM elements
    * Use `node.cloneNode(true)` for better performance when creating many similar elements 
      * Only when there is a small difference between the elements
        * i.e. when many links have only different `href` and `innerHTML` 
  * Appending elements to the DOM
    * Use DocumentFragment:
      * _Example:_
      
        
              var docFragment = document.createDocumentFragment();
              //append newly created elements to the docFragment          
              container.appendChild(docFragment);
            
            
    * Always append the elements to an element, that is not yet in the DOM
      * _Example:_
        
        
        
              var list = document.createElement('ul');
              
              //Do not do this here
              //  Too much refresh of the DOM 
              //container.appendChild(list);
              
              for( i = 0; i < count; i += 1){
                item.innerHTML = 'Item #' + i;
                list.appendChild(node);
              }
              
              //Better do it here
              //  Only a single refresh
              container.appendChild(list);
          
    * Same for jQuery
          
  * Querying
    * Always cache the queried elements:
      * `getElementsByXXX()` and `querySelector()` 
      * _Example:_
        
        
        
              
              var listItems = document.getElementsByClassName('list-item');
              //use everywhere listItems
          
    * Prefer to query the elements by a common selector:
      * If `list` is already selected
        * prefer
          
          
          
           
           
                var items = list.getElementsByTagName('li');
          
        * before
              
              
                var items = list.querySelectorAll('.list li');
                
                
                
                
    * Same for jQuery
                  
  * Events
    * If many elements inside a common container have the same event:
      * prefer:
        
        
      
              parent.addEventListener('click', function(ev){
                  var target = ev.target;
              });
          
      * before:
          
          
              var items = parent.getElementsByXXX();
          
              for(i = 0, 1, ... items.length-1_{
                items[i].addEventListener(handler);
              }
              
              
    * Same for jQuery