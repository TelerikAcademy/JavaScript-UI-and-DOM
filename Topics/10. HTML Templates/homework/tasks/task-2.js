/* globals $ */

function solve() {
  
  return function (selector) {
    var template = ''; /* insert the template here as a string
        example:
        var template =
          '<ul>' +
            '{{#students}}' +
            '<li>' +
              '{{name}}' +
            '</li>' +
            '{{/students}}' +
          '</ul>';
    */

    $(selector).html(template);
  };
};

module.exports = solve;