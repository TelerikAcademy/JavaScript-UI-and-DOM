/* globals global, require, describe, before, beforeEach, it */
var solve = require('../tasks/task-1');
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jqInit = require('jquery');


describe('PureJS Sample tests', function () {
  var htmlTemplate = '<div id="root"></div>';

  before(function (done) {
    jsdom.env({
      html: '<div',
      done: function (errors, window) {
        global.window = window;
        global.document = window.document;
        global.$ = jqInit(window);
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

  describe('Valid tests', function () {
    it('Expect to contain 5 divs, when a valid id and array of 5 contents are provided', function () {
      var count = 5,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          return 'Content #' + index;
        }),
        containerId = 'root',
        result = solve();
      document.body.innerHTML = `<div id="${containerId}"></div>`;
      result(containerId, contents);
      var divs = [].slice.call(document.querySelectorAll('#' + containerId + ' div'), 0);
      expect(divs).to.have.length(contents.length);
      divs.forEach(function (div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });

    it('Expect to contain zero divs, when a valid id and an empty array are provided', function () {
      var contents = [],
        containerId = 'root',
        result = solve();
      document.body.innerHTML = `<div id="${containerId}"></div>`;
      result(containerId, contents);
      var divs = [].slice.call(document.querySelectorAll('#' + containerId + ' div'), 0);
      expect(divs).to.have.length(contents.length);
    });
    
    
    it('Expect to contain 5 divs, when a valid element and array of 5 contents are provided', function () {
      var count = 5,
        contents = Array.apply(null, { length: count })
          .map(function (_, index) {
          return 'Content #' + index;
        }),
        containerId = 'root',
        result = solve();
      document.body.innerHTML = `<div id="${containerId}"></div>`;
      result(containerId, contents);
      var divs = [].slice.call(document.querySelectorAll('#' + containerId + ' div'), 0);
      expect(divs).to.have.length(contents.length);
      divs.forEach(function (div) {
        expect(contents).to.contain(div.innerHTML);
      });
    });


    it('Expect to contain zero divs, when a valid element and an empty array are provided', function () {
      var contents = [],
        containerId = 'root',       
        result = solve(),
        container;
      document.body.innerHTML = `<div id="${containerId}"></div>`;
      container = document.getElementById(containerId);
      result(containerId, contents);
      var divs = [].slice.call(document.querySelectorAll('#' + containerId + ' div'), 0);
      expect(divs).to.have.length(contents.length);
    });
  });
});
