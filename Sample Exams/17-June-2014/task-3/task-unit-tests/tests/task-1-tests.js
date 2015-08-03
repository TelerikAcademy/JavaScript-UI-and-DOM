/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var handlebars = require('Handlebars');
var result = require('../tasks/task-1')();

describe('Task #1 Tests', function () {
  before(function (done) {
    jsdom.env({
      html: '',
      done: function (errors, window) {
        global.window = window;
        global.document = window.document;
        global.$ = jq(window);
        global.handlebars =
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
    it('expect to have 4 boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [{
        name: "Николай Костов",
        image: "images/niki.jpg",
        titles: ["Technical <b>Trainer</b>", "Rapper"],
        urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
        right: false,
      }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: true,
        }, {
          name: "Дончо Минков",
          image: "images/doncho.jpg",
          titles: ["Technical <b>Trainer</b>"],
          urls: ["http://minkov.it", "https://github.com/Minkov"],
          right: false,
        }, {
          id: 4,
          name: "Тодор Стоянов",
          image: "images/todor.jpg",
          titles: ["Software <b>Developer</b>"],
          urls: ["https://github.com/todorstoianov"],
          right: true,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box');
      expect(boxes).to.have.length(authors.length);
    });


    it('expect to have 3 boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: true,
        }, {
          name: "Дончо Минков",
          image: "images/doncho.jpg",
          titles: ["Technical <b>Trainer</b>"],
          urls: ["http://minkov.it", "https://github.com/Minkov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box');
      expect(boxes).to.have.length(authors.length);
    });

    it('expect to have 2 boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: true,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box');
      expect(boxes).to.have.length(authors.length);
    });

    it('expect to have 1 box', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box');
      expect(boxes).to.have.length(authors.length);
    });

    it('expect to have 0 boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box');
      expect(boxes).to.have.length(authors.length);
    });

    it('expect to have 2 .right boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: true,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: true,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box.right');
      expect(boxes).to.have.length(2);
    });

    it('expect to have 1 .right ', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: true,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box.right');
      expect(boxes).to.have.length(1);
    });

    it('expect to have 0 .right boxes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var boxes = $('.box.right');
      expect(boxes).to.have.length(0);
    });


    it('expect to each box to have a single element with class .inner', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var $boxes = $('.box');
      $boxes.each(function (index, box) {
        var $box = $(box);
        expect($box.find('.inner')).to.has.length(1);
      });
    });


    it('expect .inner to have 2 children: P and DIV', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var $inners = $('.box .inner');
      $inners.each(function (index, inner) {
        var $inner = $(inner);
        var children = $inner.children();
        expect(children).to.have.length(2);
        expect(children.eq(0).is('p')).to.be.true;
        expect(children.eq(1).is('div')).to.be.true;
      });
    });

    it('expect `.inner p` to have an image with set attributes', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var $imgs = $('.box .inner p img');
      expect($imgs).to.have.length(authors.length);
      $imgs.each(function (index, img) {
        var $img = $(img);
        expect($img.attr('alt')).to.equal(authors[index].name);
        expect($img.attr('src')).to.equal(authors[index].image);
        expect($img.attr('width')).to.equal('100');
        expect($img.attr('height')).to.equal('133');
      });
    });

    it('expect `.inner div` to have a h3, some Ps and an ul', function () {
      document.body.innerHTML = '<script id="template"></script>';
      result('#template');
      var authors = [
        {
          name: "Николай Костов",
          image: "images/niki.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://nikolay.it", "https://github.com/NikolayIT"],
          right: false,
        }, {
          name: "Ивайло Кенов",
          image: "images/ivo.jpg",
          titles: ["Technical <b>Trainer</b>", "Rapper"],
          urls: ["http://ivaylo.bgcoder.com", "https://github.com/ivaylokenov"],
          right: false,
        }];
      var data = { authors };
      var template = handlebars.compile($('#template').html());
      document.body.innerHTML = template(data);

      var $divs = $('.inner div');
      $divs.each(function (index, div) {
        var $div = $(div);
        var $children = $div.children();
        expect($children).to.have.length(2 + authors[index].titles.length);

        $children.each(function (i, node) {
          var $node = $(node);
          if (i === 0) {
            expect($node.is('h3')).to.be.true;
            expect($node.html()).to.equal(authors[index].name);
          } else if (i == $children.length - 1) {
            expect($node.is('ul')).to.be.true;
          } else{
            expect($node.is('p')).to.be.true;
            expect($node.html()).to.equal(authors[index].titles[i-1]);
          }
        });
      });
    });
  });
});