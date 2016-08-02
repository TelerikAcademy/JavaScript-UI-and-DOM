function solve() {
  return function (selector) {
    var template = '{{#authors}}' +
      '<div class="box {{#if right}}right{{/if}}">' +
      '  <div class="inner">' +
      '    <p>' +
      '      <img alt="{{name}}" src="{{image}}" width="100" height="133">' +
      '    </p>' +
      '    <div>' +
      '      <h3>{{name}}</h3>' +
      '      {{#titles}}' +
      '        <p>{{{this}}}</p>' +
      '          {{/titles}}' +
      '         <ul>' +
      '            {{#urls}}' +
      '             <li>' +
      '               <a href="{{this}}" target="_blank">{{this}}</a>' +
      '             </li>' +
      '          {{/urls}}' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
    '{{/authors}}';

    document.getElementById(selector).innerHTML = template;
  };
}

module.export = solve;
