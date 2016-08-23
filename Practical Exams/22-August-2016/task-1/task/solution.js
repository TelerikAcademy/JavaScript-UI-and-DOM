function solve() {
    return function (selector, tabs) {
        var root = document.querySelector(selector),
            all = document.createDocumentFragment();

        var navigation = document.createElement('ul');

        navigation.className += ' tabs-nav';

        var tabsContent = document.createElement('ul');

        tabsContent.className += ' tabs-content';

        tabs.forEach(function (tab, index) {
            var tabClass = 'tab-content';
            if (!index) {
                tabClass += ' visible';
            }

            navigation.innerHTML += '<li> <a href="#" class="tab-link" tab-index="' + index + '">' + tab.title + '</a> </li>';
            tabsContent.innerHTML += '<li class="' + tabClass + '"><p>' + tab.content + '</p> <button class="btn-edit">Edit</button> </li>';
        });

        all.appendChild(navigation);
        all.appendChild(tabsContent);

        var tabs = [].slice.call(tabsContent.getElementsByClassName('tab-content'));

        navigation.addEventListener('click', function (event) {
            
            var index = +event.target.getAttribute('tab-index');

            for (var i = 0; i < tabs.length; i += 1) {

                if (index !== i) {
                    tabs[i].className = 'tab-content';
                } else {
                    tabs[i].className = 'tab-content visible';
                }

            }

        });

        tabsContent.addEventListener('click', function (event) {

            if (event.target.tagName !== 'BUTTON') {
                return;
            }

            var target = event.target,
                parent = target.parentElement,
                content = parent.firstChild.innerHTML;

            if (target.innerHTML === 'Edit') {

                target.innerHTML = 'Save';

                var editArea = document.createElement('textarea');
                editArea.className += ' edit-content';
                editArea.value = content;
                parent.appendChild(editArea);
            } else if (target.innerHTML === 'Save') {

                target.innerHTML = 'Edit';
                parent.firstChild.innerHTML = parent.lastChild.value;
                parent.lastChild.remove();
            }

        });

        root.appendChild(all);
    }
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}