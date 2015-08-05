/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-2')();
var handlebars = require('handlebars');

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


  it('expect to create a DIV with class .container', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var animals = [],
      count = 15,
      animal,
      i;
    for (i = 0; i < count; i += 1) {
      animal = {
        name: 'Animal #' + i,
      };
      if (i % 3 !== 0) {
        animal.url = 'http://animal-' + i + '.com';
      }
      animals.push(animal);
    }

    var data = { animals };

    var templateFunc = handlebars.compile($('#template').html());

    var output = templateFunc(data);

    document.body.innerHTML = output;

    var $container = $('div.container');
    expect($container).to.have.length(1);
  });

  it('expect .container to has a H1 with content "Animals"', function () {

    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var animals = [],
      count = 15,
      animal,
      i;
    for (i = 0; i < count; i += 1) {
      animal = {
        name: 'Animal #' + i,
      };
      if (i % 3 !== 0) {
        animal.url = 'http://animal-' + i + '.com';
      }
      animals.push(animal);
    }

    var data = { animals };

    var templateFunc = handlebars.compile($('#template').html());

    var output = templateFunc(data);

    document.body.innerHTML = output;

    var $container = $('div.container');

    var $heading = $container.find('h1');
    expect($heading).to.have.length(1);
    expect($heading.html()).to.equal('Animals');
  });

  it('expect .container to has a UL with class .animals-list', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var animals = [],
      count = 15,
      animal,
      i;
    for (i = 0; i < count; i += 1) {
      animal = {
        name: 'Animal #' + i,
      };
      if (i % 3 !== 0) {
        animal.url = 'http://animal-' + i + '.com';
      }
      animals.push(animal);
    }

    var data = { animals };

    var templateFunc = handlebars.compile($('#template').html());

    var output = templateFunc(data);

    document.body.innerHTML = output;

    var $container = $('div.container');

    var $list = $container.find('ul.animals-list');
    expect($list).to.have.length(1);
  });

  it('expect .animals-list to contain COUNT LIs', function () {
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var animals = [],
      count = 15,
      animal,
      i;
    for (i = 0; i < count; i += 1) {
      animal = {
        name: 'Animal #' + i,
      };
      if (i % 3 !== 0) {
        animal.url = 'http://animal-' + i + '.com';
      }
      animals.push(animal);
    }

    var data = { animals };

    var templateFunc = handlebars.compile($('#template').html());

    var output = templateFunc(data);

    document.body.innerHTML = output;

    var $container = $('div.container');

    var $list = $container.find('ul.animals-list');
    var $items = $list.find('li');
    expect($items).to.have.length(count);

  });
  it('expect each of the LIs in .animals-list to have the correct hrefs and contents ', function () {
    const BATMAN_LINK = 'http://cdn.playbuzz.com/cdn/3170bee8-985c-47bc-bbb5-2bcb41e85fe9/d8aa4750-deef-44ac-83a1-f2b5e6ee029a.jpg';
    document.body.innerHTML = '<script id="template"></script>';
    result('#template');

    var animals = [],
      count = 15,
      animal,
      i;
    for (i = 0; i < count; i += 1) {
      animal = {
        name: 'Animal #' + i,
      };
      if (i % 3 !== 0) {
        animal.url = 'http://animal-' + i + '.com';
      }
      animals.push(animal);
    }

    var data = { animals };

    var templateFunc = handlebars.compile($('#template').html());

    var output = templateFunc(data);

    document.body.innerHTML = output;

    var $container = $('div.container');
    var $list = $container.find('ul.animals-list');
    
    var $items = $list.find('li');
    $items.each(function (index, item) {
      var $item = $(item);
      var $link = $item.find('a');
      expect($link).to.have.length(1);
      if (animals[index].url) {
        expect($link.attr('href')).to.equal(animals[index].url);
        expect($link.html()).to.equal(`See a ${animals[index].name}`);
      }
      else {
        expect($link.attr('href')).to.equal(BATMAN_LINK);
        expect($link.html()).to.equal(`No link for ${animals[index].name}, here is Batman!`);
      }
    });
  });
});
