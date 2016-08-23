'use strict';

var chai = require('chai'),
    expect = chai.expect,
    jsdom = require('jsdom'),
    jq = require('jquery'),
    solution = require('../solution')(),
    fileExplorerBuilder = require('./file-explorer-builder')();

describe('File browser tests', function () {

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

    describe('zero tests', function () {

        var directory = [
            { name: 'index.html', content: '<h1>Good luck!</h1>' },
            { name: 'main.css', content: '/* no styles here : ( */' },
            {
                name: 'imgs', files: [
                    { name: 'wallpaper.png', content: 'Cannot be displayed.' },
                    { name: 'result.jpg', content: 'Cannot be displayed.' }
                ]
            },
            {
                name: 'js', files: [
                    { name: 'weird.js', content: 'var let = 5;' },
                    { name: 'batman.js', content: 'new Array(16).join("hero" - 2) + " Batmaaaaan" //paste in console for some fun' }
                ]
            },
            { name: 'notes.txt', content: 'never forget that javascript hates you! :D' },
            { name: 'solution.js', content: 'console.log("not really");' }
        ];

        it('click on .file-item should show content', function () {
            var files = $('#root').fileExplorer(directory);

            solution(files);

            var $content = $('.file-content');

            $('.file-item .item-name').each(function (index, itemName) {
                $(itemName).trigger('click');

                expect($content.text()).to.equal(files[itemName.innerHTML]);
            });
        });

        it('click on .dir-item should toggle visibility', function () {
            var files = $('#root').fileExplorer(directory);

            solution(files);

            var firstDir = $('.dir-item').first();

            expect(firstDir.hasClass('collapsed')).to.be.true;

            firstDir.find('.item-name').trigger('click');
            expect(firstDir.hasClass('collapsed')).to.be.false;

            firstDir.find('.item-name').trigger('click');
            expect(firstDir.hasClass('collapsed')).to.be.true;
        });

        it('add should create file in root by the provided name', function () {
            var files = $('#root').fileExplorer(directory);

            solution(files);

            var $addBtn = $('.add-btn'),
                $addInput = $('input');

            $addBtn.trigger('click');

            expect($addBtn.hasClass('visible')).to.be.false;
            expect($addInput.hasClass('visible')).to.be.true;

            var $enter = $.Event('keydown', { keyCode: 13, which: 13, target: $addInput.get(0) });
            $addInput.val('file-full-of-secrets.fail').trigger($enter);

            var filesWithName = $('.item-name').filter(function (_, element) {
                return element.innerHTML === 'file-full-of-secrets.fail';
            }).length;

            expect(filesWithName).to.equal(1);
        });

        it('click on any .del-btn should delete the item', function () {

            var files = $('#root').fileExplorer(directory);

            solution(files);

            var $fileItemToRemove = $('.file-item').first(),
                fileItemName = $fileItemToRemove.find('.item-name').text(),
                fileItemsCount = $('.file-item').length;

            $fileItemToRemove.find('.del-btn').trigger('click');
            expect(fileItemsCount).to.equal($('.file-item').length + 1);

            $('.file-item .item-name').each(function (_, fileItem) {
                expect(fileItem.innerHTML).to.not.equal(fileItemName);
            });
        });
    });
});