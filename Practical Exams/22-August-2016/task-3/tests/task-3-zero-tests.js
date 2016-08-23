/* globals require describe it before document $ jQuery console global*/
var expect = require("chai").expect;
var jsdom = require("jsdom");
var jq = require("jquery");
var result = require("../task/task-3.js")();
var handlebars = require("handlebars");

describe("Navigation task: Zero Tests", function() {
    before(function(done) {
        jsdom.env({
            html: "",
            done: function(errors, window) {
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);
                Object.keys(window)
                    .filter(function(prop) {
                        return prop.toLowerCase()
                            .indexOf("html") >= 0;
                    }).forEach(function(prop) {
                        global[prop] = window[prop];
                    });
                done();
            }
        });
    });

    /* Test Start */

    it("Expect .nav to exist", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {};

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".nav").length).to.equal(1);
    });

    /* Test End */
    /* Test Start */

    it("Expect Logo NOT to exist, when NOT provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: []
        };

        var $root = $("#root");
        $root.html(template(data));

        var $logoItem = $root.find(".logo.nav-item");

        //Logo li exists
        expect($logoItem.length).to.equal(0);
    });

    /* Test End */
    /* Test Start */

    it("Expect outer .nav-items to exist, when with logo", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            logo: {
                url: "http://telerikacademy.com",
                image: "logo.png"
            },
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        var $outerNavItems = $root.find(".nav > .nav-item");

        expect($outerNavItems.length).to.equal(data.items.length + 1);
    });

    /* Test End */
    /* Test Start */

    it("Expect nested .subnav to exist, when nested items are provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com",
                items: [{
                        title: "This is sample 1",
                        url: "#/this-is-sample-1"
                    },

                    {
                        title: "This is sample 2",
                        url: "#/this-is-sample-2"
                    }
                ]
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav").length).to.be.gte(1);
    });

    /* Test End */
    /* Test Start */

    it("Expect nested .subnav NOT TO exist, when nested items are NOT provided", function() {
        var jQueryDummy = $;
        $ = jQuery = undefined;
        document.body.innerHTML = "<div id='root'></div>";
        var template = handlebars.compile(result());
        $ = jQuery = jQueryDummy;

        var data = {
            logo: {
                url: "http://telerikacademy.com",
                image: "logo.png"
            },
            items: [{
                title: "Academy",
                url: "http://academy.telerik.com"
            }, {
                url: "#/courses",
                title: "Courses"
            }, {
                url: "#/archive",
                title: "Archive"
            }, {
                url: "#/forum",
                title: "Forum"
            }, {
                url: "#/help",
                title: "Help"
            }, {
                url: "#/profile",
                title: "User"
            }]
        };

        var $root = $("#root");
        $root.html(template(data));

        expect($root.find(".subnav").length).to.equal(0);
    });

    /* Test End */
});