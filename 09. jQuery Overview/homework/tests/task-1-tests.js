/*globals describe, it, require, before, global*/
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

  it('expect to append a list with 5 LIs, when selector is valid and COUNT is 5', function () {
    var count = 5;
    document.body.innerHTML = '<div id="root"></div>';
    result('#root', count);

    var $list = $('#root .items-list');
    expect($list).to.exist;
    expect($list).to.have.length(1);
    var $items = $list.find('*');
    expect($items).to.have.length(count);

    $items.each(function (index, item) {
      var $item = $(item);
      expect($item.is('li')).to.be.true;
      expect($item.hasClass('list-item')).to.be.true;
      expect($item.html()).to.equal('List item #' + index);
    });
  });
  
  /* number-convertible */

  it('expect to work, when selector selects nothing', function () {
    var html = '<div id="root"></div>';
    document.body.innerHTML = html;
    result('#THIS_IS_SPARTA', 5);
    expect(document.body.innerHTML).to.equal(html);
  });

  describe('expect to throw', function () {
    it('when COUNT is equal to 0', function () {
      function test() {
        result('#root', 0);
      }
      expect(test).to.throw();
    });

    it('when COUNT is less than 0', function () {
      function test() {
        result('#root', -1);
      }
      expect(test).to.throw();
    });

    it('when COUNT is an object', function () {
      function test() {
        result('#root', {});
      }
      expect(test).to.throw();
    });

    it('when COUNT is an array', function () {
      function test() {
        result('#root', []);
      }
      expect(test).to.throw();
    });

    it('when COUNT is an empty string', function () {
      function test() {
        result('#root', '');
      }
      expect(test).to.throw();
    });

    it('when COUNT is not-a-number string', function () {
      function test() {
        result('#root', '123px');
      }
      expect(test).to.throw();
    });

    it('when COUNT is undefined', function () {
      function test() {
        result('#root');
      }
      expect(test).to.throw();
    });
    describe('selector is not a string', function () {

      it('when selector is null', function () {
        function test() {
          result(null, 1);
        }
        expect(test).to.throw();
      });

      it('when selector is undefined', function () {
        function test() {
          result(undefined, 1);
        }
        expect(test).to.throw();
      });

      it('when selector is a number', function () {
        function test() {
          result(3, 1);
        }
        expect(test).to.throw();
      });

      it('when selector is an object', function () {
        function test() {
          result({}, 1);
        }
        expect(test).to.throw();
      });

      it('when selector is an array', function () {
        function test() {
          result([], 1);
        }
        expect(test).to.throw();
      });
    });
  });
});