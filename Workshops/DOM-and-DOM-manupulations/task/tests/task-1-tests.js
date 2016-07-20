/*globals describe, it, require, before, global, $, jQuery*/
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

  describe('Existance tests', function () {

    it('expect to has class "items-control", contain an element with class .add-controls, .search-controls and .result-controls', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');

      expect($root.hasClass('items-control')).to.be.true;
      expect($root).to.has.length(1);
      expect($root.find('.add-controls')).to.has.length(1);
      expect($root.find('.search-controls')).to.has.length(1);
      expect($root.find('.result-controls')).to.has.length(1);
    });

    it('expect .add-controls to exist and to contain "Enter text", an input and a .button', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');

      var $addControls = $root.find('.add-controls');
      expect($addControls).to.has.length(1);

      expect($addControls.text()).to.contain('Enter text');
      expect($addControls.find('input')).to.has.length(1);
      expect($addControls.find('.button')).to.has.length(1);
    });

    it('expect .search-controls to exist and to contain "Search:" and an input', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');

      var $searchControls = $root.find('.search-controls');
      expect($searchControls).to.has.length(1);

      expect($searchControls.text().toLowerCase()).to.contain('search:');
      expect($searchControls.find('input')).to.has.length(1);
    });

    it('expect .result-controls to exist and to contain a .items-list', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');

      var $resultControls = $root.find('.result-controls');
      expect($resultControls).to.has.length(1);
      expect($resultControls.find('.items-list')).to.has.length(1);
    });
  });

  describe('Adding and removing', function () {

    it('expect COUNT click on add button to add a COUNT new .list-item with the provided value and a .button with content "X"', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 3,
        values = [],
        value;
      for (var i = 0; i < count; i += 1) {
        value = 'NEW VALUE ' + Math.random();
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
        values.push(value);
      }
      var $listItems = $root.find('.result-controls .items-list .list-item');
      expect($listItems).to.has.length(count);

      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        expect($listItem.text()).to.contain(values[index]);
        var $btnDelete = $listItem.find('.button');
        expect($btnDelete).to.has.length(1);
        expect($btnDelete.html().toLowerCase()).to.equal('x');
      });
    });

    it('expect after COUNT click on add button and then a click on .btn-click to remove the item from the DOM', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 3,
        values = [],
        value;
      for (var i = 0; i < count; i += 1) {
        value = 'NEW VALUE ' + Math.random();
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
        values.push(value);
      }

      var deleteIndex = Math.floor(count / 2);

      var $deleteBtn = $root.find('.result-controls .items-list .list-item').eq(deleteIndex).find('.button');
      expect($deleteBtn).to.has.length(1);

      $deleteBtn.get(0).dispatchEvent(clickEvent);

      var $listItems = $root.find('.result-controls .items-list .list-item');
      expect($listItems).to.has.length(count - 1);

      values.splice(deleteIndex, 1);

      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        expect($listItem.text()).to.contain(values[index]);
        var $btnDelete = $listItem.find('.button');
        expect($btnDelete).to.has.length(1);
        expect($btnDelete.html().toLowerCase()).to.equal('x');
      });
    });
  });

  describe('Search', function () {
    it('expect case-insensitive search of "a" to only display "Test A" and "A Test"', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 10,
        values = ['Test A', 'A Test'],
        value;

      while (values.length < count) {
        value = 'NEW ' + Math.random();
        values.push(value);
      }

      for (var i = 0; i < count; i += 1) {
        value = values[i];
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
      }

      var $searchControls = $root.find('.search-controls');
      var $tbSearch = $searchControls.find('input');
      expect($tbSearch).to.has.length(1);

      var $listItems = $root.find('.result-controls .items-list .list-item');
      var pattern = 'a';

      $tbSearch.val(pattern);

      var inputEvent = document.createEvent('MouseEvents');
      inputEvent.initUIEvent('input', true, true);

      var changeEvent = document.createEvent('MouseEvents');
      changeEvent.initUIEvent('change', true, true);

      $tbSearch.get(0).dispatchEvent(inputEvent);
      $tbSearch.get(0).dispatchEvent(changeEvent);

      var expectedLength = values.filter(function (val) {
        return val.toLocaleLowerCase().indexOf(pattern.toLowerCase()) >= 0;
      }).length;
      var actualLength = 0;
      
      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        var innerHTML = $listItem.text().toLowerCase();
        var indexOf = innerHTML.indexOf(pattern);
        var isFound = indexOf >= 0;
        if (isFound) {
          actualLength += 1;
          expect($listItem.css('display')).not.to.equal('none');
        } else {
          expect($listItem.css('display')).to.equal('none');
        }
      });      
      expect(actualLength).to.equal(expectedLength);      
    });

    it('expect case-insensitive search of "a test" to only display "A Test"', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root');
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 10,
        values = ['Test A', 'A Test'],
        value;

      while (values.length < count) {
        value = 'NEW ' + Math.random();
        values.push(value);
      }

      for (var i = 0; i < count; i += 1) {
        value = values[i];
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
      }

      var $searchControls = $root.find('.search-controls');
      var $tbSearch = $searchControls.find('input');
      expect($tbSearch).to.has.length(1);

      var $listItems = $root.find('.result-controls .items-list .list-item');
      var pattern = 'a test';

      $tbSearch.val(pattern);

      var inputEvent = document.createEvent('MouseEvents');
      inputEvent.initUIEvent('input', true, true);

      var changeEvent = document.createEvent('MouseEvents');
      changeEvent.initUIEvent('change', true, true);

      $tbSearch.get(0).dispatchEvent(inputEvent);
      $tbSearch.get(0).dispatchEvent(changeEvent);

      var expectedLength = values.filter(function (val) {
        return val.toLocaleLowerCase().indexOf(pattern.toLowerCase()) >= 0;
      }).length;
      var actualLength = 0;

      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        var innerHTML = $listItem.text().toLowerCase();
        var indexOf = innerHTML.indexOf(pattern);
        var isFound = indexOf >= 0;
        if (isFound) {
          actualLength += 1;
          expect($listItem.css('display')).not.to.equal('none');
        } else {
          expect($listItem.css('display')).to.equal('none');
        }
      });
      expect(actualLength).to.equal(expectedLength);      
    });
    
    
    // Case sensitive
      it('expect case-sensitive search of "a" to only display "Test a"', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root', true);
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 10,
        values = ['Test A', 'A Test'],
        value;

      while (values.length < count) {
        value = 'NEW ' + Math.random();
        values.push(value);
      }

      for (var i = 0; i < count; i += 1) {
        value = values[i];
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
      }

      var $searchControls = $root.find('.search-controls');
      var $tbSearch = $searchControls.find('input');
      expect($tbSearch).to.has.length(1);

      var $listItems = $root.find('.result-controls .items-list .list-item');
      var pattern = 'a';

      $tbSearch.val(pattern);

      var inputEvent = document.createEvent('MouseEvents');
      inputEvent.initUIEvent('input', true, true);

      var changeEvent = document.createEvent('MouseEvents');
      changeEvent.initUIEvent('change', true, true);

      $tbSearch.get(0).dispatchEvent(inputEvent);
      $tbSearch.get(0).dispatchEvent(changeEvent);

      var expectedLength = values.filter(function (val) {
        return val.indexOf(pattern) >= 0;
      }).length;
      var actualLength = 0;
      
      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        var innerHTML = $listItem.text();
        var indexOf = innerHTML.indexOf(pattern);
        var isFound = indexOf >= 0;
        if (isFound) {
          actualLength += 1;
          expect($listItem.css('display')).not.to.equal('none');
        } else {
          expect($listItem.css('display')).to.equal('none');
        }
      });      
      expect(actualLength).to.equal(expectedLength);      
    });

    it('expect case-sensitive search to hide everything', function () {
      document.body.innerHTML = '<div id="root"></div>';
      var thisIsJQuery = $;
      $ = jQuery = undefined;
      result('#root', true);
      $ = jQuery = thisIsJQuery;
      var $root = $('#root');
      var $addControls = $root.find('.add-controls');
      var $tbAdd = $addControls.find('input');
      var $btnAdd = $addControls.find('.button');
      var clickEvent = document.createEvent('MouseEvents');

      clickEvent.initMouseEvent('click', true, true);
      var count = 10,
        values = ['Test A', 'A Test'],
        value;

      while (values.length < count) {
        value = 'NEW ' + Math.random();
        values.push(value);
      }

      for (var i = 0; i < count; i += 1) {
        value = values[i];
        $tbAdd.val(value);
        $btnAdd.get(0).dispatchEvent(clickEvent);
      }

      var $searchControls = $root.find('.search-controls');
      var $tbSearch = $searchControls.find('input');
      expect($tbSearch).to.has.length(1);

      var $listItems = $root.find('.result-controls .items-list .list-item');
      var pattern = 'a';

      $tbSearch.val(pattern);

      var inputEvent = document.createEvent('MouseEvents');
      inputEvent.initUIEvent('input', true, true);

      var changeEvent = document.createEvent('MouseEvents');
      changeEvent.initUIEvent('change', true, true);

      $tbSearch.get(0).dispatchEvent(inputEvent);
      $tbSearch.get(0).dispatchEvent(changeEvent);

      var expectedLength = values.filter(function (val) {
        return val.indexOf(pattern) >= 0;
      }).length;
      var actualLength = 0;

      $listItems.each(function (index, listItem) {
        var $listItem = $(listItem);
        var innerHTML = $listItem.text();
        var indexOf = innerHTML.indexOf(pattern);        
        var isFound = indexOf >= 0;
        if (isFound) {
          actualLength += 1;
          expect($listItem.css('display')).not.to.equal('none');
        } else {          
          expect($listItem.css('display')).to.equal('none');
        }
      });
      
      expect(actualLength).to.equal(expectedLength);      
    });
  });
});