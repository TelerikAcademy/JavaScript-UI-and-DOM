'use strict';

const expect = require('chai').expect,
    jsdom = require('jsdom'),
    jq = require('jquery'),
    solution = require('../solution/file-browser')();

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
                    .filter(p => p.toLowerCase().indexOf('html') >= 0)
                    .forEach(p => global[p] = window[p]);

                done();
            }
        });

    });

    beforeEach(function prep() {
        document.body.innerHTML = '<main id="root"></main>';
        solution();
    });

    describe('Valid', () => {

        it('Expect element with class `file-explorer` to exist', () => {

            const dir = [
                { name: 'pesho.txt', content: 'pesho' }
            ];

            $('#root').fileBrowser(dir);

            expect($('.file-explorer').length).to.equal(1);

        });

        describe('Drag and drop', () => {

            it('Expect drag and drop to delete 1 file', () => {
                const dir = [
                    { name: 'pesho.js', content: 'alert("pesho");' }
                ];

                $('#root').fileBrowser(dir);

                const pesho = $('.item-name')[0],
                    trash = $('.trash')[0];

                $(pesho).trigger('dragstart');
                $(trash).trigger('dragover');
                $(trash).trigger('drop');

                expect($('.item').length).to.equal(0);
            });

            it('Expect drag and drop to delete many files', () => {

                const dir = [
                    { name: 'test.js', content: 'console.log("will not pass")' },
                    { name: 'README.md', content: '# Tests' },
                    { name: 'index.html', content: '<h1>html</h1>' },
                    { name: 'notes.txt', content: '1. wash the dishes 2. clean the room' },
                    { name : 'ShortSolution.cs', content: 'public sealed class StartUp { public static sealed void override new internal Main () { Console.WriteLine("See how short it is!"); } }' }
                ];

                $('#root').fileBrowser(dir);

                const trash = $('.trash').first(),
                    itemsNames = $('.item-name');

                expect(itemsNames.length).to.equal(dir.length, 'Initial length of names did not match');

                itemsNames.each(function (_, element) {
                    $(element).trigger('dragstart');
                    trash.trigger('dragover');
                    trash.trigger('drop');

                    let removed = true;

                    for(let i = 0, itemNames = $('.item-name'), len = itemNames.length; i < len; i += 1) {
                        if(itemNames[i] === element) {
                            removed = false;
                            break;
                        }
                    }

                    expect(removed).to.be.true;
                });

                expect($('.item-name').length).to.equal(0);
            });

            it('Expect drag and drop to delete 1 folder item', () => {

                const dir = [
                    { name: 'files', files: [ { name: 'main.js', content: 'app.start()' }, { name: 'routes.js', content: 'sdfgsdfsdfsd' } ] }
                ];

                $('#root').fileBrowser(dir);

                const $folder = $('.dir-item > .item-name').first(),
                    $trash = $('.trash').first();

                expect($folder.length).to.equal(1);

                $folder.trigger('dragstart');
                $trash.trigger('dragover');
                $trash.trigger('drop');

                expect($('.item-name').length).to.equal(0);
                expect($('items').first().children().length).to.equal(0);
            });
        });

    });

});