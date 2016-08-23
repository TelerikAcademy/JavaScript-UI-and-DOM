function solve() {
    return function () {
        $.fn.fileExplorer = function (directory) {
            'use strict';

            var root = $(this),
                browserMenu = $('<section />').addClass('file-explorer'),
                $add = $('<div />').addClass('add-wrapper').appendTo(browserMenu),
                $addBtn = $('<a />').addClass('add-btn visible').appendTo($add),
                $addInput = $('<input />', { type: 'text' }).appendTo($add),
                items = $('<ul />').addClass('items').appendTo(browserMenu),
                preview = $('<article />').addClass('file-preview'),
                fileContents = $('<p />').addClass('file-content').appendTo(preview);

            var filesByName = {};

            function renderFile(file) {
                var li = $('<li />').addClass('file-item').addClass('item'),
                    fileName = $('<a />').text(file.name).addClass('item-name').appendTo(li),
                    $delBtn = $('<a />').addClass('del-btn').appendTo(li);

                filesByName[file.name] = file.content;

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

                return dirLi;
            }


            directory.forEach(function (item) {
                if (item.content) {

                    return renderFile(item).appendTo(items);
                }

                renderDir(item).appendTo(items);
            });

            browserMenu.appendTo(root);
            preview.appendTo(root);

            return filesByName;
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}