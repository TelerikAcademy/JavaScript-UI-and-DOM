/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-1')();
var Handlebars = require('handlebars');

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


  it('expect to generate a table with class items-table', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');
    expect($table).to.has.length(1);
  });

  it('expect to generate a single thead in the .items-table', function () {

    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [],
      count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({
        col1: 'Title #' + i,
        col2: new Date() + '',
        col3: i
      });
    }

    var data = {
      headers, items
    };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;


    var $table = $('table.items-table');

    var $thead = $table.find('thead');
    expect($thead).to.has.length(1);
  });

  it('expect thead to has a single row', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');
    var $thead = $table.find('thead');

    var $headersRow = $thead.find('tr');
    expect($headersRow).to.has.length(1);
  });

  it('expect cells in thead to be 4 and to have the provided content', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');
    var $thead = $table.find('thead');
    var $headersRow = $thead.find('tr');

    headers.unshift('#');
    var $headerCells = $headersRow.find('th');
    expect($headerCells).to.have.length(headers.length);

    $headerCells.each(function (index, cell) {
      expect(cell.innerHTML).to.equal(headers[index]);
    });
  });

  it('expect .items-table to contain a single tbody', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');

    var $tbody = $table.find('tbody');
    expect($tbody).to.has.length(1);
  });

  it('expect tbody to contain COUNT rows', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');
    var $tbody = $table.find('tbody');

    var $itemsRows = $tbody.find('tr');
    expect($itemsRows).to.have.length(items.length);
  });

  it('expect item cells in tbody to be 4 on a row, and to have the provided content', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var headers = ['Title', 'Date #1', 'Duration'];
    var items = [], count = 10;

    for (var i = 0; i < count; i += 1) {
      items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
    }

    var data = { headers, items };
    var template = Handlebars.compile($('#template').html());
    var compiledHTML = template(data);
    document.body.innerHTML = compiledHTML;

    var $table = $('table.items-table');
    var $tbody = $table.find('tbody');

    var $itemsRows = $tbody.find('tr');
    $itemsRows.each(function (index, row) {
      items[index].col0 = index + '';
      var $cells = $(row).find('td');
      expect($cells).to.have.length(Object.keys(items[index]).length);

      $cells.each(function (i, cell) {
        var key = 'col' + i,
          value = items[index][key];
        expect(cell.innerHTML).to.equal(value + '');
      });
    });
  });
});