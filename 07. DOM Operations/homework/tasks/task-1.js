/* Task Description */
/* 
*   Create a function that replaces the content of an DOM element with divs with the provided contents
    *   Throws if:
        *   Any of the contents is not a string or a number
            *   Should not add any of the contents
        *   Any of the params is undefined or null
        *   The first parameter is neither string or HTMLElement
        *   The first parameter is an id (string) but there is not such element in the DOM
        *   The second parameter is not an array or an array-like object
*/

function solve() {
  var divTemplate = document.createElement('div');

  function clear(element){
    while (element.firstChild){
      element.removeChild(element.firstChild);
    }
  }

  return function(container, contents){
    if(typeof container === 'string'){
      container = document.getElementById(container);
    }
    if(!(container instanceof HTMLElement)){
      throw new Error('The function MUST take either an HTMLElement or id for existing element');
    }
    var fragment = document.createDocumentFragment();
    clear(container);
    contents.forEach(function(content){
      if(typeof content !== 'string' &&
          typeof content !== 'number'){
        throw new Error('Content MUST be a string or a number');
      }
      divTemplate.innerHTML = content;
      fragment.appendChild(divTemplate.cloneNode(true));
    });
    container.appendChild(fragment);
  };
}

module.exports = solve;
