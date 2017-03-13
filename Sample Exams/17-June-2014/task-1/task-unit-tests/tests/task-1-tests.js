/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/task-1')();

describe('Task #1 Tests', function () {

  var html = '<div id="root"></div>';

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


  describe('Initial .image-preview tests', function () {
    it('expect to has a single .image-preview element', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imagePreview = $root.find('.image-preview');
      expect($imagePreview).to.have.length(1);
    });


    it('expect .image-preview to has an image with src from the first item', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imagePreview = $root.find('.image-preview');

      var $img = $imagePreview.find('img');
      expect($img).to.has.length(1);
      expect($img.attr('src')).to.equal(items[0].url);
    });

    it('expect .image-preview to has a title with content from the first item', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imagePreview = $root.find('.image-preview');

      var hasContent = false;
      $imagePreview.find('*')
        .each(function (index, node) {
        if (hasContent) {
          return;
        }
        var $node = $(node);
        if ($node.html() === items[0].title) {
          hasContent = true;
        }
      });
      expect(hasContent).to.be.true;
    });

    it('expect .image-preview to has a title with content from the first item', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imagePreview = $root.find('.image-preview');

      var hasContent = false;
      $imagePreview.find('*')
        .each(function (index, node) {
        if (hasContent) {
          return;
        }
        var $node = $(node);
        if ($node.html() === items[0].title) {
          hasContent = true;
        }
      });
      expect(hasContent).to.be.true;
    });
  });

  describe('Initial images list tests', function () {
    it('expect to have COUNT .image-container elements ', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imageContainers = $root.find('.image-container');
      expect($imageContainers).to.have.length(count);
    });

    it('expect .image-container elements to contain the titles from the items array', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imageContainers = $root.find('.image-container');

      var foundContents = 0;

      $imageContainers.each(function (index, imageContainer) {
        var isFound = false;
        $(imageContainer).find('*')
          .each(function (i, node) {
          if (isFound) {
            return;
          }
          if ($(node).html() === items[index].title) {
            foundContents += 1;
            isFound = true;
          }
        });
      });

      expect(foundContents).to.equal(count);
    });

    it('expect .image-container elements to contain the images from the items array', function () {
      var items = [],
        count = 5,
        i,
        id = 'root';
      for (i = 0; i < count; i += 1) {
        items.push({
          title: `Image #${i}`,
          url: `http://test-url-${i}.com`
        });
      }
      document.body.innerHTML = `<div id="${id}"></div>`;
      var fakejQuery = $;
      $ = undefined;
      result('#' + id, items);
      $ = fakejQuery;

      var $root = $('#' + id);

      var $imageContainers = $root.find('.image-container');

      $imageContainers.each(function (index, imageContainer) {
        var $img = $(imageContainer).find('img');
        expect($img).to.has.length(1);
        expect($img.attr('src')).to.equal(items[index].url);
      });
    });
  });
});