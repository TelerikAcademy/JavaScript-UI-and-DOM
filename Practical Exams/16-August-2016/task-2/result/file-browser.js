$.fn.fileBrowser = function (directory) {
    'use strict';

    var root = $(this),
        browserMenu = $('<section />').addClass('file-explorer'),
        $add = $('<div />').addClass('add-wrapper').appendTo(browserMenu),
        $addBtn = $('<a />').addClass('add-btn visible').appendTo($add),
        $addInput = $('<input />', { type: 'text' }).appendTo($add),
        items = $('<ul />').addClass('items').appendTo(browserMenu),
        preview = $('<article />').addClass('file-preview'),
        fileContents = $('<p />').addClass('file-content').appendTo(preview);

    var filesByName = {},
        dirsByName = {};

    $addBtn.on('click', function () {
        $addInput.addClass('visible');
        $addBtn.removeClass('visible');
    });

    $addInput.on('keydown', function (event) {
        if (event.keyCode !== 13)
            return;

        var path = $addInput.val().split('/');


        if (path.length === 1) {

            renderFile({ name: path[0], content: '' }).appendTo(items);
        } else {
            var file = renderFile({ name: path[1], content: '' });

            if (!dirsByName[path[0]])
                return;

            dirsByName[path[0]].children('ul.items').append(file);
        }

        $addInput.val('');

        $addInput.removeClass('visible');
        $addBtn.addClass('visible');
    });

    function renderFile(file) {
        var li = $('<li />').addClass('file-item').addClass('item'),
            fileName = $('<a />').text(file.name).addClass('item-name').appendTo(li),
            $delBtn = $('<a />').addClass('del-btn').appendTo(li);

        filesByName[file.name] = file;

        return li;
    }

    function renderDir(dir) {
        var dirLi = $('<li />').addClass('dir-item').addClass('item').addClass('collapsed'),
            dirName = $('<a />').text(dir.name).addClass('item-name').appendTo(dirLi),
            files = $('<ul />').addClass('items').appendTo(dirLi),
            $delBtn = $('<a />').addClass('del-btn').appendTo(dirLi);

        dir.files.forEach(function (file) {
            renderFile(file).appendTo(files);
        });

        dirsByName[dir.name] = dirLi;

        return dirLi;
    }

    items.on('click', function (event) {

        var $target = $(event.target),
            $parent = $target.parent();

        if ($target.hasClass('del-btn')) {
            $parent.remove();
            return;
        }

        if ($parent.hasClass('file-item')) {
            fileContents.text(filesByName[$target.text()].content || '');
        }

        if ($parent.hasClass('dir-item')) {
            $parent.toggleClass('collapsed');
        }

    });

    directory.forEach(function (item) {
        if (item.content) {

            return renderFile(item).appendTo(items);
        }

        renderDir(item).appendTo(items);
    });



    browserMenu.appendTo(root);
    preview.appendTo(root);

    return root;
}

$('#file-explorer').fileBrowser(
        [
            { name: 'index.html', content: '<h1>Good luck!</h1>' },
            { name: 'main.css', content: '/* no styles here : ( */' },
            { name: 'imgs', files: [
                                     { name: 'wallpaper.png', content: 'Cannot be displayed.' },
                                     { name: 'result.jpg', content: 'Cannot be displayed.' } 
                                    ]
                                 },
            { name: 'js', files: [
                                    { name: 'weird.js', content: 'var let = 5;' },
                                    { name: 'batman.js', content: 'new Array(16).join("hero" - 2) + " Batmaaaaan" //paste in console for some fun' }
                                ] },
            { name: 'notes.txt', content: 'never forget that javascript hates you! :D' },
            { name: 'solution.js', content: 'console.log("not really");' }
        ]
    );