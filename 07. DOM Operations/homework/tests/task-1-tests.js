var solve = require('../tasks/task-1');
var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');

describe('Task 1 tests', function() {
    var htmlTemplate = '<div id="root"></div>';
    jsdom();

    beforeEach(function() {
        document.body.innerHTML = htmlTemplate;
    });

    describe('Valid Tests', function() {
        it('expect element to contain 5 divs with the provided contents', function() {
            var fillWithDivs = solve();
            var count = 5,
                contents = Array.call(Array, {
                    length: count
                })
                .map(function(_, index) {
                    return 'Content #' + index;
                });
            var root = document.getElementById('root');
            fillWithDivs(root, contents);
            var divs = root.getElementsByTagName('div');
            expect(divs).to.exist;
            contents.forEach(function(content, index){
                expect(divs[index]).to.exist;
                expect(divs[index].innerHTML).to.equal(content);
            });
        });

        it('expect #root to contain 5 divs with the provided contents', function() {
            var fillWithDivs = solve();
            var count = 5,
                contents = Array.call(Array, {
                    length: count
                })
                .map(function(_, index) {
                    return 'Content #' + index;
                });
            var root = document.getElementById('root');
            fillWithDivs('root', contents);
            var divs = root.getElementsByTagName('div');
            expect(divs).to.exist;
            contents.forEach(function(content, index){
                expect(divs[index]).to.exist;
                expect(divs[index].innerHTML).to.equal(content);
            });
        });
    });

    describe('Invalid tests', function(){
        it('expect to throw, when nothing is passed as parameter', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs();
            }
            expect(test).to.throw();
        });

        it('expect to throw, when undefined is passed as first parameter, second is valid', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs(undefined, ['Test']);
            }
            expect(test).to.throw();
        });

        it('expect to throw, when null is passed as first parameter, second is valid', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs(null, ['Test']);
            }
            expect(test).to.throw();
        });

        it('expect to throw, when id of non-existing element is passed as first parameter, second is valid', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs('THIS_IS_INVALID_ID', ['Test']);
            }
            expect(test).to.throw();
        });


        it('expect to throw, when no contents array is passed, the ID is valid', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs('root');
            }
            expect(test).to.throw();
        });

        it('expect to throw, when null is passed as contents array, the ID is valid', function(){
            var fillWithDivs = solve();
            function test(){
                fillWithDivs('root');
            }
            expect(test).to.throw();
        });

        it('expect to throw and the root content to remain unchanged, when contents array contains element different that string or number, the ID is valid', function(){
            var fillWithDivs = solve(),
                root = document.getElementById('root'),
                innerHTML = root.innerHTML;
            function test(){
                fillWithDivs('root', [ 1,[], 'Test']);
            }
            expect(test).to.throw();
            expect(innerHTML).to.equal(root.innerHTML);
        });
    });
});