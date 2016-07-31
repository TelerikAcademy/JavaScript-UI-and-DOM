/* globals module, document, HTMLElement, console */

function solve() {
    return function(selector, isCaseSensitive) {
        var element = selector,
            fragment,

            addControls,
            labelAdd,
            tbAdd,
            btnAdd,

            searchControls,
            labelSearch,
            tbSearch,

            resultControls,
            listResults,
            listItemTemplate,
            btnDeleteListItem,
            textListItem,
            listItems;


        isCaseSensitive = !!isCaseSensitive;
        if (typeof element === "string") {
            element = document.querySelector(element);
        }
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error("Invalid HTML element or selector");
        }

        fragment = document.createDocumentFragment();

        /* Add Controls: START */

        addControls = document.createElement("div");
        addControls.className = "add-controls";

        labelAdd = document.createElement("label");
        labelAdd.innerHTML = "Enter text: ";

        tbAdd = document.createElement("input");
        
        labelAdd.appendChild(tbAdd);

        btnAdd = document.createElement("button");
        btnAdd.className = "button";
        btnAdd.addEventListener("click", onAddButtonClick, false);
        btnAdd.innerHTML = "Add";

        addControls.appendChild(labelAdd);
        addControls.appendChild(btnAdd);

        /* Add Controls: END */


        /* Search Controls: START */

        searchControls = document.createElement("div");
        searchControls.className = "search-controls";

        labelSearch = document.createElement("label");
        labelSearch.innerHTML = "Search:";

        tbSearch = document.createElement("input");

        tbSearch.addEventListener("input", onSearchTextboxInput, false);

        labelSearch.appendChild(tbSearch);

        searchControls.appendChild(labelSearch);

        /* Search Controls: END */

        /* Result Controls: START */

        resultControls = document.createElement("div");
        resultControls.className = "result-controls";

        listResults = document.createElement("ul");
        listResults.className = "items-list";

        // listResults.addEventListener("click", onListResultClick, false);


        resultControls.appendChild(listResults);

        listItems = element.getElementsByClassName("list-item");

        /* Result Controls: END */

        fragment.appendChild(addControls);
        fragment.appendChild(searchControls);
        fragment.appendChild(resultControls);

        element.appendChild(fragment);
        element.className += "items-control";


        function onAddButtonClick(ev) {
            var value = tbAdd.value;
            tbAdd.value = "";

            listItemTemplate = document.createElement("li");
            listItemTemplate.className = "list-item";
            textListItem = document.createElement("strong");
            textListItem.innerHTML = value;
            btnDeleteListItem = document.createElement("button");
            btnDeleteListItem.className = "button button-delete";
            btnDeleteListItem.innerHTML = "X";
            btnDeleteListItem.addEventListener("click", onListResultClick, this, false);
            listItemTemplate.appendChild(btnDeleteListItem);
            listItemTemplate.appendChild(textListItem);

            listResults.appendChild(listItemTemplate);
        }

        function onSearchTextboxInput() {
            var i = 0,
                len,
                text,
                pattern = tbSearch.value;
            if (!isCaseSensitive) {
                pattern = pattern.toLowerCase();
            }

            for (i = 0, len = listItems.length; i < len; i += 1) {
                text = listItems[i].getElementsByTagName("strong")[0].innerHTML;
                if (!isCaseSensitive) {
                    text = text.toLowerCase();
                }

                if (text.indexOf(pattern) < 0) {
                    listItems[i].style.display = "none";
                } else {
                    listItems[i].style.display = "";
                }
            }
        }

        function onListResultClick(ev) {
            this.parentNode.parentNode.removeChild(this.parentNode);
        }
    };
}