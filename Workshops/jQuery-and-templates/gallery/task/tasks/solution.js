/* globals $ */
 
function solve() {
$.fn.gallery = function (col) {
  var $gallery = $(this).addClass('gallery'),
    $gallerylist = $gallery.find('.gallery-list'),
    $imgList = $gallerylist.find('img'),
    len = $imgList.length,
    $disabled = $('<div>').addClass('disabled-background'),
    $selected = $gallery.find('.selected'),
    $currImg = $gallery.find('#current-image'),
    $prevImg = $gallery.find('#previous-image'),
    $nextImg = $gallery.find('#next-image'),
    currIndex,
    prevIndex,
    nextIndex;
 
  col = col || 4;
 
  // tabular view
  $disabled.hide();
  $selected.hide();
  $gallery.append($disabled);
  $imgList.each(function (i, el) {
    if (i % col === 0) {
      $(el).parent().addClass('clearfix');
    }
  })
 
  // attach events
  $gallery.on('click', '.image-container img', clickOnImage);
  $gallery.on('click', 'img#current-image', clickOnCurrentImage);
  $gallery.on('click', 'img#previous-image', clickOnPrevImage);
  $gallery.on('click', 'img#next-image', clickOnNextImage);
 
  function clickOnImage(ev) {
    var $target = $(ev.target);
    calcIndexes($imgList.index($target));
    updateSelectedImages();
 
    $gallerylist.addClass('blurred');
    $disabled.show();
    $selected.show();
  }
 
  function clickOnCurrentImage(ev) {
    $gallerylist.removeClass('blurred');
    $disabled.hide();
    $selected.hide();
  }
 
  function clickOnPrevImage(ev) {
    calcIndexes(prevIndex);
    updateSelectedImages();
  }
 
  function clickOnNextImage(ev) {
    calcIndexes(nextIndex);
    updateSelectedImages();
  }
 
  function calcIndexes(index) {
    currIndex = index;
    prevIndex = (currIndex - 1 + len) % len;
    nextIndex = (currIndex + 1) % len;
  }
 
  function updateSelectedImages() {
    $currImg.attr('src', $imgList.eq(currIndex).attr('src'));
    $prevImg.attr('src', $imgList.eq(prevIndex).attr('src'));
    $nextImg.attr('src', $imgList.eq(nextIndex).attr('src'));
  }
};
}
 
if (typeof module !== undefined) {
  module.exports = solve;
}