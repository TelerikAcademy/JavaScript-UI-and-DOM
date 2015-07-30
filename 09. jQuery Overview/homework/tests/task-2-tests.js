/*globals describe, it, require, before, global*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-2')();

describe('Task #2 Tests', function () {

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

  describe('Valid Tests', function () {
    it('expect nothing to change, whenm no elements with class `button` or `content`', function () {
      var html = '<div id="root"><div></div><ul><li><a href="#">link</a></li></ul></div>';
      document.body.innerHTML = html;
      result('#root');
      expect(document.body.innerHTML).to.equal(html);
    });

    it('expect to change the content of all `.button` to "hide"', function () {
      var container = document.createElement('div'),
        count = 15,
        possibleTags = ['a', 'button', 'p', 'div'],
        i,
        len,
        buttonNode,
        contentNode,
        tag;

      container.id = 'root';
      for (i = 0; i < count; i += 1) {
        tag = possibleTags[(Math.random() * possibleTags.length) | 0];
        buttonNode = document.createElement(tag);
        buttonNode.className = 'button';
        container.appendChild(buttonNode);

        possibleTags[(Math.random() * possibleTags.length) | 0];
        contentNode = document.createElement(tag);
        contentNode.className = 'content';
        container.appendChild(contentNode);
      }
      document.body.innerHTML = container.outerHTML;

      result('#root');
      var btns = document.getElementsByClassName('button');
      expect(btns).to.have.length(count);
      for (i = 0, len = btns.length; i < len; i += 1) {
        expect(btns[i].innerHTML).to.equal('hide');
      }
    });

    it('expect to hide the next content on button click, and then show it again, when there are other elements', function () {
      function createDummyNode() {
        var tags = ['a', 'button', 'p', 'div', 'ul', 'li', 'ol', 'input', 'table', 'tr', 'br', 'hr', 'span'];
        var node = document.createElement(tags[(Math.random * tags.length) | 0]);
        node.innerHTML = 'Dummy Element: ' + Math.random();
        return node;
      }
      var container = document.createElement('div'),
        count = 150,
        possibleTags = ['a', 'button', 'p', 'div'],
        i,
        buttonNode,
        contentNode,
        tag;

      container.id = 'root';
      var dymmyObjectChance = 70;
      for (i = 0; i < count; i += 1) {
        if (Math.random() * 100 < dymmyObjectChance) {
          container.appendChild(createDummyNode());
        }
        tag = possibleTags[(Math.random() * possibleTags.length) | 0];
        buttonNode = document.createElement(tag);
        buttonNode.className = 'button';
        if (i === ((count / 2) | 0)) {
          buttonNode.id = 'the-button';
        }
        container.appendChild(buttonNode);

        possibleTags[(Math.random() * possibleTags.length) | 0];
        contentNode = document.createElement(tag);
        contentNode.className = 'content';

        if (Math.random() * 100 < dymmyObjectChance) {
          container.appendChild(createDummyNode());
        }
        container.appendChild(contentNode);

        if (Math.random() * 100 < dymmyObjectChance) {
          container.appendChild(createDummyNode());
        }
      }
      document.body.innerHTML = container.outerHTML;

      result('#root');

      var theButton = document.getElementById('the-button');

      var theContent = theButton.nextElementSibling;
      while (theContent && theContent.className.indexOf('content') < 0) {
        theContent = theContent.nextElementSibling;
      }

      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true);
      theButton.dispatchEvent(event);

      expect(theButton).to.exist;
      expect(theContent).to.exist;
      expect(theButton.innerHTML).to.equal('show');
      expect(theContent.style.display).to.equal('none');

      theButton.dispatchEvent(event);
      expect(theButton.innerHTML).to.equal('hide');
      expect(theContent.style.display).to.equal('');
    });

    it('expect to hide the next content on button click, and then show it again', function () {
      var container = document.createElement('div'),
        count = 15,
        possibleTags = ['a', 'button', 'p', 'div'],
        i,
        buttonNode,
        contentNode,
        tag;

      container.id = 'root';
      for (i = 0; i < count; i += 1) {
        tag = possibleTags[(Math.random() * possibleTags.length) | 0];
        buttonNode = document.createElement(tag);
        buttonNode.className = 'button';
        if (i === ((count / 2) | 0)) {
          buttonNode.id = 'the-button';
        }
        container.appendChild(buttonNode);

        possibleTags[(Math.random() * possibleTags.length) | 0];
        contentNode = document.createElement(tag);
        contentNode.className = 'content';
        container.appendChild(contentNode);
      }
      document.body.innerHTML = container.outerHTML;

      result('#root');

      var theButton = document.getElementById('the-button');

      var theContent = theButton.nextElementSibling;
      while (theContent && theContent.className.indexOf('content') < 0) {
        theContent = theContent.nextElementSibling;
      }

      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true);
      theButton.dispatchEvent(event);

      expect(theButton).to.exist;
      expect(theContent).to.exist;
      expect(theButton.innerHTML).to.equal('show');
      expect(theContent.style.display).to.equal('none');

      theButton.dispatchEvent(event);
      expect(theButton.innerHTML).to.equal('hide');
      expect(theContent.style.display).to.equal('');
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
    it('Expect to throw, when undefined is provided as selector', function () {
      function test() {
        result(undefined);
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when null is provided as selector', function () {
      function test() {
        result(null);
      }
      expect(test).to.throw();
    });

    it('Expect to throw, when selector that selects nothing is provided', function () {
      function test() {
        result('TEST_NO_SUCH_SELECTOR');
      }
      expect(test).to.throw();
    });
  });

});
