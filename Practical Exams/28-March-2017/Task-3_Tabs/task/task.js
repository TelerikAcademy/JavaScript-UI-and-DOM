// function solve() {
//     return `<div class="tabs-control">
//             <ul class="list list-titles">
//                 {{#each titles}}
//                     <li class="list-item">
//                         <label for="{{link}}" class="title">{{text}}</label>
//                     </li>
//                 {{/each}}
//             </ul>
//             <ul class="list list-contents">
//                 {{#each contents}}
//                     <li class="list-item">
//                         {{#if @index}}
//                             <input class="tab-content-toggle" type="radio" id="{{link}}" name="tab-toggles" /> 
//                         {{else}}
//                             <input class="tab-content-toggle" type="radio" id="{{link}}" name="tab-toggles" checked=checked/> 
//                         {{/if}}
//                         <div class="content">
//                             {{{text}}}
//                         </div>
//                     </li>
//                 {{/each}}
//             </ul>
//         </div>`;
// }

"use strict";

function solve() {
    return "<div class=\"tabs-control\">\n            <ul class=\"list list-titles\">\n                {{#each titles}}\n                    <li class=\"list-item\">\n                        <label for=\"{{link}}\" class=\"title\">{{text}}</label>\n                    </li>\n                {{/each}}\n            </ul>\n            <ul class=\"list list-contents\">\n                {{#each contents}}\n                    <li class=\"list-item\">\n                        {{#if @index}}\n                            <input class=\"tab-content-toggle\" type=\"radio\" id=\"{{link}}\" name=\"tab-toggles\" /> \n                        {{else}}\n                            <input class=\"tab-content-toggle\" type=\"radio\" id=\"{{link}}\" name=\"tab-toggles\" checked=checked/> \n                        {{/if}}\n                        <div class=\"content\">\n                            {{{text}}}\n                        </div>\n                    </li>\n                {{/each}}\n            </ul>\n        </div>";
}
module.exports = solve