/* globals module */
function solve() {

  function clear(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  return function (selector, items) {
    var root = document.querySelector(selector);
    var left = document.createElement('div');
    left.className = 'image-preview';
    var title = document.createElement('strong');
    title.innerHTML = items[0].title;
    var img = document.createElement('img');
    img.src = items[0].url;
    left.appendChild(title);
    left.appendChild(img);

    var right = document.createElement('div');

    items.forEach(function (item) {
      var imgContainer = document.createElement('div');
      imgContainer.className = 'image-container';

      var title = document.createElement('strong');
      title.innerHTML = item.title;
      var img = document.createElement('img');
      img.width = '150';
      img.src = item.url;

      imgContainer.appendChild(title);
      imgContainer.appendChild(img);

      right.appendChild(imgContainer);
    });

    right.addEventListener('click', function (ev) {
      var target = ev.target;
      if (!(target instanceof HTMLImageElement)) {
        return;
      }
      img.src = target.src;
      title.innerHTML = target.previousElementSibling.innerHTML;
    });

    right.addEventListener('mouseover', function (ev) {
      var target = ev.target;
      console.log(target.className);
      if (target.className.indexOf('image-container') < 0) {
        return;
      }
      target.style.background = 'black';
    });

    right.addEventListener('mouseout', function (ev) {
      var target = ev.target;

      if (target.className.indexOf('image-container') < 0) {
        return;
      }

      target.style.background = '';
    });

    clear(root);
    root.appendChild(left);
    root.appendChild(right);
  };
}

module.exports = solve;