'use strict';

var chai = require('chai'),
    expect = chai.expect,
    jsdom = require('jsdom'),
    jq = require('jquery'),
    solution = require('../solution')(),
    fileExplorerBuilder = require('./file-explorer-builder')();

describe('File explorer tests', function () {

    before(function (done) {

        jsdom.env({
            html: '',
            done: function (errors, window) {

                global.window = window;
                global.document = window.document;
                global.$ = jq(window);

                Object
                    .keys(window)
                    .filter(function (p) {
                        return p.toLowerCase().indexOf('html') >= 0;
                    })
                    .forEach(function (p) {
                        global[p] = window[p];
                    });

                done();
            }
        });

    });

    beforeEach(function prep() {
        document.body.innerHTML = '<main id="root"></main>';
        fileExplorerBuilder();
        chai.config.includeStack = false;
    });

    // describe('zero tests', function () {

    //     var directory = [
    //         { name: 'index.html', content: '<h1>Good luck!</h1>' },
    //         { name: 'main.css', content: '/* no styles here : ( */' },
    //         {
    //             name: 'imgs', files: [
    //                 { name: 'wallpaper.png', content: 'Cannot be displayed.' },
    //                 { name: 'result.jpg', content: 'Cannot be displayed.' }
    //             ]
    //         },
    //         {
    //             name: 'js', files: [
    //                 { name: 'weird.js', content: 'var let = 5;' },
    //                 { name: 'batman.js', content: 'new Array(16).join("hero" - 2) + " Batmaaaaan" //paste in console for some fun' }
    //             ]
    //         },
    //         { name: 'notes.txt', content: 'never forget that javascript hates you! :D' },
    //         { name: 'solution.js', content: 'console.log("not really");' }
    //     ];

    //     it('click on .file-item should show content', function () {
    //         var files = $('#root').fileExplorer(directory);

    //         solution(files);

    //         var $content = $('.file-content');

    //         $('.file-item .item-name').each(function (index, itemName) {
    //             $(itemName).trigger('click');

    //             expect($content.text()).to.equal(files[itemName.innerHTML]);
    //         });
    //     });

    //     it('click on .dir-item should toggle visibility', function () {
    //         var files = $('#root').fileExplorer(directory);

    //         solution(files);

    //         var firstDir = $('.dir-item').first();

    //         expect(firstDir.hasClass('collapsed')).to.be.true;
    //         firstDir.find('.item-name').trigger('click');

    //         expect(firstDir.hasClass('collapsed')).to.be.false;
    //         firstDir.find('.item-name').trigger('click');

    //         expect(firstDir.hasClass('collapsed')).to.be.true;
    //     });

    //     it('add should create file in root by the provided name', function () {
    //         var files = $('#root').fileExplorer(directory);

    //         solution(files);

    //         var $addBtn = $('.add-btn'),
    //             $addInput = $('input');

    //         $addBtn.trigger('click');

    //         expect($addBtn.hasClass('visible')).to.be.false;
    //         expect($addInput.hasClass('visible')).to.be.true;

    //         var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $addInput.get(0) });
    //         $addInput.val('file-full-of-secrets.fail').trigger($enter);

    //         var filesWithName = $('.item-name').filter(function (_, element) {
    //             return element.innerHTML === 'file-full-of-secrets.fail';
    //         }).length;

    //         expect(filesWithName).to.equal(1);
    //     });

    //     it('click on any .del-btn should delete the item', function () {

    //         $('<main />', { id: 'root' }).appendTo($('body'));

    //         $.fn.fileExplorer=function(a){"use strict";function k(a){var b=$("<li />").addClass("file-item").addClass("item");$("<a />").text(a.name).addClass("item-name").appendTo(b),$("<a />").addClass("del-btn").appendTo(b);return j[a.name]=a.content,b}function l(a){var b=$("<li />").addClass("dir-item").addClass("item").addClass("collapsed"),d=($("<a />").text(a.name).addClass("item-name").appendTo(b),$("<ul />").addClass("items").appendTo(b));$("<a />").addClass("del-btn").appendTo(b);return a.files.forEach(function(a){k(a).appendTo(d)}),b}var b=$(this),c=$("<section />").addClass("file-explorer"),d=$("<div />").addClass("add-wrapper").appendTo(c),g=($("<a />").addClass("add-btn visible").appendTo(d),$("<input />",{type:"text"}).appendTo(d),$("<ul />").addClass("items").appendTo(c)),h=$("<article />").addClass("file-preview"),j=($("<p />").addClass("file-content").appendTo(h),{});return a.forEach(function(a){return a.content?k(a).appendTo(g):void l(a).appendTo(g)}),c.appendTo(b),h.appendTo(b),j};

    //         var files = $('#root').fileExplorer(directory);

    //         solution(files);

    //         var $fileItemToRemove = $('.file-item').first(),
    //             fileItemName = $fileItemToRemove.find('.item-name').text(),
    //             fileItemsCount = $('.file-item').length;

    //         $fileItemToRemove.find('.del-btn').trigger('click');

    //         expect(fileItemsCount).to.equal($('.file-item').length + 1);

    //         $('.file-item .item-name').each(function (_, fileItem) {
    //             expect(fileItem.innerHTML).to.not.equal(fileItemName);
    //         });
    //     });
    // });

    describe('.item click events', function () {

        describe('.file-item click event', function () {

            function testFileItemClick(directory) {
                // arrange
                var dirr = [
                        { name: 'file1.txt', content: 'some text' },
                        { name: 'file2.txt', content: 'another text' },
                        { name: 'tests.js', content: '// writing tests is boring' },
                        { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
                        { name: 'sticky-note.txt', content: 'wash the dishes!' }
                    ];

                $('<main />', { id: 'root' }).appendTo($('body'));

            $.fn.fileExplorer=function(a){"use strict";function k(a){var b=$("<li />").addClass("file-item").addClass("item");$("<a />").text(a.name).addClass("item-name").appendTo(b),$("<a />").addClass("del-btn").appendTo(b);return j[a.name]=a.content,b}function l(a){var b=$("<li />").addClass("dir-item").addClass("item").addClass("collapsed"),d=($("<a />").text(a.name).addClass("item-name").appendTo(b),$("<ul />").addClass("items").appendTo(b));$("<a />").addClass("del-btn").appendTo(b);return a.files.forEach(function(a){k(a).appendTo(d)}),b}var b=$(this),c=$("<section />").addClass("file-explorer"),d=$("<div />").addClass("add-wrapper").appendTo(c),g=($("<a />").addClass("add-btn visible").appendTo(d),$("<input />",{type:"text"}).appendTo(d),$("<ul />").addClass("items").appendTo(c)),h=$("<article />").addClass("file-preview"),j=($("<p />").addClass("file-content").appendTo(h),{});return a.forEach(function(a){return a.content?k(a).appendTo(g):void l(a).appendTo(g)}),c.appendTo(b),h.appendTo(b),j};

                var contentsByName = $('#root').fileExplorer(directory || dirr);

                solution(contentsByName);

                var $fileContent = $('.file-content');

                // act

                var clickEvent = document.createEvent('Event');

                clickEvent.initEvent('click', true, true);

                $('.file-item').each(function (_, item) {

                    var $item = $(item),
                        $itemName = $item.find('.item-name').first(),
                        name = $item.find('.item-name').text();

                    $itemName.get(0).dispatchEvent(clickEvent);//.trigger('click');

                    var contentsNameClick = $fileContent.text();
                    $fileContent.text('');

                    var $fileClick = $.Event('click', { target: $itemName.get(0) });

                    $item.get(0).dispatchEvent(clickEvent);//.trigger($fileClick);

                    var contentsLiClick = $fileContent.text();
                    $fileContent.text('');

                    var hasFileContent = (contentsByName[name] === contentsLiClick) || (contentsByName[name] === contentsNameClick);

                    expect(hasFileContent).to.equal(true);
                });
            }

            describe('should set the text of .file-content to the content of the clicked file', function () {
                it('Should work for root files', function () {

                    var directory = [
                        { name: 'file1.txt', content: 'some text' },
                        { name: 'file2.txt', content: 'another text' },
                        { name: 'tests.js', content: '// writing tests is boring' },
                        { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
                        { name: 'sticky-note.txt', content: 'wash the dishes!' }
                    ];

                    testFileItemClick(directory);
                });

                it('Should work for files in directories', function () {

                    var directory = [
                        {
                            name: 'dir1',
                            files: [
                                { name: 'file1.txt', content: 'some text' },
                                { name: 'file2.txt', content: 'another text' },
                                { name: 'tests.js', content: '// writing tests is boring' },
                                { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
                                { name: 'sticky-note.txt', content: 'wash the dishes!' }
                            ]
                        },
                        {
                            name: 'trash',
                            files: [
                                { name: 'file1.txt', content: 'some text' },
                                { name: 'file2.txt', content: 'another text' }
                            ]
                        }
                    ];

                    testFileItemClick(directory);

                });

                it('Should work for files both in root and in directories', function () {

                    var directory = [
                        { name: 'file1.txt', content: 'some text' },
                        { name: 'file2.txt', content: 'another text' },
                        { name: 'directory', files: [{ name: 'file-in-dir.txt', content: 'hello' }, { name: 'asdklf', content: 'hfdfhdf' }] }
                    ];

                    testFileItemClick(directory);
                });
            });


            describe('.dir-item click events should toggle the folder\'s visibility correctly', function () {

                var directory = [
                    {
                        name: 'dir1',
                        files: [
                            { name: 'file1.txt', content: 'some text' },
                            { name: 'file2.txt', content: 'another text' },
                            { name: 'tests.js', content: '// writing tests is boring' },
                            { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
                            { name: 'sticky-note.txt', content: 'wash the dishes!' }
                        ]
                    },
                    {
                        name: 'trash',
                        files: [
                            { name: 'file1.txt', content: 'some text' },
                            { name: 'file2.txt', content: 'another text' },
                            { name: 'directory', files: [{ name: 'file-in-dir.txt', content: 'hello' }, { name: 'asdklf', content: 'hfdfhdf' }] }
                        ]
                    },
                    {
                        name: 'win32',
                        files: []
                    },
                    { name: 'movie.mp4', content: 'cannot preview!' },
                    { name: 'forkbomb.bat', content: ':e\n%0|%0\ngoto :e' },
                    { name: 'testest.test', content: 'testy test' },
                    { name: 'test.test.test', content: 'another test' },
                ];

                it('should initially be collapsed and remove .collapsed class on first click', function () {

                    // arrange

                    var files = $('#root').fileExplorer(directory);

                    solution(files);

                    // act

                    $('.dir-item').each(function (index, dirItem) {

                        var $dirItem = $(dirItem);

                        expect($dirItem.hasClass('collapsed')).to.be.true;

                        var $itemName = $dirItem
                            .find('.item-name')
                            .first();

                        $itemName.trigger('click');

                        var isVisible = !$dirItem.hasClass('collapsed') && ($dirItem.css('display') !== 'none');

                        // assert
                        expect(isVisible).to.be.true;
                    });
                });

                it('should toggle .collapsed class repeatedly when clicked repeatedly', function () {

                    // arrange
                    var files = $('#root').fileExplorer(directory);

                    solution(files);

                    // act

                    var $dirItem = $('.dir-item').first(),
                        $dirName = $dirItem.find('.item-name');

                    // assert
                    expect($dirItem.length).to.equal(1);

                    $dirName.trigger('click');
                    expect($dirItem.hasClass('collapsed')).to.be.false;

                    $dirName.trigger('click');
                    expect($dirItem.hasClass('collapsed')).to.be.true;

                    $dirName.trigger('click');
                    expect($dirItem.hasClass('collapsed')).to.be.false;
                });

                it('should not change .file-content text when clicked', function () {

                    // arrange
                    var files = $('#root').fileExplorer(directory);

                    solution(files);

                    // act

                    var $dirItem = $('.dir-item').first(),
                        $dirName = $dirItem.find('> .item-name'),
                        $fileContent = $('.file-content');

                    // assert
                    expect($fileContent.text()).to.be.empty;
                    expect($dirItem.hasClass('collapsed')).to.be.true;

                    $dirName.trigger('click');
                    expect($dirItem.hasClass('collapsed')).to.be.false;
                    expect($fileContent.text()).to.be.empty;
                });
            });

            describe('.del-btn should remove its parent from the DOM correctly', function () {

                var directory = [
                    { name: 'wow.exe', content: 'dont play!' },
                    {
                        name: 'dir1',
                        files: [
                            { name: 'file1.txt', content: 'some text' },
                            { name: 'file2.txt', content: 'another text' },
                            { name: 'tests.js', content: '// writing tests is boring' },
                            { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
                            { name: 'sticky-note.txt', content: 'wash the dishes!' }
                        ]
                    },
                    {
                        name: 'trash',
                        files: [
                            { name: 'file1.txt', content: 'some text' },
                            { name: 'file2.txt', content: 'another text' },
                            { name: 'directory', files: [{ name: 'file-in-dir.txt', content: 'hello' }, { name: 'asdklf', content: 'hfdfhdf' }] }
                        ]
                    },
                    {
                        name: 'win32',
                        files: []
                    },
                    { name: 'movie.mp4', content: 'cannot preview!' },
                    { name: 'forkbomb.bat', content: ':e\n%0|%0\ngoto :e' },
                    { name: 'testest.test', content: 'testy test' },
                    { name: 'test.test.test', content: 'another test' },
                ];

                it('should remove .file-item from the DOM without modifying the other elements', function () {
                    // assert.fail();
                    var $fileItems = $('.file-item'),
                        $fileItemsCount = $fileItems.length,
                        $dirItems = $('.dir-item'),
                        $dirItemsCount = $dirItems.length;

                    for (var i = 0; i < $fileItems.length; i += 2) {
                        var $removed = $($fileItems[i]),
                            removedName = $removed.find('.item-name').text();

                        $removed.find('.del-btn').trigger('click');

                        expect($fileItemsCount - 1).to.equal($('.file-items').length);
                        $fileItemsCount = $fileItems.length;
                        $('.file-items').each(function (index, fileItem) {
                            var name = $(fileItem).find('.item-name').text();

                            expect(removedName).to.not.equal(name);
                        });
                    }
                });

                it('should remove .file-item from .dir-item without deleting the dir item', function () {

                    // arrange
                    var files = $('#root').fileExplorer(directory);

                    solution(files);

                    var $dirItem = $('.dir-item').first(),
                        $dirItemName = $dirItem.find('.item-name').first().text(),
                        $fileItems = $dirItem.find('.file-item');

                    // act
                    for (var i = 0; i < $fileItems.length; i += 1) {

                        $($fileItems[i]).find('.del-btn').trigger('click');

                        // assert
                        expect($dirItemName).to.equal($('.dir-item').find('.item-name').first().text());
                        expect($dirItem.find('.file-item').length).to.equal($fileItems.length - i - 1);
                    }
                });

                it('should remove .dir-item and all .file-items from it', function () {

                    // arrange
                    var files = $('#root').fileExplorer(directory);

                    solution(files);

                    var $dirItem = $('.dir-item').first(),
                        dirItemName = $dirItem.find('.item-name').text(),
                        $fileItems = $dirItem.find('.file-item'),
                        $allFileItems = $('.file-item');

                    $dirItem.find('> .del-btn').trigger('click');

                    var firstName = $('.dir-item').first().find('.item-name').first().text();

                    expect(firstName).to.not.equal(dirItemName);
                    expect($allFileItems.length - $fileItems.length).to.equal($('.file-item').length);
                });
            });

            describe('file addition', function () {

                it('clicking on .add-btn should remove .visible from .add-btn and add .visible to input field', function () {
                    var files = $('#root').fileExplorer([]);

                    solution(files);

                    var $addBtn = $('.add-btn'),
                        $input = $('.add-wrapper input');

                    expect($addBtn.hasClass('visible')).to.be.true;
                    expect($input.hasClass('visible')).to.be.false;

                    $addBtn.trigger('click');

                    expect($addBtn.hasClass('visible')).to.be.false;
                    expect($input.hasClass('visible')).to.be.true;
                });

                it('should create files', function () {
                    var files = $('#root').fileExplorer([]);

                    solution(files);

                    var $addBtn = $('.add-btn'),
                        $input = $('.add-wrapper input');

                    var files = [
                        { name: 'cat.png', content: '2cutie-cat' },
                        { name: 'forkbomb.bat', content: '%0|%0' },
                        { name: 'npm-debug.log', content: 'pad-left is broken!' }
                    ];

                    files.forEach(function (file, index) {

                        $addBtn.trigger('click');
                        $input.val(file.name);
                        var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $input.get(0) });

                        $input.trigger($enter);

                        expect($('.file-item').length).to.equal(index + 1);

                        var matchedNamesLength = $('.file-item').filter(function (inde, element) {
                            return $(element).find('.item-name').text() === file.name;
                        }).length;

                        expect(matchedNamesLength).to.be.above(0);
                    });
                });

                it('should add .file-item to directory', function () {
                    var files = $('#root').fileExplorer([{ name: 'documents', files: [{ name: 'pic.png', content: 'sdf' }] }]);

                    solution(files);

                    $('.add-btn').trigger('click');
                    $('input').val('documents/gosho.txt');

                    var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $('input').get(0) });

                    $('input').trigger($enter);

                    var matchedLength = $('.dir-item .file-item').filter(function (index, item) {
                        return $(item).find('.item-name').text() === 'gosho.txt';
                    }).length;

                    expect(matchedLength).to.equal(1);
                });

                it('should add .file-item to existing directory but not add .file-item to non-existant', function () {
                    var files = $('#root').fileExplorer([{ name: 'documents', files: [{ name: 'pic.png', content: 'sdf' }] }]);

                    solution(files);

                    $('.add-btn').trigger('click');
                    $('input').val('documents/gosho.txt');

                    var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $('input').get(0) });

                    $('input').trigger($enter);

                    var matchedLength = $('.dir-item .file-item').filter(function (index, item) {
                        return $(item).find('.item-name').text() === 'gosho.txt';
                    }).length;

                    expect(matchedLength).to.equal(1);

                    var lengthBefore = $('.file-item').length;

                    $('.add-btn').trigger('click');
                    $('input').val('missingdir/text.txt');
                    $('input').trigger($enter);

                    var lengthAfter = $('.file-item').length;
                    expect(lengthBefore).to.equal(lengthAfter);
                });

                it('should create new files with empty content', function () {
                    var files = $('#root').fileExplorer([{ name: 'test.test', content: 'testtest' }]);

                    solution(files);

                    $('.file-item .item-name').trigger('click');
                    expect($('.file-content').text()).to.equal('testtest');

                    $('.add-btn').trigger('click');
                    $('input').val('newtest.test');

                    var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $('input').get(0) });

                    $('input').trigger($enter);

                    var $newFileName = $('.item-name').filter(function (index, element) {
                        return element.innerHTML === 'newtest.test';
                    });

                    expect($newFileName.length).to.equal(1);

                    var $click = $.Event('click', { target: $newFileName.get(0) });

                    $newFileName.trigger($click);

                    expect($('.file-content').text()).to.be.empty;
                });

                it('should create files only when enter is pressed', function () {

                    var files = $('#root').fileExplorer([]);

                    solution(files);

                    $('.add-btn').trigger('click');

                    for (var i = 0; i < 127; i += 1) {

                        if (i === 13) {
                            continue;
                        }

                        var $otherKey = $.Event('keydown', { keyCode: i, which: i, target: $('input').get(0) });

                        $('input')
                            .val('bigtest.txt')
                            .trigger($otherKey);

                        var filesCount = $('.file-item').length;

                        expect(filesCount).to.equal(0);
                    }

                    var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $('input').get(0) });

                    $('input')
                        .val('newfile.file')
                        .trigger($enter);

                    expect($('.file-item').length).to.equal(1);
                });

            });

        });

    });

});