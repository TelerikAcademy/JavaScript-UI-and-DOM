/*globals describe, it, require, before, beforeEach, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-1')();

describe('Task #1 Tests', function () {

  before(function (done) {
    jsdom.env({
      html: '',
      done: function (errors, window) {
        global.window = window;
        global.document = window.document;
        global.$ = jq(window);
        Object.keys(window)
          .filter(function (prop) {
          return prop.toLowerCase().indexOf('html') >= 0;
        }).forEach(function (prop) {
          global[prop] = window[prop];
        });
        done();
      }
    });
  });

  beforeEach(function () {
    document.body.innerHTML = '<div id="root"><h1>Tests</h1></div>';
  });

  describe('Valid', function () {
    it('Expect to add 15 divs, valid selector is provided, contents are all strings', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          return 'Content #' + index;
        }),
        selector = 'root';

      result(selector, contents);

      var $divs = $('#' + selector + ' *');
      expect($divs).to.have.length(count);

      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect to add 15 divs, valid selector is provided, contents are all numbers', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(Function.call, Math.random),
        selector = 'root';

      result(selector, contents);

      var $divs = $('#' + selector + ' *');
      expect($divs).to.have.length(count);

      contents = contents.map(String);
      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect to add 15 divs, valid selector is provided, contents are numbers and strings', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          if (index % 3) {
            return 'Content #' + index;
          }
          return index;
        }),
        selector = 'root';

      result(selector, contents);

      var $divs = $('#' + selector + ' *');
      expect($divs).to.have.length(count);

      contents = contents.map(String);
      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });


    it('Expect to add 15 divs, valid DOM element is provided, contents are all strings', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          return 'Content #' + index;
        }),
        selector = 'root',
        root = document.getElementById(selector);

      result(root, contents);

      var $divs = $(root).find('*');
      expect($divs).to.have.length(count);

      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect to add 15 divs, valid DOM element is provided, contents are all numbers', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(Function.call, Math.random),
        selector = 'root',
        root = document.getElementById(selector);

      result(root, contents);

      var $divs = $(root).find('*');
      expect($divs).to.have.length(count);

      contents = contents.map(String);
      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect to add 15 divs, valid DOM element is provided, contents are numbers and strings', function () {
      var count = 15,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          if (index % 3) {
            return 'Content #' + index;
          }
          return index;
        }),
        selector = 'root',
        root = document.getElementById(selector);

      result(root, contents);

      var $divs = $(root).find('*');
      expect($divs).to.have.length(count);

      contents = contents.map(String);
      $divs.each(function (index, div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect #root to contain nothing, valid DOM element is provided, contents is an empty array', function () {
      var count = 0,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          if (index % 3) {
            return 'Content #' + index;
          }
          return index;
        }),
        selector = 'root',
        root = document.getElementById(selector);

      result(root, contents);
      expect($(root).html()).to.equal('');
    });
  });


  describe('Invalid', function () {
    it('Expect to throw, when no params are provided', function () {
      function test() {
        result();
      }
      expect(test).to.throw();
    });    
    
    /* Selector validation */
    it('Expect to throw, when undefined is provided as selector and contents is valid', function () {
      function test() {
        result(undefined, []);
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when null is provided as selector and contents is valid', function () {
      function test() {
        result(null, []);
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when selector that selects nothing is provided and contents is valid', function () {
      function test() {
        result('TEST_NO_SUCH_SELECTOR', []);
      }
      expect(test).to.throw();
    });
    
    /* Contents validation */
    it('Expect to throw, when no contents is, selector is valid', function () {
      function test() {
        result('root');
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when undefined is provided as contents, selector is valid', function () {
      function test() {
        result('root', undefined);
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when null is provided as contents, selector is valid', function () {
      function test() {
        result('root', null);
      }
      expect(test).to.throw();
    });

    it('Expect to throw and not to change the #root, when contents contains not a number or string at first position, selector is valid', function () {
      var contents = [[], 1, 'String'],
        selector = 'root',
        root = document.getElementById(selector),
        rootContent = '<h1>THis should remain</h1>';
      root.innerHTML = rootContent; 
      function test() {
        result(selector, contents);
      }
      expect(test).to.throw();
      expect(root.innerHTML).to.equal(rootContent);
    });
    
    it('Expect to throw and not to change the #root, when contents contains not a number or string at last position, selector is valid', function () {
      var contents = [1, 'String', {}],
        selector = 'root',
        root = document.getElementById(selector),
        rootContent = '<h1>THis should remain</h1>';

      root.innerHTML = rootContent; 
      function test() {
        result(selector, contents);        
      }
      expect(test).to.throw();
      expect(root.innerHTML).to.equal(rootContent);
    });
    
    it('Expect to throw and not to change the #root, when contents contains not a number or string in the middle, selector is valid', function () {
      var contents = [1, 'String', {}, 'THIS', 'JS OOP'],
        selector = 'root',
        root = document.getElementById(selector),
        rootContent = '<h1>THis should remain</h1>';

      root.innerHTML = rootContent; 
      function test() {
        result(selector, contents);
      }
      expect(test).to.throw();
      expect(root.innerHTML).to.equal(rootContent);
    });
  });

});