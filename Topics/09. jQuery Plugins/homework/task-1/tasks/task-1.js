function solve(selector) {
  // return function (selector) {

    var $selector = $(selector)
    .css({ display: 'none' }),
      selectorChildren = $selector.children(),

      $dropDownWrapper = $('<div />')
      .addClass('dropdown-list'),

      $currentDiv = $('<div />')
      .addClass('current')
      .attr('data-value', '')
      .text(selectorChildren.first().html())
      .on('click', function (){
        $optionsContainer.toggle();
      }),

      $optionsContainer = $('<div />')
      .addClass('options-container')
        .css({
          position: 'absolute',
          display: 'none'
        })
        .on('click', function(ev) {
          var $target = $(ev.target);

          $currentDiv.attr('data-value', $target.attr('data-value'));
          $currentDiv.text($target.html());
          $optionsContainer.css('display', 'none');
        }),

      len = $selector.children().length;

    for (var i = 0; i < len; i += 1) {
      var $dropDownItem = $('<div />')
        .addClass('dropdown-item')
        .attr('data-value', selectorChildren.eq(i).attr('value'))
        .attr('data-index', i)
        .text(selectorChildren.eq(i).html());

      $optionsContainer.append($dropDownItem);
    }
    $dropDownWrapper.appendTo($('body'));
  $dropDownWrapper.append($selector).append($currentDiv).append($optionsContainer);
    
    return $dropDownWrapper;

  // };
}

module.exports = solve;
