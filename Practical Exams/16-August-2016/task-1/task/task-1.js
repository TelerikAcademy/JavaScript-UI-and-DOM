/* globals document, window, console */

function solve() {
    return function(selector, initialSuggestions) {
        "use strict";
        var element = document.querySelector(selector);

        var tbPattern = element.getElementsByClassName("tb-pattern")[0];
        var suggestionItems = element.getElementsByClassName("suggestion");
        var suggestionsList = element.getElementsByClassName("suggestions-list")[0];
        var btnAdd = element.getElementsByClassName("btn-add")[0];
        var pattern = "";

        var suggestionItemTemplate = document.createElement("li"),
            suggestionLinkTemplate = document.createElement("a");

        suggestionItemTemplate.className = "suggestion";

        suggestionLinkTemplate.className = "suggestion-link";
        suggestionLinkTemplate.href = "#";
        suggestionItemTemplate.appendChild(suggestionLinkTemplate);
        suggestionItemTemplate.style.display = "none";

        var usedSuggestions = {};

        initialSuggestions = initialSuggestions || [];

        for (var i = 0, len = initialSuggestions.length; i < len; i += 1) {
            var suggestionString = initialSuggestions[i];
            if (!usedSuggestions[suggestionString.toLowerCase()]) {
                suggestionLinkTemplate.innerHTML = suggestionString;
                var newSuggestion = suggestionItemTemplate.cloneNode(true);
                suggestionsList.appendChild(newSuggestion);
                usedSuggestions[suggestionString.toLowerCase()] = true;
            }
        }

        suggestionsList.addEventListener("click", function(ev) {
            var btn = ev.target,
                text;
            if (btn.className.indexOf("suggestion-link") < 0) {
                return;
            }

            text = btn.innerHTML;
            tbPattern.value = text;
            ev.preventDefault();
        });

        suggestionsList.style.display = "none";

        btnAdd.addEventListener("click", function() {
            var value = tbPattern.value;
            tbPattern.value = "";

            suggestionsList.style.display = "none";

            if (!usedSuggestions[value.toLowerCase()]) {
                suggestionLinkTemplate.innerHTML = value;
                suggestionsList.appendChild(suggestionItemTemplate.cloneNode(true));
                usedSuggestions[value.toLowerCase()] = true;
            }
        });

        tbPattern.addEventListener("input", function() {
            var suggestionItems = element.getElementsByClassName("suggestion");

            var len = suggestionItems.length,
                suggestionItem,
                suggestionText,
                i;


            pattern = this.value.toLowerCase();

            if (pattern === "") {
                suggestionsList.style.display = "none";
                return;
            }

            suggestionsList.style.display = "";

            for (i = 0; i < len; i += 1) {
                suggestionItem = suggestionItems[i];
                suggestionText = suggestionItem.getElementsByClassName("suggestion-link")[0];
                if (suggestionText.innerHTML.toLowerCase().indexOf(pattern) >= 0) {
                    suggestionItem.style.display = "";
                } else {
                    suggestionItem.style.display = "none";
                }
            }
        });
    };
}

module.exports = solve;