/*globals describe, it, require, before, global, $, jQuery*/

var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-1')();

describe('Task #1 Zero Tests', function () {

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
  it('expect .add-controls, .search-controls and .result-controls to exist', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var $HaHa_No_jQuery = $;
    $ = jQuery = undefined;
    result('#root');
    $ = jQuery = $HaHa_No_jQuery;
    var $root = $('#root');

    var $addControls = $root.find('.add-controls');
    var $searchControls = $root.find('.search-controls');
    var $resultControls = $root.find('.result-controls');

    expect($addControls).to.has.length(1);
    expect($searchControls).to.has.length(1);
    expect($resultControls).to.has.length(1);
  });

  it('expect .add-controls to contain label, input and a .button', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var $HaHa_No_jQuery = $;
    $ = jQuery = undefined;
    result('#root');
    $ = jQuery = $HaHa_No_jQuery;
    var $root = $('#root');

    var $addControls = $root.find('.add-controls');

    expect($addControls).to.has.length(1);
    expect($addControls.find('label')).to.has.length(1);
    expect($addControls.find('input')).to.has.length(1);
    expect($addControls.find('.button')).to.has.length(1);
  });

  it('expect .search-controls to contain label and input', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var $HaHa_No_jQuery = $;
    $ = jQuery = undefined;
    result('#root');
    $ = jQuery = $HaHa_No_jQuery;
    var $root = $('#root');

    var $searchControls = $root.find('.search-controls');

    expect($searchControls).to.has.length(1);
    expect($searchControls.find('label')).to.has.length(1);
    expect($searchControls.find('input')).to.has.length(1);
  });

  it('expect .result-controls to contain an .items-list', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var $HaHa_No_jQuery = $;
    $ = jQuery = undefined;
    result('#root');
    $ = jQuery = $HaHa_No_jQuery;
    var $root = $('#root');

    var $resultControls = $root.find('.result-controls');

    expect($resultControls).to.has.length(1);
    expect($resultControls.find('.items-list')).to.has.length(1);
  });
});