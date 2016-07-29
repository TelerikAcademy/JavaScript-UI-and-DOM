/*globals describe, it, require, before, global, $*/
var expect = require('chai').expect;
var jsdom = require('jsdom');
var jq = require('jquery');
var result = require('../tasks/scripts');

describe('Task #2 Tests:', function () {
  var html = `<div id="gallery">
                <div class="gallery-list">
                    <div class="image-container">
                        <img src="imgs/1.jpg" data-info="1" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/2.jpg" data-info="2" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/3.jpg" data-info="3" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/4.jpg" data-info="4" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/5.jpg" data-info="5" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/6.jpg" data-info="6" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/7.jpg" data-info="7" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/8.jpg" data-info="8" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/9.jpg" data-info="9" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/10.jpg" data-info="10" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/11.jpg" data-info="11" />
                    </div>
                    <div class="image-container">
                        <img src="imgs/12.jpg" data-info="12" />
                    </div>
                </div>
                <div class="selected">
                    <div class="previous-image">
                        <img src="imgs/1.jpg" id="previous-image" />
                    </div>
                    <div class="current-image">
                        <img src="imgs/2.jpg" id="current-image" />
                    </div>
                    <div class="next-image">
                        <img src="imgs/3.jpg" id="next-image" />
                    </div>
                </div>
            </div>`;

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

  it('expect to has class ".gallery"', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery';
    result();
    $('#' + rootId).gallery();
    expect($('.gallery')).to.has.length(1);
  });

  it('expect to have 4 columns, without passing a param', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery';
    result();
    $('#' + rootId).gallery();
    var $gallery = $('#' + rootId);
    var $images = $gallery.find('.image-container');
    var count = 0;
    $images.each(function (index, image) {
      var $image = $(image);
      count += 1;
      if (count === 4 && index < $images.length - 1) {
        var condition = $image.next().hasClass('clearfix');
        if (!condition) {
          console = $image.next().css('clear');
        }
        expect(condition).to.be.true;
        count = 0;
      }
    });
  });

  it('expect to have 4 columns, when passing a param 4', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 4;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);
    var $images = $gallery.find('.image-container');
    var count = 0;
    $images.each(function (index, image) {
      var $image = $(image);
      count += 1;
      if (count === columnsCount && index < $images.length - 1) {
        var condition = $image.next().hasClass('clearfix');
        if (!condition) {
          console = $image.next().css('clear');
        }
        expect(condition).to.be.true;
        count = 0;
      }
    });
  });

  it('expect to have 3 columns, when passing a param 3', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 3;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);
    var $images = $gallery.find('.image-container');
    var count = 0;
    $images.each(function (index, image) {
      var $image = $(image);
      count += 1;
      if (count === columnsCount && index < $images.length - 1) {
        var condition = $image.next().hasClass('clearfix');
        if (!condition) {
          console = $image.next().css('clear');
        }
        expect(condition).to.be.true;
        count = 0;
      }
    });
  });

  it('expect to have 5 columns, when passing a param 3', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);
    var $images = $gallery.find('.image-container');
    var count = 0;
    $images.each(function (index, image) {
      var $image = $(image);
      count += 1;
      if (count === columnsCount && index < $images.length - 1) {
        var condition = $image.next().hasClass('clearfix');
        if (!condition) {
          console = $image.next().css('clear');
        }
        expect(condition).to.be.true;
        count = 0;
      }
    });
  });

  it('expect ".selected" to be initialy hidden', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);
    expect($gallery.find('.selected').css('display')).to.equal('none');
  });

  it('expect a click on an image to show ".selected" ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img');
    var imageToClick = $images.get((Math.random() * $images.length) | 0);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $selected = $gallery.find('.selected');

    expect($selected.css('display')).not.to.equal('none');
  });
  
  it('expect a click on an image to "blur" the ".gallery-list"', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img');
    var imageToClick = $images.get((Math.random() * $images.length) | 0);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $galleryList = $gallery.find('.gallery-list');

    expect($galleryList.hasClass('blurred')).to.be.true;
  });

  it('expect a click on the #current-image inside the ".selected" to hide the selected', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img');
    var imageToClick = $images.get((Math.random() * $images.length) | 0);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);
    $('#current-image').get(0).dispatchEvent(clickEvent);

    var $selected = $gallery.find('.selected');

    expect($selected.css('display')).to.equal('none');
  });

  it('expect after a click on an image in the middle, the #next-image, #current-image and #previous-image to be updated', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = Math.floor(len / 2);
    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    var currentIndex = imgIndex;
    var prevIndex = (imgIndex - 1 + len) % len;
    var nextIndex = (imgIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect after a click on the first image, the #next-image, #current-image and #previous-image to be updated', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = 0;
    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    var currentIndex = imgIndex;

    var prevIndex = (imgIndex - 1 + len) % len;
    var nextIndex = (imgIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect after a click on the last image, the #next-image, #current-image and #previous-image to be updated', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = len - 1;
    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    var currentIndex = imgIndex;
    var prevIndex = (imgIndex - 1 + len) % len;
    var nextIndex = (imgIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #next-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is in the middle ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = Math.floor(len / 2);

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $nextImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex + 1) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #previous-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is in the middle ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = Math.floor(len / 2);

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $prevImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex - 1 + len) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #next-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is the first image ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = 0;

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $nextImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex + 1) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #previous-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is the first image ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = 0;

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $prevImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex - 1 + len) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #next-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is the last image ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = len - 1;

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $nextImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex + 1) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });

  it('expect a click on #previous-image, the #next-image, #current-image and #previous-image to be updated, when #current-image is the first image ', function () {
    document.body.innerHTML = html;
    var rootId = 'gallery',
      columnsCount = 5;
    result();
    $('#' + rootId).gallery(columnsCount);
    var $gallery = $('#' + rootId);

    var $images = $gallery.find('.image-container img'),
      len = $images.length;
    var imgIndex = len - 1;

    var imageToClick = $images.get(imgIndex);

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);

    imageToClick.dispatchEvent(clickEvent);

    var $prevImage = $gallery.find('#previous-image');
    var $currentImage = $gallery.find('#current-image');
    var $nextImage = $gallery.find('#next-image');

    $prevImage.get(0).dispatchEvent(clickEvent);

    var currentIndex = (imgIndex - 1 + len) % len;
    var prevIndex = (currentIndex - 1 + len) % len;
    var nextIndex = (currentIndex + 1) % len;

    expect($prevImage.attr('src')).to.equal($images.eq(prevIndex).attr('src'));
    expect($currentImage.attr('src')).to.equal($images.eq(currentIndex).attr('src'));
    expect($nextImage.attr('src')).to.equal($images.eq(nextIndex).attr('src'));
  });
});