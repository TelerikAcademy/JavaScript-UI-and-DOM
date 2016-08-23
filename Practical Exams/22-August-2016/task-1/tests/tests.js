//'use strict';

var chai = require('chai'),
    expect = chai.expect,
    jsdom = require('jsdom'),
    jq = require('jquery'),
    result = require('../solution')();

describe('Tabs tests', function () {

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
        
    });
  
    describe('Zero tests', function () {

        describe('DOM structure', function () {
            
            it('should generate correct navigation', function () {

                var test01 = require('./split-tests/test.001');

                test01(result, document, $, expect);

            });

            it('should generate correct tabs content', function () {

                var test02 = require('./split-tests/test.002');

                test02(result, document, $, expect);
            });

        });

        describe('Tab opening', function () {

            it('should display correct tab content on .tab-link click', function () {

                var test03 = require('./split-tests/test.003');

                test03(result, document, $, expect);

            });

        });

        describe('Edit button', function () {

            it('should add textarea with correct content to the DOM and rename edit button correctly', function () {

                var test04 = require('./split-tests/test.004');

                test04(result, document, $, expect);

            });

        });

        describe('Save button', function () {

            it('should set content to textarea value and change button text to "Edit" when "Save" is clicked', function () {

                var test05 = require('./split-tests/test.005');

                test05(result, document, $, expect);
            });

        });

    });


    describe('Non-public tests', function () {

        describe('DOM structure', function () {

            it('should build correct structure by selector thats not id', function () {

                var test06 = require('./split-tests/test.006');

                test06(result, document, $, expect);
            });

        });

        describe('Tab opening', function () {

            it('should put .visible on respective tab on click', function () {

                var test07 = require('./split-tests/test.007');

                test07(result, document, $, expect);
            });

        });

        describe('Edit button', function () {

            it('should correctly open textarea second time', function () {

                var test08 = require('./split-tests/test.008');

                test08(result, document, $, expect);

            });

            it('should not modify the DOM save for adding a textarea with content of the current tab', function () {
                var test09 = require('./split-tests/test.009');

                test09(result, document, $, expect);
            });

        });

        describe('Save button', function () {

            it('should correctly set html content', function () {
                var test10 = require('./split-tests/test.010');

                test10(result, document, $, expect);
            });

            it('should should correctly set content repeatedly', function () {

                var test11 = require('./split-tests/test.011');

                test11(result, document, $, expect);

            });

        });

    });

});