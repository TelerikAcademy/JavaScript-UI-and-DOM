/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:   
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, [] 
*/

function solve() {
  return function (selector, count) {
    count = +count;
    if(isNaN(count) || count <=0){
      throw new Error('COUNT must be a positive number or convertible to number');
    }
    if(typeof selector  !== 'string' && !(selector instanceof jQuery)){
      throw new Error('Selector must be either jQuery object or a string');
    }
        
    var $list = $('<ul/>').addClass('items-list'),
      i;
    for (i = 0; i < count; i += 1) {
      $('<li />')
        .addClass('list-item')
        .html('List item #' + i)
        .appendTo($list);
    }
    $(selector).append($list);
  };
};

module.exports = solve;