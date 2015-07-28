/*globals describe, it, require, before, global, $*/
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


  it('expect to generate 1 element with class "dropdown-list", put the select inside it and hide it', function () {
    var id = 'the-select';
    document.body.innerHTML = '<select id="' + id + '" data-test="test"></select>';
    result('#' + id);
    var $dropdownList = $('.dropdown-list');
    expect($dropdownList).to.have.length(1);
    var $select = $dropdownList.find('#' + id);
    expect($select).to.have.length(1);

    expect($select.attr('data-test')).to.equal('test');
    expect($select.css('display')).to.equal('none');
  });

  it('expect to generate 1 element with class "dropdown-list" that contains the select, and 5 divs with class "dropdown-item"', function () {
    var id = 'the-select',
      select = document.createElement('select'),
      count = 5;
    select.id = id;

    for (var i = 0; i < count; i += 1) {
      var option = document.createElement('option');
      option.innerHTML = 'Option #' + (i + 1);
      option.value = (i + 1) + '';
      select.appendChild(option);
    }
    document.body.innerHTML = select.outerHTML;
    result('#' + id);
    var $dropdown = $('.dropdown-list');
    var $options = $dropdown.find('.dropdown-item');
    expect($options).to.have.length(count);
  });

  it('expect the options to be intially hidden', function () {
    var id = 'the-select',
      select = document.createElement('select'),
      count = 5;
    select.id = id;

    for (var i = 0; i < count; i += 1) {
      var option = document.createElement('option');
      option.innerHTML = 'Option #' + (i + 1);
      option.value = (i + 1) + '';
      select.appendChild(option);
    }
    document.body.innerHTML = select.outerHTML;


    result('#' + id);


    var $dropdown = $('.dropdown-list');
    var $options = $dropdown.find('.dropdown-item');

    $options.each(function (index, option) {
      var $option = $(option);
      var $node = $option;
      while (!($node.hasClass('dropdown-list')) && $node.css('display') !== 'none') {
        $node = $node.parent();
      }

      expect($node.hasClass('dropdown-list')).not.to.be.true;
    });
  });

  it('expect the options to be visible, when the .current is clicked', function () {
    var id = 'the-select',
      select = document.createElement('select'),
      count = 5;
    select.id = id;

    for (var i = 0; i < count; i += 1) {
      var option = document.createElement('option');
      option.innerHTML = 'Option #' + (i + 1);
      option.value = (i + 1) + '';
      select.appendChild(option);
    }
    document.body.innerHTML = select.outerHTML;

    result('#' + id);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true);

    var $dropdown = $('.dropdown-list');

    var $current = $dropdown.find('.current');
    $current.get(0).dispatchEvent(clickEvent);

    var $options = $dropdown.find('.dropdown-item');

    $options.each(function (index, option) {
      var $option = $(option);
      var $node = $option;
      while (!($node.hasClass('dropdown-list'))) {
        expect($node.css('display')).not.to.equal('none');
        $node = $node.parent();
      }
    });
  });

  it('expect the select to have the selected value and the dropdown to be hidden, when .current is clicked, and then an option is clicked', function () {
    var id = 'the-select',
      select = document.createElement('select'),
      count = 5;
    select.id = id;

    for (var i = 0; i < count; i += 1) {
      var option = document.createElement('option');
      option.innerHTML = 'Option #' + (i + 1);
      option.value = (i + 1) + '';
      select.appendChild(option);
    }

    document.body.innerHTML = select.outerHTML;

    result('#' + id);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true);

    var $dropdown = $('.dropdown-list');

    var $current = $dropdown.find('.current');
    $current.get(0).dispatchEvent(clickEvent);

    var clickedOption = $dropdown.find('.dropdown-item').get(Math.floor(count / 2));
    clickedOption.dispatchEvent(clickEvent);

    expect($('#' + id).val()).to.equal(clickedOption.getAttribute('data-value'));

    var $options = $dropdown.find('.dropdown-item');

    $options.each(function (index, option) {
      var $option = $(option);
      var $node = $option;
      while (!($node.hasClass('dropdown-list')) && $node.css('display') !== 'none') {
        $node = $node.parent();
      }

      expect($node.hasClass('dropdown-list')).not.to.be.true;
    });

  });
});