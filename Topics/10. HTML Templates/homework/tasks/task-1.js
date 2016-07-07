/* globals $ */

function solve() {
  
  return function (selector) {
    var template = '';
    $(selector).html(template);
  };
};

module.exports = solve;