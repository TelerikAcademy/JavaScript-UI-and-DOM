/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-3')();
var handlebars = require('handlebars');

describe('Task #3 Tests', function () {
  before(function (done) {
    jsdom.env({
      html: '',
      done: function (errors, window) {
        global.window = window;
        global.document = window.document;
        global.$ = jq(window);
        global.handlebars = handlebars;
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

  it('Expect to work with the sample', function () {
    var data = [],
      count = 5,
      id = 'students-table';

    document.body.innerHTML = '<table><thead><tr><th>#</th><th>Name</th><th>Mark</th></tr></thead>' +
    '<tbody id="' + id + '" data-template="students-row-template"></tbody></table>' +
    '<script id="students-row-template" type="text/handlebars-template"><tr class="student-row"><td>{{number}}</td><td>{{name}}</td><td>{{mark}}</td></tr></script>';
    result();

    for (var i = 0; i < count; i += 1) {
      var number = i + 1;
      var name = `Student ${i + 1}`;
      var mark = i % 5 + 2;
      data.push({ number, name, mark });
    }
    $('#' + id).listview(data);

    var $listview = $('#' + id);

    var $rows = $listview.find('tr');
    expect($rows).to.have.length(count);

    $rows.each(function (index, row) {
      var $row = $(row);
      var $cells = $row.find('td');
      expect($cells).to.have.length(Object.keys(data[index]).length);

      $cells.each(function (i, cell) {
        var isFound = Object.keys(data[index])
          .some(function (key) {
          return data[index][key].toString() === cell.innerHTML
        });

        expect(isFound).to.be.true;
      });
    });
  });

  it('Expect to work with UL and simple template', function () {
    var data = [],
      count = 5,
      id = 'list-view';

    document.body.innerHTML = '<ul id="' + id + '" data-template="item-template"></ul>' +
    '<script id="item-template" type="text/handlebars-template"><li>{{this}}</li></script>';
    result();
    var count = 5,
      data = Array.apply(null, { length: count })
        .map(Number.call, Number)


    $('#' + id).listview(data);

    var $listview = $('#' + id);

    var $items = $listview.find('li');
    expect($items).to.have.length(count);

    $items.each(function (index, item) {
      expect(item.innerHTML).to.equal(data[index].toString());
    });
  });

  it('Expect to work with nested template with expressions ({{each ...}})', function () {
    var data = [],
      count = 5,
      id = 'list-view';

    document.body.innerHTML = '<div id="' + id + '" data-template="item-template"></div>' +
    '<script id="item-template" type="text/handlebars-template"><div class="outer"><h1>{{title}}</h1>{{#each numbers}}<div class="number-item">{{this}}</div>{{/each}}</div></script>';
    result();

    var i;

    for (i = 0; i < count; i += 1) {
      data.push({
        title: 'Title #' + (i + 1),
        numbers: Array.apply(null, { length: (i + 5) % 6 })
          .map(Number.call, Number)
      });
    }

    $('#' + id).listview(data);

    var $listview = $('#' + id);
    
    var $outerDivs = $listview.find('div.outer');
    expect($outerDivs).to.have.length(count);
    
    $outerDivs.each(function(index, outerDiv){
      var $outerDiv = $(outerDiv);
      var $heading = $outerDiv.find('h1');
      expect($heading).to.has.length(1);
      expect($heading.html()).to.equal(data[index].title);
      
      var $innerDivs = $outerDiv.find('div.number-item');
      expect($innerDivs).to.have.length(data[index].numbers.length);
      
      $innerDivs.each(function(i, innerDiv){
        expect(innerDiv.innerHTML).to.equal(data[index].numbers[i].toString());
      });     
    });   
    
  });
});
